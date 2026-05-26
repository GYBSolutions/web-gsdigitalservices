import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code2, Cpu, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GradientText } from "@/components/shared/GradientText";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/shared/AnimatedSection";
import { TechStack } from "@/components/shared/TechBadge";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "About",
  description:
    "10+ years building iOS apps, scalable systems, and AI-powered products. Learn about Yen Seijas — senior software engineer and product architect.",
};

const timeline = [
  {
    year: "2013–2016",
    title: "iOS Developer",
    company: "Mobile Agency",
    description: "Shipped my first production iOS apps. Learned UIKit, Auto Layout, Core Data, and what it means to write maintainable code in a team.",
  },
  {
    year: "2016–2019",
    title: "Senior iOS Engineer",
    company: "FinTech Startup",
    description: "Led mobile development for a payments app used by 200K+ users. First real lessons in architecture at scale — where MVVM becomes necessary, not optional.",
  },
  {
    year: "2019–2021",
    title: "Lead Mobile Engineer",
    company: "Health Tech Company",
    description: "Built the mobile platform from the ground up, including HealthKit integrations, Apple Watch apps, and on-device ML models. Led a team of 6 engineers.",
  },
  {
    year: "2021–2022",
    title: "Staff Engineer",
    company: "Series B Startup",
    description: "Expanded into full-stack: Node.js backends, system design, technical interviews, architecture reviews. Shipped iOS + backend features end-to-end.",
  },
  {
    year: "2022–Present",
    title: "Independent Consultant",
    company: "Seijas Digital Services",
    description: "Building products directly with founders and startups. From 0→1 iOS apps to AI-powered platforms. The combination of product ownership and technical depth is what makes this work exceptional.",
  },
];

const values = [
  {
    icon: Code2,
    title: "Code is a product decision",
    description: "Every architectural choice is also a product decision. Clean, maintainable code is how products stay fast and teams stay productive.",
  },
  {
    icon: Users,
    title: "User outcomes over technical elegance",
    description: "Beautiful architecture that ships late or builds the wrong thing is worthless. I optimize for user and business outcomes first.",
  },
  {
    icon: Cpu,
    title: "Performance is non-negotiable",
    description: "Slow software is bad software. Performance optimization isn't a final step — it's a mindset applied throughout development.",
  },
  {
    icon: Zap,
    title: "Ship fast, improve with data",
    description: "The best products are built iteratively, with real users providing real signal. I favor getting something valuable in users' hands quickly.",
  },
];

const techByCategory = {
  "iOS / Mobile": ["Swift", "SwiftUI", "UIKit", "Core Data", "Core ML", "HealthKit", "WatchKit", "XCTest"],
  "Frontend / Web": ["React", "Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
  "Backend / APIs": ["Node.js", "Go", "FastAPI", "GraphQL", "REST", "gRPC", "PostgreSQL", "Redis"],
  "AI / ML": ["OpenAI", "Anthropic", "LangChain", "Core ML", "Create ML", "Pinecone", "RAG"],
  "Cloud / DevOps": ["AWS", "GCP", "Vercel", "Docker", "Kubernetes", "Supabase", "Firebase"],
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden hero-grid">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-20 right-0 h-[600px] w-[600px] rounded-full bg-brand-600/12 blur-[120px]" />
          <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-indigo-600/10 blur-[100px]" />
        </div>
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-[1fr_400px] gap-16 items-start">
            <AnimatedSection>
              <Badge variant="brand" className="mb-4">About</Badge>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.05] mb-6">
                Building Software
                <br />
                <GradientText>That Actually Works</GradientText>
              </h1>
              <div className="prose prose-sm text-muted-foreground space-y-4 max-w-xl">
                <p className="text-lg leading-relaxed">
                  {"I'm Yen Seijas — a senior software engineer with 10+ years building products people use every day. I started in iOS and never stopped learning: backend systems, AI pipelines, product strategy."}
                </p>
                <p className="leading-relaxed">
                  {"What defines my work isn't the tech stack — it's the mindset. I think like a product owner and execute like a senior engineer. That combination is rare, and it's what allows me to build products that solve real problems, not just technically impressive demos."}
                </p>
                <p className="leading-relaxed">
                  {"Today I work directly with founders and technical teams as an independent consultant. I take on a small number of clients per year to ensure the work is exceptional every time."}
                </p>
              </div>
              <div className="flex flex-wrap gap-3 mt-8">
                <Button asChild variant="gradient" size="lg">
                  <Link href="/contact">
                    Work With Me
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/case-studies">View My Work</Link>
                </Button>
              </div>
            </AnimatedSection>

            {/* Portrait card */}
            <AnimatedSection delay={0.2} direction="left">
              <div className="relative rounded-3xl border border-brand-500/20 bg-gradient-to-br from-brand-500/10 via-indigo-500/5 to-transparent p-8 text-center">
                <div className="h-32 w-32 rounded-full bg-gradient-to-br from-brand-500/30 to-indigo-500/30 border-2 border-brand-500/30 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-brand-400">YS</span>
                </div>
                <h2 className="text-xl font-bold text-foreground mb-1">Yen Seijas</h2>
                <p className="text-sm text-muted-foreground mb-4">Senior Software Engineer</p>

                <div className="grid grid-cols-2 gap-3 mt-6">
                  {[
                    { label: "Years exp.", value: "10+" },
                    { label: "Apps shipped", value: "50+" },
                    { label: "Industries", value: "5" },
                    { label: "Uptime avg.", value: "99.9%" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl border border-border/50 bg-muted/30 p-3">
                      <div className="text-xl font-bold text-foreground">{s.value}</div>
                      <div className="text-xs text-muted-foreground">{s.label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available for new projects
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 border-y border-border">
        <div className="container mx-auto">
          <AnimatedSection className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">How I Approach Work</h2>
            <p className="text-muted-foreground max-w-xl">The principles that guide every decision, from architecture to client communication.</p>
          </AnimatedSection>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <StaggerItem key={value.title}>
                  <div className="h-full rounded-2xl border border-border bg-card p-6 hover:border-brand-500/40 transition-colors">
                    <Icon className="h-8 w-8 text-brand-500 mb-4" />
                    <h3 className="text-base font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Career Timeline */}
      <section className="py-20">
        <div className="container mx-auto">
          <AnimatedSection className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Career Timeline</h2>
            <p className="text-muted-foreground">From my first iOS app to building AI-powered platforms for startups.</p>
          </AnimatedSection>

          <div className="space-y-0 relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border ml-5" />
            {timeline.map((item, i) => (
              <AnimatedSection key={item.year} delay={i * 0.1}>
                <div className="relative flex gap-6 pb-10">
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-brand-500/40 bg-background text-brand-500">
                    <div className="h-2 w-2 rounded-full bg-brand-500" />
                  </div>
                  <div className="pt-1.5">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-brand-500">{item.year}</span>
                      <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                      <span className="text-xs text-muted-foreground">— {item.company}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">{item.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto">
          <AnimatedSection className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Technical Stack</h2>
            <p className="text-muted-foreground">{"Deep expertise across mobile, web, and AI. I choose the right tool for the job, not the one I'm most comfortable with."}</p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(techByCategory).map(([category, techs], i) => (
              <AnimatedSection key={category} delay={i * 0.08}>
                <div className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-3">{category}</h3>
                  <TechStack technologies={techs} />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
