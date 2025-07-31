-- Create transactions table for escrow platform
CREATE TABLE public.transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'SAR',
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  transaction_type VARCHAR(20) NOT NULL, -- 'escrow_deposit', 'escrow_release', 'refund'
  metadata JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create anomaly_flags table for fraud detection
CREATE TABLE public.anomaly_flags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_id UUID NOT NULL REFERENCES public.transactions(id) ON DELETE CASCADE,
  anomaly_score DECIMAL(5,4) NOT NULL, -- 0.0000 to 1.0000
  is_anomaly BOOLEAN NOT NULL DEFAULT false,
  detection_method VARCHAR(50) NOT NULL DEFAULT 'isolation_forest',
  features_analyzed JSONB DEFAULT '{}', -- Store which features triggered the anomaly
  reviewed BOOLEAN NOT NULL DEFAULT false,
  reviewer_id UUID,
  reviewer_comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.anomaly_flags ENABLE ROW LEVEL SECURITY;

-- Create policies for transactions (users can view their own, admins can view all)
CREATE POLICY "Users can view their own transactions" 
ON public.transactions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own transactions" 
ON public.transactions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own transactions" 
ON public.transactions 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create policies for anomaly_flags (only admins can view/manage)
CREATE POLICY "Service role can manage anomaly flags" 
ON public.anomaly_flags 
FOR ALL 
USING (true);

-- Create indexes for performance
CREATE INDEX idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX idx_transactions_created_at ON public.transactions(created_at);
CREATE INDEX idx_transactions_amount ON public.transactions(amount);
CREATE INDEX idx_anomaly_flags_transaction_id ON public.anomaly_flags(transaction_id);
CREATE INDEX idx_anomaly_flags_is_anomaly ON public.anomaly_flags(is_anomaly);
CREATE INDEX idx_anomaly_flags_reviewed ON public.anomaly_flags(reviewed);

-- Create trigger for updating updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_transactions_updated_at
BEFORE UPDATE ON public.transactions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();