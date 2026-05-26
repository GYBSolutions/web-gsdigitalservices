"use client";

import React, { useState, useTransition } from "react";
import { CheckCircle2, Save } from "lucide-react";
import { saveHeroAction } from "../actions";
import type { HeroSettings } from "@/lib/content";

const defaultSettings: HeroSettings = {
  badge: "Available for new projects",
  heading: "Engineering",
  headingHighlight: "Digital Products",
  headingEnd: "That Scale",
  subtitle:
    "Senior software engineer with 10+ years building iOS apps, scalable backends, and AI-powered systems for startups and enterprises. I turn complex ideas into products people use daily.",
  openBadge: "Open to new projects",
  available: true,
  stats: {
    years: "Years engineering",
    apps: "Apps shipped",
    users: "Users served",
    uptime: "Uptime delivered",
  },
  statsValues: {
    years: "10+",
    apps: "50+",
    users: "80K+",
    uptime: "99.97%",
  },
};

export default function HeroAdminPage() {
  const [data, setData] = useState<HeroSettings>(defaultSettings);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const set = (path: string, value: string | boolean) => {
    setData((prev) => {
      const next = { ...prev };
      const parts = path.split(".");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let obj: any = next;
      for (let i = 0; i < parts.length - 1; i++) {
        obj[parts[i]] = { ...obj[parts[i]] };
        obj = obj[parts[i]];
      }
      obj[parts[parts.length - 1]] = value;
      return next;
    });
    setSaved(false);
  };

  const handleSave = () => {
    setError("");
    setSaved(false);
    startTransition(async () => {
      const result = await saveHeroAction(data);
      if (result?.error) setError(result.error);
      else setSaved(true);
    });
  };

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Hero & General</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Contenido principal del encabezado del sitio
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-glow-sm hover:shadow-glow-md transition-shadow disabled:opacity-60"
        >
          {saved ? <CheckCircle2 className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {isPending ? "Guardando..." : saved ? "Guardado" : "Guardar cambios"}
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {/* Availability */}
        <Card title="Disponibilidad">
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() => set("available", !data.available)}
              className={`relative w-10 h-6 rounded-full transition-colors cursor-pointer ${data.available ? "bg-emerald-500" : "bg-muted"}`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${data.available ? "translate-x-5" : "translate-x-1"}`}
              />
            </div>
            <span className="text-sm text-foreground font-medium">
              {data.available ? "Disponible para proyectos" : "No disponible"}
            </span>
          </label>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <Field label="Badge texto (disponible)">
              <input value={data.badge} onChange={(e) => set("badge", e.target.value)} />
            </Field>
            <Field label="Badge texto (estado en card)">
              <input value={data.openBadge} onChange={(e) => set("openBadge", e.target.value)} />
            </Field>
          </div>
        </Card>

        {/* Heading */}
        <Card title="Título principal">
          <div className="grid grid-cols-3 gap-4">
            <Field label="Línea 1">
              <input value={data.heading} onChange={(e) => set("heading", e.target.value)} />
            </Field>
            <Field label="Línea destacada (gradiente)">
              <input value={data.headingHighlight} onChange={(e) => set("headingHighlight", e.target.value)} />
            </Field>
            <Field label="Línea 3">
              <input value={data.headingEnd} onChange={(e) => set("headingEnd", e.target.value)} />
            </Field>
          </div>
        </Card>

        {/* Subtitle */}
        <Card title="Subtítulo">
          <Field label="">
            <textarea
              rows={3}
              value={data.subtitle}
              onChange={(e) => set("subtitle", e.target.value)}
            />
          </Field>
        </Card>

        {/* Stats */}
        <Card title="Estadísticas (valores + etiquetas)">
          <div className="grid grid-cols-2 gap-4">
            {(["years", "apps", "users", "uptime"] as const).map((key) => (
              <div key={key} className="space-y-2">
                <Field label={`Valor — ${key}`}>
                  <input
                    value={data.statsValues[key]}
                    onChange={(e) => set(`statsValues.${key}`, e.target.value)}
                  />
                </Field>
                <Field label={`Etiqueta — ${key}`}>
                  <input
                    value={data.stats[key]}
                    onChange={(e) => set(`stats.${key}`, e.target.value)}
                  />
                </Field>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h2 className="text-sm font-semibold text-foreground mb-4">{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactElement }) {
  return (
    <div>
      {label && (
        <label className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</label>
      )}
      {React.cloneElement(children, {
        className:
          "w-full rounded-xl border border-border bg-muted/30 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/50 resize-none",
      })}
    </div>
  );
}
