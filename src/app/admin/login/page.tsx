"use client";

import React, { useState, useTransition } from "react";
import { Zap, Lock, Eye, EyeOff } from "lucide-react";
import { loginAction } from "./actions";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await loginAction(fd);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient shadow-glow-sm">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-foreground">
            Seijas<span className="text-brand-500">.</span>dev
          </span>
          <span className="text-xs text-muted-foreground border border-border rounded-md px-2 py-0.5 ml-1">
            Admin
          </span>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-card-dark">
          <div className="flex items-center justify-center h-12 w-12 rounded-2xl border border-brand-500/20 bg-brand-500/10 mx-auto mb-6">
            <Lock className="h-5 w-5 text-brand-500" />
          </div>
          <h1 className="text-xl font-bold text-foreground text-center mb-1">
            Panel de administración
          </h1>
          <p className="text-sm text-muted-foreground text-center mb-6">
            Ingresa tu contraseña para continuar
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoFocus
                  className="w-full rounded-xl border border-border bg-muted/30 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-xl bg-brand-gradient py-2.5 text-sm font-semibold text-white shadow-glow-sm hover:shadow-glow-md transition-shadow disabled:opacity-60"
            >
              {isPending ? "Verificando..." : "Ingresar"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Configura{" "}
          <code className="font-mono text-brand-400">ADMIN_PASSWORD</code>{" "}
          en tus variables de entorno
        </p>
      </div>
    </div>
  );
}
