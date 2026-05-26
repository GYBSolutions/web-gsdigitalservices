"use client";

import React from "react";

export function FormCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h2 className="text-sm font-semibold text-foreground mb-5 pb-3 border-b border-border">
        {title}
      </h2>
      {children}
    </div>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactElement;
}) {
  const inputClass =
    "w-full rounded-xl border border-border bg-muted/30 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/50 resize-none transition-colors";

  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</label>
      {React.cloneElement(children, { className: inputClass })}
      {hint && <p className="text-[11px] text-muted-foreground/60 mt-1">{hint}</p>}
    </div>
  );
}

export function Grid({
  cols = 2,
  children,
}: {
  cols?: 2 | 3 | 4;
  children: React.ReactNode;
}) {
  const cls =
    cols === 4
      ? "grid grid-cols-2 md:grid-cols-4 gap-4"
      : cols === 3
      ? "grid grid-cols-1 md:grid-cols-3 gap-4"
      : "grid grid-cols-1 md:grid-cols-2 gap-4";
  return <div className={cls}>{children}</div>;
}

export function SaveBar({
  isPending,
  saved,
  error,
}: {
  isPending: boolean;
  saved: boolean;
  error: string;
}) {
  return (
    <div className="sticky top-0 z-10 -mx-8 -mt-8 px-8 py-4 bg-background/80 backdrop-blur-sm border-b border-border mb-8 flex items-center justify-between">
      <div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        {saved && !error && (
          <p className="text-sm text-emerald-400">✓ Guardado correctamente</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-glow-sm hover:shadow-glow-md transition-shadow disabled:opacity-60"
      >
        {isPending ? "Guardando..." : "Guardar cambios"}
      </button>
    </div>
  );
}
