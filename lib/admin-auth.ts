import "server-only";

import { redirect } from "next/navigation";
import { getSupabaseAuthClient, isSupabaseAuthConfigured } from "@/lib/supabase-auth";

export async function getAdminUser() {
  if (!isSupabaseAuthConfigured()) return null;
  try {
    const supabase = await getSupabaseAuthClient();
    const { data: { user } } = await supabase.auth.getUser();
    return user?.app_metadata?.role === "admin" ? user : null;
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");
  return user;
}
