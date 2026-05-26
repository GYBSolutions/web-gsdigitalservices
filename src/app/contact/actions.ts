"use server";

import { createServerClient } from "@/lib/supabase/server";

export async function submitContactAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "Por favor completa los campos requeridos." };
  }

  const submission = {
    name,
    email,
    company: (formData.get("company") as string) || null,
    service: (formData.get("service") as string) || null,
    timeline: (formData.get("timeline") as string) || null,
    budget: (formData.get("budget") as string) || null,
    message,
  };

  const db = createServerClient();
  if (db) {
    const { error } = await db.from("contact_submissions").insert(submission);
    if (error) return { error: "Error al guardar el mensaje. Intenta nuevamente." };
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Seijas Digital <onboarding@resend.dev>",
          to: [process.env.CONTACT_EMAIL || "yen.seis01@gmail.com"],
          subject: `Nuevo contacto: ${name}`,
          html: buildEmailHtml(submission),
        }),
      });
    } catch {
      // Email is optional — don't fail the submission
    }
  }

  return { success: true };
}

function buildEmailHtml(s: {
  name: string;
  email: string;
  company: string | null;
  service: string | null;
  timeline: string | null;
  budget: string | null;
  message: string;
}) {
  const rows = [
    ["Nombre", s.name],
    ["Email", s.email],
    ["Empresa", s.company],
    ["Servicio", s.service],
    ["Timeline", s.timeline],
    ["Presupuesto", s.budget],
  ]
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;font-weight:600;white-space:nowrap;color:#6d28d9">${k}:</td><td style="padding:8px 12px">${v}</td></tr>`
    )
    .join("");

  return `
    <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
      <div style="background:linear-gradient(135deg,#7c3aed,#4f46e5);padding:24px 32px;border-radius:12px 12px 0 0">
        <h1 style="margin:0;color:white;font-size:20px">Nuevo mensaje de contacto</h1>
      </div>
      <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;padding:24px">
        <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
          ${rows}
        </table>
        <div style="background:#f5f3ff;border:1px solid #ddd6fe;border-radius:8px;padding:16px">
          <div style="font-weight:600;color:#6d28d9;margin-bottom:8px">Mensaje:</div>
          <div style="color:#374151;line-height:1.6">${s.message.replace(/\n/g, "<br>")}</div>
        </div>
      </div>
    </div>
  `;
}
