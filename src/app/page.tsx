import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustSection } from "@/components/home/TrustSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";
import { getProjects, getServices, getTestimonials } from "@/lib/content";

export const metadata: Metadata = {
  title: "Seijas Digital Services — Senior Software Engineer & Product Architect",
  description:
    "Senior software engineer with 10+ years specializing in iOS architecture, AI-powered development, and scalable product systems. Building intelligent digital products for startups and modern businesses.",
};

export default async function HomePage() {
  const [projects, services, testimonials] = await Promise.all([
    getProjects(),
    getServices(),
    getTestimonials(),
  ]);

  return (
    <>
      <HeroSection />
      <TrustSection />
      <ServicesSection services={services} />
      <ProjectsSection projects={projects.filter((p) => p.featured)} />
      <ProcessSection />
      <TestimonialsSection testimonials={testimonials} />
      <CTASection />
    </>
  );
}
