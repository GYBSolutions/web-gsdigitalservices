"use client";

import React from "react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/shared/AnimatedSection";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const techStack = [
  "Swift", "SwiftUI", "iOS", "Xcode", "Core ML", "Create ML",
  "React Native", "Next.js", "TypeScript", "Node.js", "Go",
  "PostgreSQL", "Redis", "Supabase", "Firebase", "AWS", "Vercel",
  "Docker", "Kubernetes", "OpenAI", "Anthropic", "LangChain",
  "Stripe", "Plaid", "GraphQL", "REST", "gRPC",
];

export function TrustSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 border-y border-border overflow-hidden">
      <div className="container mx-auto">
        {/* Stats grid */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {t.trust.achievements.map((item) => (
            <StaggerItem key={item.label}>
              <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 hover:border-brand-500/40 transition-colors">
                <div className="absolute inset-0 bg-brand-gradient-subtle opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="text-4xl font-bold text-foreground mb-1 font-mono">
                    {item.value}
                  </div>
                  <div className="text-sm font-semibold text-foreground mb-1">
                    {item.label}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {item.description}
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Tech marquee */}
        <AnimatedSection>
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">
            {t.trust.marqueeLabel}
          </p>
        </AnimatedSection>

        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

          <div className="flex gap-3 marquee-track">
            {[...techStack, ...techStack].map((tech, i) => (
              <div
                key={`${tech}-${i}`}
                className="flex items-center shrink-0 rounded-lg border border-border bg-muted/30 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-brand-500/40 hover:bg-brand-500/5 transition-colors cursor-default"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
