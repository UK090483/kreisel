import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// eslint-disable-next-line import/no-unused-modules
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: true },
});
