import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  "https://axlfkfybsryjhhlzthen.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4bGZrZnlic3J5amhobHp0aGVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3ODA0NTUsImV4cCI6MjA4MDM1NjQ1NX0.i0qBpDOg4w9JuZH_xWKnsHNdDWdvcSia_gTqEIMmZks"
);
