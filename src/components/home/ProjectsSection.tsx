"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { Button } from "@/components/ui/button";
import { getFeaturedProjects } from "@/lib/data/projects";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Project } from "@/types";
import { AdminEditButton } from "@/components/admin/AdminEditButton";

const categoryKeys = ["All", "iOS Application", "iOS + Backend", "SaaS Platform", "Full-Stack Platform"];

export function ProjectsSection({ projects: projectsProp }: { projects?: Project[] }) {
  const allProjects = projectsProp ?? getFeaturedProjects();
  const [activeCategory, setActiveCategory] = useState("All");
  const { t } = useLanguage();

  const getCategoryLabel = (key: string) =>
    key === "All" ? t.projects.filterAll : key;

  const filtered =
    activeCategory === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === activeCategory);

  return (
    <section className="relative py-24 bg-muted/20">
      <AdminEditButton href="/admin/projects" label="Editar Proyectos" />
      <div className="container mx-auto">
        <SectionHeader
          eyebrow={t.projects.eyebrow}
          title={t.projects.title}
          titleHighlight={t.projects.titleHighlight}
          description={t.projects.description}
        />

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-2 justify-center mb-12"
        >
          {categoryKeys.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-brand-600 text-white shadow-glow-sm"
                  : "border border-border text-muted-foreground hover:text-foreground hover:border-brand-500/40 bg-card"
              }`}
            >
              {getCategoryLabel(cat)}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/case-studies">
              {t.projects.viewAll}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
