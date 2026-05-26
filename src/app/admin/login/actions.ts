"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHmac } from "crypto";

export async function loginAction(
  formData: FormData
): Promise<{ error: string } | never> {
  const password = (formData.get("password") as string) ?? "";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "admin123";
  const secret = process.env.ADMIN_SECRET ?? "dev-secret-please-change-me";

  if (password !== adminPassword) {
    return { error: "Contraseña incorrecta" };
  }

  const payload = Date.now().toString();
  const sig = createHmac("sha256", secret).update(payload).digest("hex");
  const token = `${payload}.${sig}`;

  (await cookies()).set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  redirect("/admin");
}

export async function logoutAction() {
  (await cookies()).delete("admin_session");
  redirect("/admin/login");
}
