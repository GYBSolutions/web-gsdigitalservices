"use client";

import React, { useTransition, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FormCard, Field, Grid, SaveBar } from "../../_components/AdminForm";
import { saveServiceAction } from "../../actions";
import { services as staticServices } from "@/lib/data/services";

const iconOptions = ["Smartphone", "Brain", "Layers", "Rocket", "Palette", "Server", "Workflow", "Lightbulb"];

export default function EditServicePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const service = staticServices.find((s) => s.id === id);

  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  if (!service) return <div className="p-8 text-muted-foreground">Servicio no encontrado.</div>;

  const arrToLines = (arr: string[]) => arr.join("\n");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSaved(false);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await saveServiceAction(fd);
      if (result?.error) setError(result.error);
      else {
        setSaved(true);
        router.push("/admin/services");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-3xl">
      <SaveBar isPending={isPending} saved={saved} error={error} />

      <h1 className="text-2xl font-bold text-foreground mb-8">Editar servicio</h1>

      <input type="hidden" name="id" value={service.id} />

      <div className="space-y-6">
        <FormCard title="Información principal">
          <div className="space-y-4">
            <Grid cols={2}>
              <Field label="Título">
                <input name="title" required defaultValue={service.title} />
              </Field>
              <Field label="Ícono">
                <select name="icon" defaultValue={service.icon}>
                  {iconOptions.map((icon) => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </Field>
            </Grid>
            <Field label="Descripción corta">
              <textarea name="description" rows={2} defaultValue={service.description} />
            </Field>
            <Field label="Descripción larga">
              <textarea name="longDescription" rows={5} defaultValue={service.longDescription} />
            </Field>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="featured"
                id="featured"
                defaultChecked={service.featured}
                className="h-4 w-4 rounded border-border accent-brand-500"
              />
              <label htmlFor="featured" className="text-sm text-foreground cursor-pointer">
                Servicio destacado
              </label>
            </div>
          </div>
        </FormCard>

        <FormCard title="Tags y tecnologías">
          <Grid cols={2}>
            <Field label="Tags" hint="Una por línea">
              <textarea name="tags" rows={4} defaultValue={arrToLines(service.tags)} />
            </Field>
            <Field label="Tecnologías" hint="Una por línea">
              <textarea name="technologies" rows={4} defaultValue={arrToLines(service.technologies)} />
            </Field>
          </Grid>
        </FormCard>

        <FormCard title="Entregables y proceso">
          <Grid cols={2}>
            <Field label="Entregables" hint="Uno por línea">
              <textarea name="deliverables" rows={5} defaultValue={arrToLines(service.deliverables)} />
            </Field>
            <Field label="Ideal para" hint="Uno por línea">
              <textarea name="idealFor" rows={5} defaultValue={arrToLines(service.idealFor)} />
            </Field>
          </Grid>
          <div className="mt-4">
            <Field label="Pasos del proceso" hint="Uno por línea">
              <textarea name="process" rows={4} defaultValue={arrToLines(service.process)} />
            </Field>
          </div>
        </FormCard>
      </div>
    </form>
  );
}
