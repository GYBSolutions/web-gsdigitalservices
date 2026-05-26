import React from "react";
import Link from "next/link";
import { Star, FolderOpen, Briefcase, MessageSquare, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { getProjects, getServices, getTestimonials } from "@/lib/content";

export default async function AdminDashboard() {
  const configured = isSupabaseConfigured();
  const [projects, services, testimonials] = await Promise.all([
    getProjects(),
    getServices(),
    getTestimonials(),
  ]);

  const cards = [
    {
      label: "Proyectos",
      count: projects.length,
      icon: FolderOpen,
      href: "/admin/projects",
      color: "#7C3AED",
      desc: `${projects.filter((p) => p.featured).length} destacados`,
    },
    {
      label: "Servicios",
      count: services.length,
      icon: Briefcase,
      href: "/admin/services",
      color: "#6366F1",
      desc: `${services.filter((s) => s.featured).length} destacados`,
    },
    {
      label: "Testimonios",
      count: testimonials.length,
      icon: MessageSquare,
      href: "/admin/testimonials",
      color: "#10B981",
      desc: "Opiniones de clientes",
    },
    {
      label: "Hero",
      count: null,
      icon: Star,
      href: "/admin/hero",
      color: "#F59E0B",
      desc: "Encabezado principal",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Administra el contenido de tu sitio web
        </p>
      </div>

      {/* Supabase status */}
      {!configured && (
        <div className="mb-8 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">
                Supabase no configurado — mostrando datos estáticos
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                Para guardar cambios en producción (Vercel), necesitas conectar Supabase.
              </p>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <p className="font-medium text-foreground">Pasos rápidos:</p>
                <p>1. Crea un proyecto en <span className="text-brand-400 font-mono">supabase.com</span> (gratis)</p>
                <p>2. Corre el SQL en <span className="font-mono text-brand-400">src/lib/supabase/schema.sql</span></p>
                <p>3. Agrega al <span className="font-mono text-brand-400">.env.local</span>:</p>
                <div className="rounded-lg bg-muted/50 border border-border p-3 font-mono text-[11px] space-y-0.5">
                  <p>NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co</p>
                  <p>NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...</p>
                  <p>SUPABASE_SERVICE_ROLE_KEY=eyJ...</p>
                  <p>ADMIN_PASSWORD=tu-contrasena-segura</p>
                  <p>ADMIN_SECRET=un-string-aleatorio-largo</p>
                </div>
                <p>4. Reinicia el servidor: <span className="font-mono text-brand-400">npm run dev</span></p>
              </div>
            </div>
          </div>
        </div>
      )}

      {configured && (
        <div className="mb-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
          <p className="text-sm text-foreground">
            Supabase conectado — los cambios se guardan y publican en tiempo real.
          </p>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.href} href={card.href} className="group block">
              <div className="rounded-2xl border border-border bg-card p-5 hover:border-brand-500/40 hover:-translate-y-0.5 transition-all duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${card.color}20`, color: card.color }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-brand-400 transition-colors" />
                </div>
                {card.count !== null && (
                  <p className="text-3xl font-bold text-foreground mb-0.5">{card.count}</p>
                )}
                <p className="text-sm font-medium text-foreground">{card.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{card.desc}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick links */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-sm font-semibold text-foreground mb-4">Acciones rápidas</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 rounded-xl border border-brand-500/30 bg-brand-500/10 px-4 py-2 text-sm font-medium text-brand-400 hover:bg-brand-500/15 transition-colors"
          >
            <FolderOpen className="h-4 w-4" />
            Nuevo proyecto
          </Link>
          <Link
            href="/admin/testimonials/new"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-muted/30 px-4 py-2 text-sm font-medium text-foreground hover:bg-accent/50 transition-colors"
          >
            <MessageSquare className="h-4 w-4" />
            Nuevo testimonio
          </Link>
          <Link
            href="/admin/hero"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-muted/30 px-4 py-2 text-sm font-medium text-foreground hover:bg-accent/50 transition-colors"
          >
            <Star className="h-4 w-4" />
            Editar hero
          </Link>
        </div>
      </div>
    </div>
  );
}
