import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/public';

const supabaseURL = env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = env.PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseURL as string, supabaseAnonKey as string);

export default supabase;
