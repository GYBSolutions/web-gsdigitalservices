import { cookies } from "next/headers";
import { createHmac } from "crypto";

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!token) return false;

  const secret = process.env.ADMIN_SECRET ?? "dev-secret-please-change-me";
  const dot = token.lastIndexOf(".");
  if (dot === -1) return false;

  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = createHmac("sha256", secret).update(payload).digest("hex");
  return sig === expected;
}
