import React from "react";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { getServices } from "@/lib/content";

export default async function ServicesAdminPage() {
  const services = await getServices();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Servicios</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {services.length} servicios · haz clic en Editar para modificar
        </p>
      </div>

      <div className="space-y-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 hover:border-brand-500/30 transition-colors"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-500/20 bg-brand-500/10">
              <span className="text-lg">🛠</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{service.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">{service.description}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {service.featured && (
                <span className="text-xs rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 px-2.5 py-0.5 font-medium hidden sm:block">
                  Destacado
                </span>
              )}
              <Link
                href={`/admin/services/${service.id}`}
                className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent/50 transition-colors"
              >
                <Pencil className="h-3.5 w-3.5" />
                Editar
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
