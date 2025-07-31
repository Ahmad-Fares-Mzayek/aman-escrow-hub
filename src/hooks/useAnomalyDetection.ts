import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface TransactionData {
  id?: string;
  amount: number;
  currency?: string;
  user_id: string;
  transaction_type: string;
  metadata?: any;
  ip_address?: string;
  user_agent?: string;
}

interface AnomalyResult {
  transaction_id: string;
  score: number;
  is_anomaly: boolean;
  features: any;
}

export const useAnomalyDetection = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastAnomalyResult, setLastAnomalyResult] = useState<AnomalyResult | null>(null);
  const { toast } = useToast();

  const detectAnomaly = async (transactionData: TransactionData): Promise<AnomalyResult | null> => {
    setIsAnalyzing(true);
    try {
      // Generate a unique ID if not provided
      const transactionId = transactionData.id || crypto.randomUUID();

      // Get client IP and user agent
      const ip_address = transactionData.ip_address || 'unknown';
      const user_agent = transactionData.user_agent || navigator.userAgent;

      const payload = {
        id: transactionId,
        amount: transactionData.amount,
        currency: transactionData.currency || 'SAR',
        user_id: transactionData.user_id,
        transaction_type: transactionData.transaction_type,
        timestamp: new Date().toISOString(),
        metadata: transactionData.metadata || {},
        ip_address,
        user_agent
      };

      console.log('Calling anomaly detection with payload:', payload);

      const { data, error } = await supabase.functions.invoke('detect-anomaly', {
        body: payload
      });

      if (error) {
        console.error('Anomaly detection error:', error);
        toast({
          title: "تحذير النظام",
          description: "حدث خطأ في نظام كشف الاحتيال. سيتم مراجعة المعاملة يدوياً.",
          variant: "destructive"
        });
        return null;
      }

      console.log('Anomaly detection result:', data);
      setLastAnomalyResult(data);

      if (data.is_anomaly) {
        toast({
          title: "تنبيه أمني",
          description: `تم اكتشاف نشاط مشبوه (نقاط الخطر: ${(data.score * 100).toFixed(1)}%)`,
          variant: "destructive"
        });
      }

      return data;
    } catch (error) {
      console.error('Error in anomaly detection:', error);
      toast({
        title: "خطأ في النظام",
        description: "فشل في تحليل المعاملة للكشف عن الاحتيال",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    detectAnomaly,
    isAnalyzing,
    lastAnomalyResult,
    clearLastResult: () => setLastAnomalyResult(null)
  };
};