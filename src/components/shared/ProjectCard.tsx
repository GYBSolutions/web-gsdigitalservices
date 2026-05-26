"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { TechStack } from "@/components/shared/TechBadge";
import { AppMockup } from "@/components/shared/AppMockup";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface ProjectCardProps {
  project: Project;
  className?: string;
  index?: number;
}

export function ProjectCard({ project, className, index = 0 }: ProjectCardProps) {
  const { lang } = useLanguage();
  const title = lang === "es" && project.es ? project.es.title : project.title;
  const description = lang === "es" && project.es ? project.es.description : project.description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <Link href={`/case-studies/${project.slug}`} className="group block h-full">
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 h-full",
            "hover:border-brand-500/40 hover:shadow-glow-sm hover:-translate-y-1",
            className
          )}
        >
          {/* Hover gradient */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"
            style={{
              background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${project.accentColor}10, transparent 40%)`,
            }}
          />

          {/* Mockup preview */}
          <div
            className="relative overflow-hidden"
            style={{
              background: `linear-gradient(160deg, ${project.accentColor}18 0%, ${project.accentColor}08 50%, transparent 100%)`,
              borderBottom: `1px solid ${project.accentColor}20`,
            }}
          >
            <div className="flex items-end justify-center pt-6 pb-0 px-6 min-h-[180px]">
              {project.mockupType === "ios" ? (
                <AppMockup
                  type="ios"
                  accentColor={project.accentColor}
                  size="sm"
                  className="pb-0"
                />
              ) : (
                <AppMockup
                  type={project.mockupType === "dashboard" ? "dashboard" : "web"}
                  accentColor={project.accentColor}
                  size="sm"
                  className="w-full pb-2 px-2"
                />
              )}
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <Badge variant="brand" className="mb-2 text-[11px]">
                  {project.category}
                </Badge>
                <h3 className="text-base font-semibold text-foreground leading-snug group-hover:text-brand-400 transition-colors">
                  {title}
                </h3>
              </div>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground group-hover:border-brand-500/50 group-hover:text-brand-400 group-hover:bg-brand-500/10 transition-all ml-4">
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {description}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {project.metrics.slice(0, 2).map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-lg border border-border/50 bg-muted/30 px-3 py-2"
                >
                  <div className="text-base font-bold text-foreground" style={{ color: project.accentColor }}>
                    {metric.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            <TechStack technologies={project.stack} limit={5} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
