import { createServerClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { projects as staticProjects } from "@/lib/data/projects";
import { services as staticServices } from "@/lib/data/services";
import { testimonials as staticTestimonials } from "@/lib/data/testimonials";
import type { Project, Service, Testimonial } from "@/types";

export interface HeroSettings {
  badge: string;
  heading: string;
  headingHighlight: string;
  headingEnd: string;
  subtitle: string;
  openBadge: string;
  stats: { years: string; apps: string; users: string; uptime: string };
  statsValues: { years: string; apps: string; users: string; uptime: string };
  available: boolean;
}

const defaultHero: HeroSettings = {
  badge: "Available for new projects",
  heading: "Engineering",
  headingHighlight: "Digital Products",
  headingEnd: "That Scale",
  subtitle:
    "Senior software engineer with 10+ years building iOS apps, scalable backends, and AI-powered systems for startups and enterprises. I turn complex ideas into products people use daily.",
  openBadge: "Open to new projects",
  available: true,
  stats: {
    years: "Years engineering",
    apps: "Apps shipped",
    users: "Users served",
    uptime: "Uptime delivered",
  },
  statsValues: {
    years: "10+",
    apps: "50+",
    users: "80K+",
    uptime: "99.97%",
  },
};

export async function getHeroSettings(): Promise<HeroSettings> {
  if (!isSupabaseConfigured()) return defaultHero;
  const db = createServerClient();
  if (!db) return defaultHero;
  const { data } = await db.from("site_settings").select("value").eq("key", "hero").single();
  return (data?.value as HeroSettings) ?? defaultHero;
}

export async function getProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured()) return staticProjects;
  const db = createServerClient();
  if (!db) return staticProjects;
  const { data, error } = await db
    .from("projects")
    .select("data, featured, sort_order")
    .order("sort_order");
  if (error || !data?.length) return staticProjects;
  return data.map((r) => ({ ...(r.data as Project), featured: r.featured }));
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  if (!isSupabaseConfigured()) return staticProjects.find((p) => p.slug === slug);
  const db = createServerClient();
  if (!db) return staticProjects.find((p) => p.slug === slug);
  const { data } = await db.from("projects").select("data").eq("slug", slug).single();
  return (data?.data as Project) ?? staticProjects.find((p) => p.slug === slug);
}

export async function getServices(): Promise<Service[]> {
  if (!isSupabaseConfigured()) return staticServices;
  const db = createServerClient();
  if (!db) return staticServices;
  const { data, error } = await db
    .from("services")
    .select("data, sort_order")
    .order("sort_order");
  if (error || !data?.length) return staticServices;
  return data.map((r) => r.data as Service);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured()) return staticTestimonials;
  const db = createServerClient();
  if (!db) return staticTestimonials;
  const { data, error } = await db
    .from("testimonials")
    .select("data, sort_order")
    .order("sort_order");
  if (error || !data?.length) return staticTestimonials;
  return data.map((r) => r.data as Testimonial);
}
