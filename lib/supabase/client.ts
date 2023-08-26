// import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// // eslint-disable-next-line import/no-unused-modules
// export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
//   auth: { persistSession: true },
// });

import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

const supabaseClient = createPagesBrowserClient({
  supabaseUrl,
  supabaseKey: supabaseAnonKey,
});

// eslint-disable-next-line import/no-unused-modules
export default supabaseClient;
