"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, MessageSquare, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/shared/GradientText";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function CTASection() {
  const { t } = useLanguage();

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-brand-950/20 to-background" />
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-brand-600/15 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-indigo-600/10 blur-[100px]" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-500 mb-4">
              {t.cta.eyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.05] mb-6">
              {t.cta.title}
              <br />
              <GradientText>{t.cta.titleHighlight}</GradientText>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto">
              {t.cta.description}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {t.cta.benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-brand-500 shrink-0" />
                  {benefit}
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="xl" variant="gradient" className="gap-2 group">
                <Link href="/contact">
                  <Calendar className="h-5 w-5" />
                  {t.cta.ctaPrimary}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="glass" className="gap-2">
                <Link href="/case-studies">
                  <MessageSquare className="h-5 w-5" />
                  {t.cta.ctaSecondary}
                </Link>
              </Button>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <p className="mt-8 text-xs text-muted-foreground">
              {t.cta.contact}{" "}
              <a
                href="mailto:hello@seijas.dev"
                className="text-brand-400 hover:text-brand-300 transition-colors"
              >
                hello@seijas.dev
              </a>
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
