"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Building2, Briefcase, CheckCircle2 } from "lucide-react";
import type { CaseStudy } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TechStack } from "@/components/shared/TechBadge";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { CTASection } from "@/components/home/CTASection";
import { AppMockup } from "@/components/shared/AppMockup";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface Props {
  caseStudy: CaseStudy;
}

export function CaseStudyDetail({ caseStudy }: Props) {
  const { t } = useLanguage();

  const mockupType = caseStudy.stack.some((s) =>
    ["Swift", "SwiftUI", "iOS", "WatchKit"].includes(s)
  )
    ? "ios"
    : "web";

  return (
    <>
      <article className="pt-28 pb-20">
        <div className="container mx-auto max-w-5xl">
          <AnimatedSection>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.detail.backToWork}
            </Link>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="brand">{caseStudy.industry}</Badge>
              <span className="text-xs text-muted-foreground font-mono">{caseStudy.year}</span>
            </div>
          </AnimatedSection>

          {/* Hero grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <AnimatedSection delay={0.05}>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight mb-6">
                {caseStudy.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {caseStudy.summary}
              </p>
              <div className="flex flex-wrap gap-5 text-sm text-muted-foreground mb-8">
                <div className="flex items-center gap-1.5">
                  <Building2 className="h-4 w-4 text-brand-500" />
                  <span className="text-foreground font-medium">{caseStudy.client}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-brand-500" />
                  <span>{caseStudy.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Briefcase className="h-4 w-4 text-brand-500" />
                  <span>{caseStudy.role}</span>
                </div>
              </div>
              <div className="flex gap-3 flex-wrap">
                <Button asChild variant="gradient">
                  <Link href="/contact">{t.detail.workTogether}</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/case-studies">{t.detail.allWork}</Link>
                </Button>
              </div>
            </AnimatedSection>

            {/* Mockup */}
            <AnimatedSection delay={0.15} className="flex items-center justify-center lg:justify-end">
              <AppMockup
                type={mockupType}
                accentColor={caseStudy.accentColor}
                size="lg"
                className={mockupType === "web" ? "w-full max-w-md" : ""}
              />
            </AnimatedSection>
          </div>

          {/* Results */}
          <AnimatedSection delay={0.1} className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">{t.detail.results}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {caseStudy.results.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border bg-card p-6"
                  style={{ borderColor: `${caseStudy.accentColor}30` }}
                >
                  <div className="text-3xl font-bold mb-1" style={{ color: caseStudy.accentColor }}>
                    {metric.value}
                  </div>
                  <div className="text-sm font-medium text-foreground">{metric.label}</div>
                  {metric.improvement && (
                    <div className="text-xs text-muted-foreground mt-1">{metric.improvement}</div>
                  )}
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Problem & Solution */}
          <AnimatedSection delay={0.15} className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-bold text-foreground mb-3">{t.detail.problem}</h2>
              <p className="text-muted-foreground leading-relaxed text-sm">{caseStudy.problem}</p>
            </div>
            <div className="rounded-2xl border border-brand-500/20 bg-brand-500/5 p-6">
              <h2 className="text-lg font-bold text-foreground mb-3">{t.detail.solution}</h2>
              <p className="text-muted-foreground leading-relaxed text-sm">{caseStudy.solution}</p>
            </div>
          </AnimatedSection>

          {/* Architecture */}
          <AnimatedSection delay={0.2} className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">{t.detail.architecture}</h2>
            <div className="rounded-2xl border border-border bg-card p-6 mb-4">
              <p className="text-muted-foreground leading-relaxed">{caseStudy.architecture}</p>
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-3">{t.detail.techStack}</h3>
            <TechStack technologies={caseStudy.stack} />
          </AnimatedSection>

          {/* Challenges */}
          <AnimatedSection delay={0.25} className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">{t.detail.challenges}</h2>
            <div className="space-y-4">
              {caseStudy.challenges.map((challenge) => (
                <div key={challenge.title} className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="text-base font-semibold text-foreground mb-2">{challenge.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>
                  <div className="flex items-start gap-2 rounded-xl bg-brand-500/5 border border-brand-500/20 p-3">
                    <CheckCircle2 className="h-4 w-4 text-brand-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground">{challenge.resolution}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Process */}
          <AnimatedSection delay={0.3} className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">{t.detail.process}</h2>
            <div className="space-y-4">
              {caseStudy.process.map((step) => (
                <div key={step.phase} className="grid md:grid-cols-[56px_1fr] gap-4">
                  <div
                    className="flex items-center justify-center h-10 w-10 rounded-xl text-sm font-bold shrink-0"
                    style={{
                      backgroundColor: `${caseStudy.accentColor}20`,
                      color: caseStudy.accentColor,
                      border: `1px solid ${caseStudy.accentColor}40`,
                    }}
                  >
                    {step.phase}
                  </div>
                  <div className="rounded-2xl border border-border bg-card p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-foreground">{step.title}</h3>
                      <span className="text-xs text-muted-foreground border border-border rounded-full px-2.5 py-0.5">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {step.deliverables.map((d) => (
                        <span key={d} className="text-xs text-muted-foreground flex items-center gap-1">
                          <span className="h-1 w-1 rounded-full bg-brand-500" />
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.35} className="flex gap-3 flex-wrap">
            <Button asChild variant="gradient">
              <Link href="/contact">{t.detail.workTogether}</Link>
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
