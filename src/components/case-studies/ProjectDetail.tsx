"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Zap } from "lucide-react";
import type { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TechStack } from "@/components/shared/TechBadge";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { CTASection } from "@/components/home/CTASection";
import { AppMockup, DualMockup } from "@/components/shared/AppMockup";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface Props {
  project: Project;
}

export function ProjectDetail({ project }: Props) {
  const { t, lang } = useLanguage();
  const title = lang === "es" && project.es ? project.es.title : project.title;
  const longDesc = lang === "es" && project.es ? project.es.longDescription : project.longDescription;

  return (
    <>
      <article className="pt-28 pb-20">
        <div className="container mx-auto max-w-5xl">

          {/* Back link */}
          <AnimatedSection>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.detail.backToWork}
            </Link>
          </AnimatedSection>

          {/* Hero — two column on desktop */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <AnimatedSection>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant="brand">{project.category}</Badge>
                <span className="text-xs font-mono text-muted-foreground">{project.year}</span>
                {project.status === "live" && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 rounded-full px-2.5 py-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {t.detail.liveApp}
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.08] mb-6">
                {title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {longDesc}
              </p>
              <div className="flex gap-3 flex-wrap">
                <Button asChild variant="gradient">
                  <Link href="/contact">{t.detail.buildSimilar}</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/case-studies">{t.detail.allWork}</Link>
                </Button>
              </div>
            </AnimatedSection>

            {/* Mockup */}
            <AnimatedSection delay={0.15} className="flex items-center justify-center lg:justify-end">
              {project.mockupType === "ios" ? (
                <AppMockup type="ios" accentColor={project.accentColor} size="lg" />
              ) : (
                <DualMockup accentColor={project.accentColor} className="w-full max-w-sm" />
              )}
            </AnimatedSection>
          </div>

          {/* Metrics */}
          <AnimatedSection delay={0.1} className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">{t.detail.results}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-2xl border bg-card p-5"
                  style={{ borderColor: `${project.accentColor}30` }}
                >
                  <div
                    className="text-3xl font-bold mb-1"
                    style={{ color: project.accentColor }}
                  >
                    {m.value}
                  </div>
                  <div className="text-sm font-medium text-foreground">{m.label}</div>
                  {m.improvement && (
                    <div className="text-xs text-muted-foreground mt-1">{m.improvement}</div>
                  )}
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Challenges & Solutions */}
          {project.challenges.length > 0 && (
            <AnimatedSection delay={0.15} className="mb-16">
              <h2 className="text-2xl font-bold text-foreground mb-6">{t.detail.challenges}</h2>
              <div className="space-y-4">
                {project.challenges.map((challenge, i) => (
                  <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden">
                    <div className="flex items-start gap-4 p-5">
                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-sm font-bold"
                        style={{ backgroundColor: `${project.accentColor}20`, color: project.accentColor }}
                      >
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground mb-3">{challenge}</p>
                        {project.solutions[i] && (
                          <div className="flex items-start gap-2 rounded-xl bg-brand-500/5 border border-brand-500/15 p-3">
                            <CheckCircle2 className="h-4 w-4 text-brand-500 shrink-0 mt-0.5" />
                            <p className="text-sm text-foreground/80">{project.solutions[i]}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          )}

          {/* Architecture */}
          <AnimatedSection delay={0.2} className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">{t.detail.architecture}</h2>
            <div className="rounded-2xl border border-border bg-card p-6 mb-4">
              <div className="flex items-start gap-3">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${project.accentColor}20` }}
                >
                  <Zap className="h-4 w-4" style={{ color: project.accentColor }} />
                </div>
                <p className="text-muted-foreground leading-relaxed">{project.architecture}</p>
              </div>
            </div>

            <h3 className="text-sm font-semibold text-foreground mb-3">{t.detail.techStack}</h3>
            <TechStack technologies={project.stack} />
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection delay={0.25} className="flex gap-3 flex-wrap">
            <Button asChild variant="gradient">
              <Link href="/contact">{t.detail.buildSimilar}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/case-studies">{t.detail.allWork}</Link>
            </Button>
          </AnimatedSection>
        </div>
      </article>

      <CTASection />
    </>
  );
}
