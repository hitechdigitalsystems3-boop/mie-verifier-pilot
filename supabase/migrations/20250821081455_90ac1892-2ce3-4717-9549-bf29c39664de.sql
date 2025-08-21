-- Create verification_requests table
CREATE TABLE public.verification_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_key TEXT NOT NULL,
  first_name TEXT NOT NULL,
  surname TEXT NOT NULL,
  id_number TEXT NOT NULL,
  date_of_birth TIMESTAMP WITH TIME ZONE NOT NULL,
  verification_types TEXT[] NOT NULL DEFAULT '{}',
  additional_notes TEXT,
  remote_request_id TEXT UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create verification_results table
CREATE TABLE public.verification_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id UUID NOT NULL REFERENCES public.verification_requests(id) ON DELETE CASCADE,
  verification_type TEXT NOT NULL,
  result_code TEXT,
  result_description TEXT,
  supplier TEXT,
  risk_level TEXT,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  extended_info JSONB,
  pdf_report_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.verification_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_results ENABLE ROW LEVEL SECURITY;

-- Create policies for verification_requests
CREATE POLICY "Enable all operations for authenticated users" 
ON public.verification_requests 
FOR ALL 
USING (auth.role() = 'authenticated');

-- Create policies for verification_results
CREATE POLICY "Enable all operations for authenticated users" 
ON public.verification_results 
FOR ALL 
USING (auth.role() = 'authenticated');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_verification_requests_updated_at
  BEFORE UPDATE ON public.verification_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for PDF reports
INSERT INTO storage.buckets (id, name, public) VALUES ('verification-pdfs', 'verification-pdfs', true);

-- Create policies for PDF storage
CREATE POLICY "Enable select for authenticated users" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'verification-pdfs' AND auth.role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'verification-pdfs' AND auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'verification-pdfs' AND auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'verification-pdfs' AND auth.role() = 'authenticated');

-- Create indexes for better performance
CREATE INDEX idx_verification_requests_status ON public.verification_requests(status);
CREATE INDEX idx_verification_requests_remote_id ON public.verification_requests(remote_request_id);
CREATE INDEX idx_verification_requests_id_number ON public.verification_requests(id_number);
CREATE INDEX idx_verification_results_request_id ON public.verification_results(request_id);
CREATE INDEX idx_verification_results_type ON public.verification_results(verification_type);