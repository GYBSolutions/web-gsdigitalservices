import { notFound } from "next/navigation";
import { getProjects } from "@/lib/content";
import { ProjectForm } from "../../_components/ProjectForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();
  return <ProjectForm project={project} />;
}
