import { createClient } from "npm:@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL");
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const tableName = "kv_store_0d49d71e";

if (!supabaseUrl || !serviceRoleKey) {
  console.warn("Supabase KV store is missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
}

const supabase = supabaseUrl && serviceRoleKey
  ? createClient(supabaseUrl, serviceRoleKey)
  : null;

export async function get(key: string) {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from(tableName)
    .select("value")
    .eq("key", key)
    .maybeSingle();

  if (error) throw error;
  return data?.value ?? null;
}

export async function set(key: string, value: unknown) {
  if (!supabase) {
    throw new Error("Supabase KV store is not configured.");
  }

  const { error } = await supabase
    .from(tableName)
    .upsert({ key, value, updated_at: new Date().toISOString() });

  if (error) throw error;
}
