"use client";

import React from "react";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { useAdminMode } from "@/lib/admin/AdminModeContext";

export function AdminEditButton({ href, label = "Editar" }: { href: string; label?: string }) {
  const isAdmin = useAdminMode();
  if (!isAdmin) return null;

  return (
    <Link
      href={href}
      className="absolute top-4 right-4 z-20 flex items-center gap-1.5 rounded-lg border border-brand-500/40 bg-[#0d0b14]/80 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-brand-400 hover:border-brand-500 hover:bg-brand-500/15 transition-all shadow-sm"
    >
      <Pencil className="h-3 w-3" />
      {label}
    </Link>
  );
}
