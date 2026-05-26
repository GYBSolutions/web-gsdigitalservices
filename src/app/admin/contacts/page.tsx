import React from "react";
import { createServerClient } from "@/lib/supabase/server";
import { Mail, Building2, Clock, Calendar } from "lucide-react";

interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  company: string | null;
  service: string | null;
  timeline: string | null;
  budget: string | null;
  message: string;
  created_at: string;
  read: boolean;
}

export default async function AdminContactsPage() {
  const db = createServerClient();
  const submissions: ContactSubmission[] = db
    ? ((
        await db
          .from("contact_submissions")
          .select("*")
          .order("created_at", { ascending: false })
      ).data ?? [])
    : [];

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Mensajes de Contacto</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {submissions.length} mensaje{submissions.length !== 1 ? "s" : ""} recibido{submissions.length !== 1 ? "s" : ""}
        </p>
      </div>

      {!db && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-sm text-amber-400 mb-6">
          Supabase no configurado — configura las variables de entorno para ver los mensajes.
        </div>
      )}

      {submissions.length === 0 && db && (
        <div className="rounded-2xl border border-dashed border-border bg-card p-16 text-center">
          <Mail className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">
            Aún no hay mensajes. Cuando alguien complete el formulario de contacto, aparecerá aquí.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {submissions.map((s) => (
          <div
            key={s.id}
            className="rounded-2xl border border-border bg-card p-6 space-y-4"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-500/20 to-indigo-500/20 border border-brand-500/20 flex items-center justify-center text-xs font-semibold text-brand-400 shrink-0">
                    {s.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{s.name}</div>
                    <a
                      href={`mailto:${s.email}`}
                      className="text-xs text-brand-400 hover:text-brand-300 transition-colors"
                    >
                      {s.email}
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                <Calendar className="h-3 w-3" />
                {new Date(s.created_at).toLocaleDateString("es", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>

            {/* Meta chips */}
            <div className="flex flex-wrap gap-2">
              {s.company && (
                <span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-xs text-muted-foreground">
                  <Building2 className="h-3 w-3" />
                  {s.company}
                </span>
              )}
              {s.service && (
                <span className="inline-flex items-center gap-1 rounded-full border border-brand-500/30 bg-brand-500/10 px-2.5 py-0.5 text-xs text-brand-400">
                  {s.service}
                </span>
              )}
              {s.budget && (
                <span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-xs text-muted-foreground">
                  {s.budget}
                </span>
              )}
              {s.timeline && (
                <span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {s.timeline}
                </span>
              )}
            </div>

            {/* Message */}
            <div className="rounded-xl bg-muted/30 border border-border/50 px-4 py-3">
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {s.message}
              </p>
            </div>

            {/* Reply button */}
            <div className="flex justify-end">
              <a
                href={`mailto:${s.email}?subject=Re: Tu consulta en Seijas Digital`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-brand-500/30 bg-brand-500/10 px-3 py-1.5 text-xs font-medium text-brand-400 hover:bg-brand-500/20 transition-colors"
              >
                <Mail className="h-3 w-3" />
                Responder por email
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
