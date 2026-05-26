import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { GradientText } from "@/components/shared/GradientText";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { ContactForm, ContactSidebar } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Yen Seijas. Book a free consultation, send a message, or schedule a call to discuss your iOS app, AI integration, or product architecture needs.",
};

export default function ContactPage() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden hero-grid">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/3 h-[500px] w-[500px] rounded-full bg-brand-600/15 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-indigo-600/10 blur-[100px]" />
      </div>

      <div className="container mx-auto relative z-10">
        <AnimatedSection className="text-center mb-16 max-w-3xl mx-auto">
          <Badge variant="brand" className="mb-4">Contact</Badge>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.05] mb-6">
            Let&apos;s Build
            <br />
            <GradientText>Something Great</GradientText>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {"Tell me about your project and I'll get back to you within 24 hours with honest feedback and a clear path forward."}
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-[1fr_380px] gap-10 max-w-5xl mx-auto">
          <AnimatedSection>
            <ContactForm />
          </AnimatedSection>
          <ContactSidebar />
        </div>
      </div>
    </section>
  );
}
