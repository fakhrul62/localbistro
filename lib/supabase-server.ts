import { createClient } from "@supabase/supabase-js";
import { requiredServerEnv } from "@/lib/env";

export function getSupabaseAdmin() {
  const { supabaseUrl, supabaseServiceRoleKey } = requiredServerEnv;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error("Supabase server credentials are not configured.");
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
