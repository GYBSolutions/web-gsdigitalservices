"use client";

import React, { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import type { Testimonial } from "@/types";
import { saveTestimonialAction } from "../actions";
import { FormCard, Field, Grid, SaveBar } from "./AdminForm";

interface TestimonialFormProps {
  testimonial?: Partial<Testimonial>;
  isNew?: boolean;
}

export function TestimonialForm({ testimonial, isNew }: TestimonialFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [rating, setRating] = useState(testimonial?.rating ?? 5);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSaved(false);
    const fd = new FormData(e.currentTarget);
    fd.set("rating", rating.toString());
    startTransition(async () => {
      const result = await saveTestimonialAction(fd);
      if (result?.error) setError(result.error);
      else {
        setSaved(true);
        router.push("/admin/testimonials");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-2xl">
      <SaveBar isPending={isPending} saved={saved} error={error} />

      <h1 className="text-2xl font-bold text-foreground mb-8">
        {isNew ? "Nuevo testimonio" : "Editar testimonio"}
      </h1>

      {testimonial?.id && <input type="hidden" name="id" value={testimonial.id} />}

      <div className="space-y-6">
        <FormCard title="Autor">
          <Grid cols={2}>
            <Field label="Nombre completo">
              <input name="name" required defaultValue={testimonial?.name} placeholder="Marcus Chen" />
            </Field>
            <Field label="Cargo">
              <input name="role" required defaultValue={testimonial?.role} placeholder="CTO" />
            </Field>
            <Field label="Empresa">
              <input name="company" required defaultValue={testimonial?.company} placeholder="TechVentures" />
            </Field>
            <Field label="Tipo de proyecto">
              <input name="projectType" defaultValue={testimonial?.projectType} placeholder="iOS App" />
            </Field>
          </Grid>
        </FormCard>

        <FormCard title="Testimonio">
          <div className="space-y-4">
            <Field label="Contenido">
              <textarea name="content" rows={5} required defaultValue={testimonial?.content} placeholder="Yen delivered exceptional work..." />
            </Field>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-2">
                Calificación: {rating} estrellas
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n)}
                    className={`text-xl transition-transform hover:scale-110 ${n <= rating ? "text-amber-400" : "text-muted-foreground/30"}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          </div>
        </FormCard>
      </div>
    </form>
  );
}
