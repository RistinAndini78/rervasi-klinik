import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  "https://okcxmacyrbezdkrcbecv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rY3htYWN5cmJlemRrcmNiZWN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwNjM2NDYsImV4cCI6MjA3OTYzOTY0Nn0.dc5LcJ-1rr2bARGaZxFtVLGV_H1CWFrJvrFef9zQMRY"
);
