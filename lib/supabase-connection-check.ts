import { supabase } from "./supabase-client";

// Try to fetch a single row from the Recipe table
export async function validateSupabaseConnection() {
  const { data, error } = await supabase.from("Recipe").select("*").limit(1);
  if (error) {
    console.error("Supabase connection error:", error);
    return false;
  }
  console.log("Supabase connection OK:", data);
  return true;
}
