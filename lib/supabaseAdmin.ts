import { createClient } from "@supabase/supabase-js";
import { parseAdminEmails } from "@/lib/subscriptionPlans";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export function isSupabaseAdminConfigured() {
  return Boolean(supabaseUrl && serviceRoleKey);
}

export const supabaseAdmin = isSupabaseAdminConfigured()
  ? createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null;

export async function requireAdmin(request: Request) {
  if (!supabaseAdmin) {
    return { ok: false as const, status: 503, message: "Supabase admin service is not configured." };
  }

  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

  if (!token) {
    return { ok: false as const, status: 401, message: "Missing access token." };
  }

  const { data, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !data.user?.email) {
    return { ok: false as const, status: 401, message: "Invalid session." };
  }

  const adminEmails = parseAdminEmails(process.env.ADMIN_EMAILS || process.env.NEXT_PUBLIC_ADMIN_EMAILS);

  if (!adminEmails.includes(data.user.email.toLowerCase())) {
    return { ok: false as const, status: 403, message: "Admin access required." };
  }

  return { ok: true as const, user: data.user };
}
