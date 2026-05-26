"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Calendar,
  MessageSquare,
  Clock,
  CheckCircle2,
  ArrowRight,
  Send,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { submitContactAction } from "@/app/contact/actions";

const serviceOptions = [
  "Mobile App Development (iOS)",
  "AI Integration & Automation",
  "Product Architecture",
  "MVP Development",
  "UI/UX Engineering",
  "Backend & APIs",
  "Technical Consulting",
  "Other",
];

const budgetOptions = [
  "< $10K (Scoping call)",
  "$10K – $25K (Small project)",
  "$25K – $75K (Medium project)",
  "$75K – $150K (Large project)",
  "$150K+ (Enterprise / retainer)",
  "Not sure yet",
];

const timelineOptions = [
  "ASAP (< 1 month)",
  "1–3 months",
  "3–6 months",
  "6+ months",
  "Flexible",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const [service, setService] = useState("");
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    // Inject controlled select values
    fd.set("service", service);
    fd.set("timeline", timeline);
    fd.set("budget", budget);
    startTransition(async () => {
      const result = await submitContactAction(fd);
      if (result?.error) {
        setError(result.error);
      } else {
        setSubmitted(true);
      }
    });
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-12 text-center"
      >
        <CheckCircle2 className="h-14 w-14 text-emerald-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">¡Mensaje recibido!</h2>
        <p className="text-muted-foreground mb-6">
          Gracias por tu mensaje. Revisaré los detalles de tu proyecto y responderé en menos de 24 horas.
        </p>
        <Button asChild variant="outline">
          <Link href="/case-studies">Ver proyectos mientras esperas</Link>
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-card p-8 space-y-6"
    >
      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre completo *</Label>
          <Input id="name" name="name" placeholder="Alex Johnson" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" name="email" type="email" placeholder="alex@empresa.com" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Empresa / Proyecto</Label>
        <Input id="company" name="company" placeholder="Acme Inc. o Mi Startup" />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label>Servicio requerido *</Label>
          <Select value={service} onValueChange={setService} required>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un servicio" />
            </SelectTrigger>
            <SelectContent>
              {serviceOptions.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Timeline del proyecto</Label>
          <Select value={timeline} onValueChange={setTimeline}>
            <SelectTrigger>
              <SelectValue placeholder="¿Cuándo lo necesitas?" />
            </SelectTrigger>
            <SelectContent>
              {timelineOptions.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Presupuesto estimado</Label>
        <Select value={budget} onValueChange={setBudget}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un rango" />
          </SelectTrigger>
          <SelectContent>
            {budgetOptions.map((b) => (
              <SelectItem key={b} value={b}>{b}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Cuéntame sobre tu proyecto *</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="¿Qué estás construyendo? ¿Cuál es el desafío principal? ¿Cómo se ve el éxito? Con más detalle, mejor respuesta."
          rows={5}
          required
          className="resize-none"
        />
      </div>

      <Button
        type="submit"
        variant="gradient"
        size="lg"
        className="w-full gap-2"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Enviar mensaje
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        Sin spam. Tu información es privada y nunca se comparte.
      </p>
    </form>
  );
}

export function ContactSidebar() {
  return (
    <AnimatedSection delay={0.15} direction="left" className="space-y-5">
      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">¿Prefieres contacto directo?</h3>
        <div className="space-y-3">
          <a
            href="mailto:hello@seijas.dev"
            className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-muted/50 text-brand-500">
              <Mail className="h-4 w-4" />
            </div>
            hello@seijas.dev
          </a>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-muted/50 text-brand-500">
              <Clock className="h-4 w-4" />
            </div>
            Respuesta en menos de 24 horas
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-brand-500/30 bg-brand-500/5 p-6">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="h-5 w-5 text-brand-500" />
          <h3 className="text-sm font-semibold text-foreground">Agenda una llamada gratuita</h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed mb-4">
          Sin vueltas. Agenda 45 minutos para hablar de tu proyecto directamente. Sin compromiso.
        </p>
        <Button variant="gradient" size="sm" className="w-full gap-2" asChild>
          <a href="#calendly-placeholder">
            <Calendar className="h-3.5 w-3.5" />
            Agendar llamada
          </a>
        </Button>
        <p className="text-[10px] text-muted-foreground text-center mt-2">
          Configura tu link de Calendly en el código
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">Qué puedes esperar</h3>
        <div className="space-y-3">
          {[
            { step: "01", text: "Reviso los detalles de tu proyecto con cuidado" },
            { step: "02", text: "Respuesta en 24hs con feedback honesto" },
            { step: "03", text: "Llamada de discovery para alinear alcance y objetivos" },
            { step: "04", text: "Propuesta detallada con timeline y precio" },
            { step: "05", text: "A construir" },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-3">
              <span className="text-xs font-mono text-brand-500 shrink-0 mt-0.5">{item.step}</span>
              <span className="text-xs text-muted-foreground">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border/50 bg-muted/20 p-4">
        <div className="flex items-start gap-2">
          <MessageSquare className="h-4 w-4 text-brand-500 shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="text-foreground font-medium">Nota honesta:</span>{" Tomo un número limitado de proyectos para garantizar calidad. Si no soy el perfil adecuado para tu proyecto, te lo digo — y suelo recomendar a alguien que sí lo sea."}
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}
