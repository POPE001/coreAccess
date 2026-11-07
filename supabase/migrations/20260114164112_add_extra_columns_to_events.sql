ALTER TABLE public.events 
ADD COLUMN IF NOT EXISTS attendee_info JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS payment_options JSONB DEFAULT '{}'::jsonb;
