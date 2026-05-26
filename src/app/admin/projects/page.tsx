import React from "react";
import Link from "next/link";
import { Plus, Pencil, Star } from "lucide-react";
import { getProjects } from "@/lib/content";
import { DeleteButton } from "../_components/DeleteButton";
import { deleteProjectAction } from "../actions";

export default async function ProjectsAdminPage() {
  const projects = await getProjects();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Proyectos</h1>
          <p className="text-sm text-muted-foreground mt-1">{projects.length} proyectos en total</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-glow-sm hover:shadow-glow-md transition-shadow"
        >
          <Plus className="h-4 w-4" />
          Nuevo proyecto
        </Link>
      </div>

      <div className="space-y-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 hover:border-brand-500/30 transition-colors"
          >
            {/* Accent dot */}
            <div
              className="h-10 w-10 shrink-0 rounded-xl"
              style={{ backgroundColor: `${project.accentColor}25`, border: `1px solid ${project.accentColor}40` }}
            >
              <div className="h-full w-full flex items-center justify-center">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: project.accentColor }} />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-foreground truncate">{project.title}</p>
                {project.featured && (
                  <Star className="h-3.5 w-3.5 text-amber-400 shrink-0 fill-amber-400" />
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">{project.description}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-mono text-muted-foreground hidden sm:block">{project.year}</span>
              <span
                className={`text-xs rounded-full px-2.5 py-0.5 font-medium hidden sm:block ${
                  project.status === "live"
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-muted text-muted-foreground border border-border"
                }`}
              >
                {project.status}
              </span>
              <Link
                href={`/admin/projects/${project.id}`}
                className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent/50 transition-colors"
              >
                <Pencil className="h-3.5 w-3.5" />
                Editar
              </Link>
              <DeleteButton id={project.id} action={deleteProjectAction} label="proyecto" />
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground text-sm">No hay proyectos aún.</p>
            <Link href="/admin/projects/new" className="text-brand-400 hover:text-brand-300 text-sm mt-2 inline-block">
              Crear el primero →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
