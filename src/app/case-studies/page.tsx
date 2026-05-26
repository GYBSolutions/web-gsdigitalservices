import type { Metadata } from "next";
import type { CSSProperties as ReactCSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, Building2, Briefcase } from "lucide-react";
import { caseStudies } from "@/lib/data/case-studies";
import { projects } from "@/lib/data/projects";
import { Badge } from "@/components/ui/badge";
import { TechStack } from "@/components/shared/TechBadge";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/shared/AnimatedSection";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Deep-dive technical case studies: architecture decisions, challenges overcome, and measurable outcomes delivered across iOS, SaaS, and AI projects.",
};

export default function CaseStudiesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden hero-grid">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/3 h-[500px] w-[500px] rounded-full bg-brand-600/15 blur-[120px]" />
        </div>
        <div className="container mx-auto relative z-10">
          <AnimatedSection className="max-w-3xl">
            <Badge variant="brand" className="mb-4">Work</Badge>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.05] mb-6">
              Real Products,
              <br />
              <span className="gradient-text">Measurable Results</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {"Every project tells a technical story. Here's how I approached architecture, solved hard problems, and delivered software that scaled."}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-20">
        <div className="container mx-auto">
          <SectionHeader
            eyebrow="Deep Dives"
            title="Featured Case Studies"
            align="left"
          />

          <div className="space-y-6">
            {caseStudies.map((cs, i) => (
              <AnimatedSection key={cs.id} delay={i * 0.1}>
                <Link href={`/case-studies/${cs.slug}`} className="group block">
                  <div
                    className="relative rounded-2xl border border-border bg-card p-8 hover:border-brand-500/40 hover:shadow-glow-sm transition-all duration-300"
                    style={{ "--accent": cs.accentColor } as ReactCSSProperties}
                  >
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `radial-gradient(800px at 0% 0%, ${cs.accentColor}10, transparent 60%)` }}
                    />
                    <div className="relative grid md:grid-cols-[1fr_300px] gap-8">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          <span className="text-xs font-mono text-brand-500">{cs.year}</span>
                          <Badge variant="brand">{cs.industry}</Badge>
                        </div>
                        <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-brand-400 transition-colors">
                          {cs.title}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-4 max-w-xl">
                          {cs.summary}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Building2 className="h-3.5 w-3.5" />
                            {cs.client}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" />
                            {cs.duration}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Briefcase className="h-3.5 w-3.5" />
                            {cs.role}
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          {cs.results.slice(0, 4).map((metric) => (
                            <div key={metric.label} className="rounded-xl border border-border/50 bg-muted/30 p-3">
                              <div className="text-lg font-bold text-foreground">{metric.value}</div>
                              <div className="text-xs text-muted-foreground">{metric.label}</div>
                            </div>
                          ))}
                        </div>
                        <TechStack technologies={cs.stack} limit={6} />
                      </div>
                    </div>

                    <div className="absolute top-6 right-6 h-8 w-8 flex items-center justify-center rounded-full border border-border text-muted-foreground group-hover:border-brand-500/50 group-hover:text-brand-400 group-hover:bg-brand-500/10 transition-all">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects Grid */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto">
          <SectionHeader
            eyebrow="All Projects"
            title="More Work"
            align="left"
          />

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.slice(0, 6).map((project) => (
              <StaggerItem key={project.id}>
                <Link href={`/case-studies/${project.slug}`} className="group block h-full">
                  <div className="h-full rounded-2xl border border-border bg-card p-6 hover:border-brand-500/40 transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="brand" className="text-[10px]">{project.category}</Badge>
                      <span className="text-xs text-muted-foreground font-mono">{project.year}</span>
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-brand-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <TechStack technologies={project.stack} limit={4} />
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CTASection />
    </>
  );
}
