import type { Metadata } from "next";
import type { ElementType } from "react";
import Link from "next/link";
import {
  Smartphone,
  Brain,
  Layers,
  Rocket,
  Palette,
  Server,
  Workflow,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { services } from "@/lib/data/services";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TechStack } from "@/components/shared/TechBadge";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Full-spectrum software engineering services: iOS development, AI integration, product architecture, MVP development, and technical consulting.",
};

const iconMap: Record<string, ElementType> = {
  Smartphone,
  Brain,
  Layers,
  Rocket,
  Palette,
  Server,
  Workflow,
  Lightbulb,
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden hero-grid">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-brand-600/15 blur-[120px]" />
          <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-indigo-600/10 blur-[100px]" />
        </div>
        <div className="container mx-auto relative z-10">
          <AnimatedSection className="max-w-3xl">
            <Badge variant="brand" className="mb-4">Services</Badge>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.05] mb-6">
              End-to-End Engineering
              <br />
              <span className="gradient-text">For Every Stage</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {"Whether you're building an MVP, scaling an existing product, or adding AI capabilities — I bring deep technical expertise and product thinking to every engagement."}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="space-y-8">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon] || Lightbulb;
              return (
                <AnimatedSection key={service.id} delay={i * 0.05} id={service.id}>
                  <div className="group relative rounded-2xl border border-border bg-card p-8 hover:border-brand-500/40 transition-all duration-300">
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-brand-500/5 via-transparent to-transparent" />

                    <div className="relative grid lg:grid-cols-[280px_1fr] gap-8">
                      {/* Left: Identity */}
                      <div>
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-brand-500/30 bg-brand-500/10 text-brand-500">
                          <Icon className="h-6 w-6" />
                        </div>
                        <h2 className="text-2xl font-bold text-foreground mb-3">
                          {service.title}
                        </h2>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                          {service.longDescription}
                        </p>
                        <Button asChild variant="gradient" size="sm">
                          <Link href="/contact">Get Started</Link>
                        </Button>
                      </div>

                      {/* Right: Details */}
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                            Deliverables
                          </h3>
                          <ul className="space-y-2">
                            {service.deliverables.map((d) => (
                              <li key={d} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="h-4 w-4 text-brand-500 shrink-0 mt-0.5" />
                                {d}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <div className="mb-4">
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                              Ideal For
                            </h3>
                            <ul className="space-y-2">
                              {service.idealFor.map((item) => (
                                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <ArrowRight className="h-3.5 w-3.5 text-brand-500 shrink-0 mt-0.5" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                              Technologies
                            </h3>
                            <TechStack technologies={service.technologies} limit={8} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
