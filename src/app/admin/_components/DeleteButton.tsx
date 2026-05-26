"use client";

import React, { useTransition } from "react";
import { Trash2 } from "lucide-react";

interface DeleteButtonProps {
  id: string;
  action: (id: string) => Promise<{ error?: string } | undefined>;
  label?: string;
}

export function DeleteButton({ id, action, label = "elemento" }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    if (!confirm(`¿Eliminar este ${label}? Esta acción no se puede deshacer.`)) return;
    startTransition(async () => {
      await action(id);
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="flex items-center gap-1.5 rounded-lg border border-destructive/30 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50"
    >
      <Trash2 className="h-3.5 w-3.5" />
      {isPending ? "..." : "Eliminar"}
    </button>
  );
}
