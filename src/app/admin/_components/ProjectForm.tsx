"use client";

import React, { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import type { Project } from "@/types";
import { saveProjectAction } from "../actions";
import { FormCard, Field, Grid, SaveBar } from "./AdminForm";
import { AppMockup } from "@/components/shared/AppMockup";

interface ProjectFormProps {
  project?: Partial<Project> & { sort_order?: number };
  isNew?: boolean;
}

export function ProjectForm({ project, isNew }: ProjectFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [accentColor, setAccentColor] = useState(project?.accentColor ?? "#7C3AED");
  const [mockupType, setMockupType] = useState<"ios" | "web" | "dashboard">(
    (project?.mockupType as "ios" | "web" | "dashboard") ?? "web"
  );

  const arrToLines = (arr?: string[]) => (arr ?? []).join("\n");
  const metricsToLines = (metrics?: { value: string; label: string; improvement?: string }[]) =>
    (metrics ?? []).map((m) => `${m.value} | ${m.label}${m.improvement ? ` | ${m.improvement}` : ""}`).join("\n");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSaved(false);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await saveProjectAction(fd);
      if (result?.error) {
        setError(result.error);
      } else {
        setSaved(true);
        router.push("/admin/projects");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-4xl">
      <SaveBar isPending={isPending} saved={saved} error={error} />

      <h1 className="text-2xl font-bold text-foreground mb-8">
        {isNew ? "Nuevo proyecto" : "Editar proyecto"}
      </h1>

      {/* Hidden id */}
      {project?.id && <input type="hidden" name="id" value={project.id} />}

      <div className="space-y-6">
        {/* Basic info */}
        <FormCard title="Información básica">
          <div className="space-y-4">
            <Grid cols={2}>
              <Field label="Título">
                <input name="title" required defaultValue={project?.title} placeholder="FinTrack — Intelligent Finance Platform" />
              </Field>
              <Field label="Slug (URL)">
                <input name="slug" defaultValue={project?.slug} placeholder="fintech-ios-platform" />
              </Field>
            </Grid>
            <Field label="Descripción corta">
              <textarea name="description" rows={2} required defaultValue={project?.description} placeholder="Una línea que describe el proyecto" />
            </Field>
            <Field label="Descripción larga">
              <textarea name="longDescription" rows={4} defaultValue={project?.longDescription} placeholder="Detalles técnicos y contexto del proyecto..." />
            </Field>
          </div>
        </FormCard>

        {/* Meta */}
        <FormCard title="Categoría y estado">
          <Grid cols={4}>
            <Field label="Categoría">
              <input name="category" defaultValue={project?.category} placeholder="iOS Application" />
            </Field>
            <Field label="Año">
              <input name="year" type="number" defaultValue={project?.year ?? new Date().getFullYear()} />
            </Field>
            <Field label="Estado">
              <select name="status" defaultValue={project?.status ?? "live"}>
                <option value="live">Live</option>
                <option value="case-study">Case Study</option>
                <option value="archived">Archived</option>
              </select>
            </Field>
            <Field label="Orden">
              <input name="sort_order" type="number" defaultValue={(project as Project & { sort_order?: number })?.sort_order ?? 0} />
            </Field>
          </Grid>
          <div className="mt-4 flex items-center gap-3">
            <input
              type="checkbox"
              name="featured"
              id="featured"
              defaultChecked={project?.featured}
              className="h-4 w-4 rounded border-border accent-brand-500"
            />
            <label htmlFor="featured" className="text-sm text-foreground cursor-pointer">
              Proyecto destacado (se muestra en la home)
            </label>
          </div>
        </FormCard>

        {/* Visual */}
        <FormCard title="Apariencia">
          <Grid cols={2}>
            <div>
              <Field label="Color de acento">
                <input
                  name="accentColor"
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="!h-10 !p-1 cursor-pointer"
                />
              </Field>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                Tipo de mockup
              </label>
              <div className="flex gap-2">
                {(["ios", "web", "dashboard"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setMockupType(type)}
                    className={`flex-1 rounded-xl py-2 text-xs font-medium border transition-all ${
                      mockupType === type
                        ? "border-brand-500/50 bg-brand-500/15 text-brand-400"
                        : "border-border text-muted-foreground hover:border-brand-500/30"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <input type="hidden" name="mockupType" value={mockupType} />
            </div>
          </Grid>
          {/* Preview */}
          <div className="mt-4 flex justify-center rounded-2xl border border-dashed border-border bg-muted/20 py-6 overflow-hidden">
            <AppMockup type={mockupType} accentColor={accentColor} size="sm" />
          </div>
        </FormCard>

        {/* Stack & Tags */}
        <FormCard title="Tecnologías y tags">
          <Grid cols={2}>
            <Field label="Tags" hint="Una por línea">
              <textarea name="tags" rows={4} defaultValue={arrToLines(project?.tags)} placeholder="iOS&#10;SwiftUI&#10;Core ML" />
            </Field>
            <Field label="Stack técnico" hint="Una por línea">
              <textarea name="stack" rows={4} defaultValue={arrToLines(project?.stack)} placeholder="Swift&#10;Supabase&#10;Vercel" />
            </Field>
          </Grid>
        </FormCard>

        {/* Metrics */}
        <FormCard title="Métricas">
          <Field label="Métricas" hint="Formato: Valor | Etiqueta | Mejora (opcional). Una por línea.">
            <textarea
              name="metrics"
              rows={5}
              defaultValue={metricsToLines(project?.metrics)}
              placeholder="80K+ | Active Users | +340%&#10;4.9★ | App Store Rating | Top 5 Finance"
            />
          </Field>
        </FormCard>

        {/* Challenges & Solutions */}
        <FormCard title="Desafíos y soluciones">
          <Grid cols={2}>
            <Field label="Desafíos" hint="Uno por línea">
              <textarea name="challenges" rows={5} defaultValue={arrToLines(project?.challenges)} placeholder="Real-time bank sync with 12+ data sources&#10;On-device ML without battery drain" />
            </Field>
            <Field label="Soluciones" hint="Una por línea (se empareja con el desafío correspondiente)">
              <textarea name="solutions" rows={5} defaultValue={arrToLines(project?.solutions)} placeholder="Custom WebSocket layer with intelligent polling&#10;Batched Core ML inference with background tasks" />
            </Field>
          </Grid>
        </FormCard>

        {/* Architecture */}
        <FormCard title="Arquitectura">
          <Field label="Descripción de arquitectura">
            <textarea name="architecture" rows={4} defaultValue={project?.architecture} placeholder="Clean Architecture with MVVM, modular feature packages..." />
          </Field>
        </FormCard>
      </div>
    </form>
  );
}
