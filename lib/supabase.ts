import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  'https://ttljzoarwuanjtdlgqhn.supabase.co';

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0bGp6b2Fyd3Vhbmp0ZGxncWhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0MjQ2MzMsImV4cCI6MjEwNTAwMDYzM30.GM3-Q2-qzFeGBpTtn-euHcDZBAV86iFE5_OqAK5MvSk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const isSupabaseConfigured = true;
