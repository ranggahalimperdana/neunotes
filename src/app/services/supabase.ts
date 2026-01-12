import { createClient } from '@supabase/supabase-js';

// Gunakan import.meta.env untuk Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL atau Key belum disetting di file .env");
}

export const supabase = createClient(supabaseUrl, supabaseKey);