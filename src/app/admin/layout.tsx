import React from "react";
import Link from "next/link";
import { Zap, LayoutDashboard, FolderOpen, Briefcase, MessageSquare, Star, LogOut, ExternalLink, Mail } from "lucide-react";
import { logoutAction } from "./login/actions";

const navLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/hero", label: "Hero & General", icon: Star },
  { href: "/admin/projects", label: "Proyectos", icon: FolderOpen },
  { href: "/admin/services", label: "Servicios", icon: Briefcase },
  { href: "/admin/testimonials", label: "Testimonios", icon: MessageSquare },
  { href: "/admin/contacts", label: "Contactos", icon: Mail },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 border-r border-border bg-card flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-border">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient shadow-glow-sm">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <div>
            <span className="text-sm font-semibold text-foreground leading-none">
              Seijas<span className="text-brand-500">.</span>dev
            </span>
            <p className="text-[10px] text-muted-foreground mt-0.5">Panel Admin</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navLinks.map((item) => (
            <AdminNavLink key={item.href} {...item} />
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 pb-4 space-y-0.5 border-t border-border pt-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
          >
            <ExternalLink className="h-4 w-4 shrink-0" />
            Ver sitio
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}

function AdminNavLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  exact?: boolean;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
    >
      <Icon className="h-4 w-4 shrink-0" />
      {label}
    </Link>
  );
}
