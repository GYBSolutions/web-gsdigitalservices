import React from "react";
import Link from "next/link";
import { Plus, Pencil, Star } from "lucide-react";
import { getTestimonials } from "@/lib/content";
import { DeleteButton } from "../_components/DeleteButton";
import { deleteTestimonialAction } from "../actions";

export default async function TestimonialsAdminPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Testimonios</h1>
          <p className="text-sm text-muted-foreground mt-1">{testimonials.length} testimonios</p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-glow-sm hover:shadow-glow-md transition-shadow"
        >
          <Plus className="h-4 w-4" />
          Nuevo testimonio
        </Link>
      </div>

      <div className="space-y-3">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4 hover:border-brand-500/30 transition-colors"
          >
            {/* Avatar */}
            <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-brand-500/20 to-indigo-500/20 border border-brand-500/20 flex items-center justify-center text-sm font-semibold text-brand-400">
              {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <span className="text-xs text-muted-foreground">{t.role}, {t.company}</span>
              </div>
              <div className="flex gap-0.5 my-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 italic">&ldquo;{t.content}&rdquo;</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={`/admin/testimonials/${t.id}`}
                className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent/50 transition-colors"
              >
                <Pencil className="h-3.5 w-3.5" />
                Editar
              </Link>
              <DeleteButton id={t.id} action={deleteTestimonialAction} label="testimonio" />
            </div>
          </div>
        ))}

        {testimonials.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground text-sm">No hay testimonios aún.</p>
            <Link href="/admin/testimonials/new" className="text-brand-400 text-sm mt-2 inline-block">
              Agregar el primero →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
