import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// eslint-disable-next-line import/no-unused-modules
export const supabase = createClient(supabaseUrl, SUPABASE_SERVICE_ROLE_KEY);
