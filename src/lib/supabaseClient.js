import { createClient } from '@supabase/supabase-js';

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl) {
      console.error('Missing VITE_SUPABASE_URL environment variable');
      throw new Error('Missing VITE_SUPABASE_URL environment variable');
    }

    if (!supabaseAnonKey) {
      console.error('Missing VITE_SUPABASE_ANON_KEY environment variable');
      throw new Error('Missing VITE_SUPABASE_ANON_KEY environment variable');
    }

    try {
      new URL(supabaseUrl);
    } catch (error) {
      console.error('Invalid VITE_SUPABASE_URL:', supabaseUrl);
      throw new Error('Invalid VITE_SUPABASE_URL: ' + supabaseUrl);
    }

    export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    });
