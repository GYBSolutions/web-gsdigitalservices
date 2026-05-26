"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Code2,
  Cpu,
  Layers,
  Smartphone,
  Zap,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/shared/GradientText";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { AdminEditButton } from "@/components/admin/AdminEditButton";

const floatingBadges = [
  { icon: Smartphone, label: "iOS 17", color: "text-blue-400", delay: "0s" },
  { icon: Cpu, label: "AI/ML", color: "text-violet-400", delay: "0.15s" },
  { icon: Layers, label: "Architecture", color: "text-emerald-400", delay: "0.3s" },
  { icon: Globe, label: "Full-Stack", color: "text-orange-400", delay: "0.45s" },
  { icon: Code2, label: "SwiftUI", color: "text-pink-400", delay: "0.6s" },
  { icon: Zap, label: "Next.js", color: "text-yellow-400", delay: "0.75s" },
];

const badgePositions = [
  { top: "8%", left: "-30%" },
  { top: "20%", right: "-28%" },
  { top: "45%", left: "-32%" },
  { top: "55%", right: "-26%" },
  { top: "72%", left: "-28%" },
  { top: "82%", right: "-30%" },
];

const statsData = [
  { value: "10+", key: "years" as const },
  { value: "50+", key: "apps" as const },
  { value: "80K+", key: "users" as const },
  { value: "99.97%", key: "uptime" as const },
];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top } = containerRef.current.getBoundingClientRect();
      containerRef.current.style.setProperty("--mouse-x", `${e.clientX - left}px`);
      containerRef.current.style.setProperty("--mouse-y", `${e.clientY - top}px`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden hero-grid"
    >
      <AdminEditButton href="/admin/hero" label="Editar Hero" />
      {/* Gradient orbs — pure CSS, always visible */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="orb-1 absolute -top-40 -left-20 h-[600px] w-[600px] rounded-full bg-brand-600/20 blur-[120px]" />
        <div className="orb-2 absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-indigo-600/15 blur-[120px]" />
        <div className="orb-3 absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-brand-400/10 blur-[100px]" />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="container mx-auto relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left column — CSS animations for guaranteed visibility */}
          <div>
            <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-medium text-brand-400 mb-6">
              <Sparkles className="h-3 w-3" />
              {t.hero.badge}
            </div>

            <h1 className="hero-h1 text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.02em] leading-[1.05] text-foreground mb-6">
              {t.hero.heading}{" "}
              <br className="hidden sm:block" />
              <GradientText>{t.hero.headingHighlight}</GradientText>
              <br />
              {t.hero.headingEnd}
            </h1>

            <p className="hero-sub text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
              {t.hero.subtitle}
            </p>

            <div className="hero-cta flex flex-wrap gap-3 mb-12">
              <Button asChild size="lg" variant="gradient" className="gap-2">
                <Link href="/contact">
                  {t.hero.ctaPrimary}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="glass">
                <Link href="/case-studies">{t.hero.ctaSecondary}</Link>
              </Button>
            </div>

            <div className="hero-stats grid grid-cols-2 sm:grid-cols-4 gap-4">
              {statsData.map((stat) => (
                <div key={stat.key} className="text-left">
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{t.hero.stats[stat.key]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — portrait + floating badges */}
          <div className="hero-portrait relative hidden lg:flex items-center justify-center">
            <div className="relative">
              {/* Portrait card */}
              <div className="relative h-[420px] w-[340px] rounded-3xl overflow-hidden border border-brand-500/20 bg-gradient-to-br from-brand-500/10 via-indigo-500/5 to-transparent shadow-glow-md">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="h-32 w-32 rounded-full bg-gradient-to-br from-brand-500/30 to-indigo-500/30 border border-brand-500/20 flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl font-bold text-brand-400">YS</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Yen Seijas</p>
                    <p className="text-xs text-muted-foreground/60">Senior Software Engineer</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>

              {/* Floating tech badges — CSS-animated */}
              {floatingBadges.map((badge, i) => {
                const pos = badgePositions[i];
                return (
                  <div
                    key={badge.label}
                    className="animate-float absolute"
                    style={{
                      ...pos,
                      animation: `hero-fade-in 0.4s ease-out ${badge.delay} both, float 6s ease-in-out ${badge.delay} infinite`,
                    }}
                    aria-hidden
                  >
                    <div className="flex items-center gap-2 rounded-xl border border-border bg-card/90 backdrop-blur-sm px-3 py-2 shadow-card-dark text-xs font-medium whitespace-nowrap">
                      <badge.icon className={`h-3.5 w-3.5 ${badge.color}`} />
                      <span className="text-foreground">{badge.label}</span>
                    </div>
                  </div>
                );
              })}

              {/* Status badge */}
              <div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2"
                style={{ animation: "hero-fade-in 0.5s ease-out 1.2s both" }}
              >
                <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-400 whitespace-nowrap">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {t.hero.openBadge}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
