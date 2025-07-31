import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple anomaly detection using statistical methods
class SimpleAnomalyDetector {
  private static calculateStatistics(amounts: number[]) {
    if (amounts.length === 0) return { mean: 0, stdDev: 0 };
    
    const mean = amounts.reduce((sum, val) => sum + val, 0) / amounts.length;
    const variance = amounts.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / amounts.length;
    const stdDev = Math.sqrt(variance);
    
    return { mean, stdDev };
  }
  
  private static calculateFrequencyScore(transactionCount: number, timeWindowHours: number): number {
    // Normal users: 0-5 transactions per hour = normal, >10 = anomaly
    const transactionsPerHour = transactionCount / timeWindowHours;
    if (transactionsPerHour > 10) return 1.0;
    if (transactionsPerHour > 5) return 0.7;
    return 0.1;
  }
  
  private static calculateAmountScore(amount: number, mean: number, stdDev: number): number {
    if (stdDev === 0) return amount > mean * 3 ? 1.0 : 0.1;
    
    const zScore = Math.abs((amount - mean) / stdDev);
    if (zScore > 3) return 1.0;
    if (zScore > 2) return 0.7;
    if (zScore > 1.5) return 0.4;
    return 0.1;
  }
  
  static detect(currentTransaction: any, recentTransactions: any[]): {
    score: number;
    is_anomaly: boolean;
    features_analyzed: any;
  } {
    const amounts = recentTransactions.map(t => parseFloat(t.amount));
    const { mean, stdDev } = this.calculateStatistics(amounts);
    
    // Calculate different anomaly scores
    const amountScore = this.calculateAmountScore(parseFloat(currentTransaction.amount), mean, stdDev);
    
    // Frequency analysis - count transactions in last 24 hours
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentCount = recentTransactions.filter(t => 
      new Date(t.created_at) > last24Hours
    ).length;
    const frequencyScore = this.calculateFrequencyScore(recentCount, 24);
    
    // Time pattern analysis - transactions outside business hours (9 AM - 6 PM)
    const transactionHour = new Date(currentTransaction.timestamp || new Date()).getHours();
    const timeScore = (transactionHour < 9 || transactionHour > 18) ? 0.3 : 0.1;
    
    // Combine scores with weights
    const finalScore = Math.min(1.0, 
      amountScore * 0.5 + 
      frequencyScore * 0.3 + 
      timeScore * 0.2
    );
    
    const features = {
      amount_score: amountScore,
      frequency_score: frequencyScore,
      time_score: timeScore,
      transaction_count_24h: recentCount,
      amount_mean: mean,
      amount_stddev: stdDev,
      transaction_hour: transactionHour
    };
    
    return {
      score: Math.round(finalScore * 10000) / 10000, // Round to 4 decimal places
      is_anomaly: finalScore > 0.6, // Threshold for anomaly
      features_analyzed: features
    };
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    const { id, amount, currency, user_id, timestamp, metadata, ip_address, user_agent, transaction_type } = await req.json();

    console.log('Processing anomaly detection for transaction:', { id, amount, user_id, transaction_type });

    // Insert the transaction first
    const { data: transaction, error: insertError } = await supabase
      .from('transactions')
      .insert({
        id,
        user_id,
        amount,
        currency: currency || 'SAR',
        transaction_type,
        metadata: metadata || {},
        ip_address,
        user_agent,
        created_at: timestamp || new Date().toISOString()
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting transaction:', insertError);
      throw new Error(`Failed to insert transaction: ${insertError.message}`);
    }

    // Fetch recent transactions for the same user (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    
    const { data: recentTransactions, error: fetchError } = await supabase
      .from('transactions')
      .select('amount, created_at, transaction_type')
      .eq('user_id', user_id)
      .gte('created_at', thirtyDaysAgo)
      .neq('id', id) // Exclude current transaction
      .order('created_at', { ascending: false })
      .limit(100);

    if (fetchError) {
      console.error('Error fetching recent transactions:', fetchError);
      throw new Error(`Failed to fetch recent transactions: ${fetchError.message}`);
    }

    console.log(`Found ${recentTransactions?.length || 0} recent transactions for user ${user_id}`);

    // Run anomaly detection
    const result = SimpleAnomalyDetector.detect(transaction, recentTransactions || []);

    console.log('Anomaly detection result:', result);

    // Store the anomaly flag
    const { error: flagError } = await supabase
      .from('anomaly_flags')
      .insert({
        transaction_id: transaction.id,
        anomaly_score: result.score,
        is_anomaly: result.is_anomaly,
        detection_method: 'statistical_analysis',
        features_analyzed: result.features_analyzed
      });

    if (flagError) {
      console.error('Error inserting anomaly flag:', flagError);
      throw new Error(`Failed to insert anomaly flag: ${flagError.message}`);
    }

    return new Response(JSON.stringify({
      transaction_id: transaction.id,
      score: result.score,
      is_anomaly: result.is_anomaly,
      features: result.features_analyzed
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in detect-anomaly function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Internal server error',
      details: error.toString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});