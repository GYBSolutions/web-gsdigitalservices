"use client";

import React, { useTransition, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import type { Project } from "@/types";
import { saveProjectAction } from "../actions";
import { FormCard, Field, Grid, SaveBar } from "./AdminForm";
import { AppMockup } from "@/components/shared/AppMockup";
import { ImagePlus, X } from "lucide-react";

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
  const [imagePreview, setImagePreview] = useState<string | null>(project?.imageUrl ?? null);
  const [removeImage, setRemoveImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setRemoveImage(false);
    }
  }

  function handleRemoveImage() {
    setImagePreview(null);
    setRemoveImage(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

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

        {/* Image upload */}
        <FormCard title="Imagen del proyecto">
          <p className="text-xs text-muted-foreground mb-4">
            Captura de pantalla real del proyecto. Se mostrará dentro del marco (phone o browser).
            <br />
            <span className="text-foreground/60">
              📱 Móvil: 390×844px · 🖥️ Web: 1280×800px
            </span>
          </p>

          {imagePreview ? (
            <div className="relative rounded-xl overflow-hidden border border-border max-w-xs mb-4">
              <img src={imagePreview} alt="Preview" className="w-full h-auto max-h-64 object-cover object-top" />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-background/80 border border-border text-muted-foreground hover:text-destructive hover:border-destructive/50 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="mb-4 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/20 py-10 cursor-pointer hover:border-brand-500/40 hover:bg-brand-500/5 transition-colors"
            >
              <ImagePlus className="h-8 w-8 text-muted-foreground/40 mb-2" />
              <p className="text-sm text-muted-foreground">Haz clic para subir una imagen</p>
              <p className="text-xs text-muted-foreground/60 mt-1">PNG, JPG, WebP · Máx 5MB</p>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            name="imageFile"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <input type="hidden" name="existingImageUrl" value={project?.imageUrl ?? ""} />
          {removeImage && <input type="hidden" name="removeImage" value="true" />}

          {!imagePreview && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs text-brand-400 hover:text-brand-300 transition-colors"
            >
              Seleccionar archivo
            </button>
          )}
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
