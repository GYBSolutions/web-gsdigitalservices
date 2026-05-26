"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Smartphone,
  Brain,
  Layers,
  Rocket,
  Palette,
  Server,
  Workflow,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { StaggerContainer, StaggerItem } from "@/components/shared/AnimatedSection";
import { cn } from "@/lib/utils";
import { services as staticServices } from "@/lib/data/services";
import type { Service } from "@/types";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { AdminEditButton } from "@/components/admin/AdminEditButton";

const iconMap: Record<string, React.ElementType> = {
  Smartphone,
  Brain,
  Layers,
  Rocket,
  Palette,
  Server,
  Workflow,
  Lightbulb,
};

function ServiceCard({ service }: { service: Service }) {
  const Icon = iconMap[service.icon] || Lightbulb;

  return (
    <Link href={`/services#${service.id}`} className="group block">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn(
          "relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6",
          "hover:border-brand-500/40 hover:shadow-glow-sm transition-all duration-300",
          service.featured && "md:col-span-1"
        )}
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-brand-500/5 via-transparent to-transparent" />

        <div className="relative">
          <div
            className={cn(
              "mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border transition-colors duration-300",
              "border-brand-500/20 bg-brand-500/10 text-brand-500",
              "group-hover:border-brand-500/40 group-hover:bg-brand-500/15 group-hover:text-brand-400"
            )}
          >
            <Icon className="h-5 w-5" />
          </div>

          <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-brand-400 transition-colors">
            {service.title}
          </h3>

          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {service.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {service.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-md border border-border/50 bg-muted/50 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-500/20 text-brand-400">
            <ArrowRight className="h-3 w-3" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export function ServicesSection({ services: servicesProp }: { services?: Service[] }) {
  const { t } = useLanguage();
  const services = servicesProp ?? staticServices;

  return (
    <section className="py-24 relative">
      <AdminEditButton href="/admin/services" label="Editar Servicios" />
      <div className="container mx-auto">
        <SectionHeader
          eyebrow={t.services.eyebrow}
          title={t.services.title}
          titleHighlight={t.services.titleHighlight}
          description={t.services.description}
        />

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service) => (
            <StaggerItem key={service.id}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-brand-400 transition-colors"
          >
            {t.services.viewAll}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
