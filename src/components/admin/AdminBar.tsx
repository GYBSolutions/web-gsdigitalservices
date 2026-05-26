import React from "react";
import Link from "next/link";
import { Zap, Pencil, Plus, LayoutDashboard, LogOut } from "lucide-react";
import { logoutAction } from "@/app/admin/login/actions";

interface AdminBarProps {
  isAdmin: boolean;
}

export function AdminBar({ isAdmin }: AdminBarProps) {
  if (!isAdmin) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[200] h-10 bg-[#0d0b14]/95 backdrop-blur-sm border-b border-brand-500/30 flex items-center px-4 gap-3 text-xs shadow-glow-sm">
      {/* Brand */}
      <div className="flex items-center gap-1.5 text-brand-400 font-semibold shrink-0">
        <div className="flex h-5 w-5 items-center justify-center rounded bg-brand-gradient">
          <Zap className="h-3 w-3 text-white" />
        </div>
        Admin Mode
      </div>

      <div className="h-4 w-px bg-border/50 shrink-0" />

      {/* Section links */}
      <nav className="flex items-center gap-0.5 overflow-x-auto">
        <Link
          href="/admin/hero"
          className="flex items-center gap-1 px-2.5 py-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors whitespace-nowrap"
        >
          <Pencil className="h-3 w-3" />
          Hero
        </Link>
        <Link
          href="/admin/projects"
          className="flex items-center gap-1 px-2.5 py-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors whitespace-nowrap"
        >
          <Pencil className="h-3 w-3" />
          Proyectos
        </Link>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-1 px-2.5 py-1 rounded-md text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 transition-colors whitespace-nowrap"
        >
          <Plus className="h-3 w-3" />
          Nuevo proyecto
        </Link>
        <Link
          href="/admin/services"
          className="flex items-center gap-1 px-2.5 py-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors whitespace-nowrap"
        >
          <Pencil className="h-3 w-3" />
          Servicios
        </Link>
        <Link
          href="/admin/testimonials"
          className="flex items-center gap-1 px-2.5 py-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors whitespace-nowrap"
        >
          <Pencil className="h-3 w-3" />
          Testimonios
        </Link>
      </nav>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-0.5 shrink-0">
        <Link
          href="/admin"
          className="flex items-center gap-1 px-2.5 py-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors whitespace-nowrap"
        >
          <LayoutDashboard className="h-3 w-3" />
          Panel
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex items-center gap-1 px-2.5 py-1 rounded-md text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors whitespace-nowrap"
          >
            <LogOut className="h-3 w-3" />
            Salir
          </button>
        </form>
      </div>
    </div>
  );
}
