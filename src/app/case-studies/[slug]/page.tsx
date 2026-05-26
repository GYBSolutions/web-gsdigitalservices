import type { Metadata } from "next";
import { getCaseStudyBySlug, caseStudies } from "@/lib/data/case-studies";
import { getProjectBySlug, projects } from "@/lib/data/projects";
import { CaseStudyDetail } from "@/components/case-studies/CaseStudyDetail";
import { ProjectDetail } from "@/components/case-studies/ProjectDetail";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const csslugs = caseStudies.map((cs) => ({ slug: cs.slug }));
  const projSlugs = projects.map((p) => ({ slug: p.slug }));
  return [...csslugs, ...projSlugs];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug) || getProjectBySlug(slug);
  if (!cs) return { title: "Not Found" };
  return {
    title: cs.title,
    description: "summary" in cs ? cs.summary : cs.description,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  const project = getProjectBySlug(slug);

  if (caseStudy) return <CaseStudyDetail caseStudy={caseStudy} />;
  if (project) return <ProjectDetail project={project} />;
  notFound();
}
