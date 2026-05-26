"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  Layers,
  Paintbrush,
  Code2,
  TestTube,
  Rocket,
  TrendingUp,
} from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const stepIcons = [Search, Layers, Paintbrush, Code2, TestTube, Rocket, TrendingUp];
const stepNumbers = ["01", "02", "03", "04", "05", "06", "07"];

export function ProcessSection() {
  const { t } = useLanguage();
  const steps = t.process.steps;

  return (
    <section className="py-24">
      <div className="container mx-auto">
        <SectionHeader
          eyebrow={t.process.eyebrow}
          title={t.process.title}
          titleHighlight={t.process.titleHighlight}
          description={t.process.description}
        />

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="space-y-8">
            {steps.map((step, i) => {
              const Icon = stepIcons[i];
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={stepNumbers[i]}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.08,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Step dot */}
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-brand-500/30 bg-background md:absolute md:left-1/2 md:-translate-x-1/2 shadow-glow-sm">
                    <Icon className="h-5 w-5 text-brand-500" />
                  </div>

                  {/* Content */}
                  <div
                    className={`flex-1 md:w-[calc(50%-3rem)] ${
                      isEven ? "md:pr-16" : "md:pl-16 md:ml-auto"
                    }`}
                  >
                    <div className="group rounded-2xl border border-border bg-card p-6 hover:border-brand-500/40 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-mono text-brand-500 font-semibold">
                          {stepNumbers[i]}
                        </span>
                        <span className="text-xs text-muted-foreground border border-border rounded-full px-2.5 py-0.5">
                          {step.duration}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {step.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {step.deliverables.map((d) => (
                          <span
                            key={d}
                            className="inline-flex items-center text-xs text-muted-foreground gap-1.5"
                          >
                            <span className="h-1 w-1 rounded-full bg-brand-500" />
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
