import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  "https://uvtdqgjrzitkszctwhag.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2dGRxZ2pyeml0a3N6Y3R3aGFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4MTU2NzMsImV4cCI6MjA4MDM5MTY3M30.ZxM_d1pWc2i2NVKpT76o_-uLri4F8JRiEvmhEySnds8");
