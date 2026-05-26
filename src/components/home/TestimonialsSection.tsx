"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { StaggerContainer, StaggerItem } from "@/components/shared/AnimatedSection";
import { testimonials as staticTestimonials } from "@/lib/data/testimonials";
import type { Testimonial } from "@/types";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { AdminEditButton } from "@/components/admin/AdminEditButton";

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="group relative flex flex-col h-full rounded-2xl border border-border bg-card p-6 hover:border-brand-500/30 transition-colors">
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-brand-500/5 via-transparent to-transparent" />

      <div className="relative flex-1 flex flex-col">
        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-brand-400 text-brand-400" />
          ))}
        </div>

        {/* Quote */}
        <Quote className="h-6 w-6 text-brand-500/30 mb-3" />
        <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6 italic">
          &ldquo;{testimonial.content}&rdquo;
        </p>

        {/* Author */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-500/20 to-indigo-500/20 border border-brand-500/20 flex items-center justify-center text-sm font-semibold text-brand-400 shrink-0">
            {testimonial.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">{testimonial.name}</div>
            <div className="text-xs text-muted-foreground">
              {testimonial.role}, {testimonial.company}
            </div>
          </div>
          <div className="ml-auto">
            <span className="inline-flex rounded-full border border-border px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
              {testimonial.projectType}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection({ testimonials: testimonialsProp }: { testimonials?: Testimonial[] }) {
  const { t } = useLanguage();
  const testimonials = testimonialsProp ?? staticTestimonials;

  return (
    <section className="relative py-24 bg-muted/20">
      <AdminEditButton href="/admin/testimonials" label="Editar Testimonios" />
      <div className="container mx-auto">
        <SectionHeader
          eyebrow={t.testimonials.eyebrow}
          title={t.testimonials.title}
          titleHighlight={t.testimonials.titleHighlight}
          description={t.testimonials.description}
        />

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8"
        >
          {t.testimonials.stats.map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-3xl font-bold text-foreground mb-1">{item.value}</div>
              <div className="text-sm text-muted-foreground">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
