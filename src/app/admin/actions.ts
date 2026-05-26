"use server";

import { createServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { HeroSettings } from "@/lib/content";

// ── Hero ──────────────────────────────────────────────────────────────────────

export async function saveHeroAction(data: HeroSettings) {
  const db = createServerClient();
  if (!db) return { error: "Supabase not configured" };

  const { error } = await db
    .from("site_settings")
    .upsert({ key: "hero", value: data, updated_at: new Date().toISOString() });

  if (error) return { error: error.message };
  revalidatePath("/");
  return { success: true };
}

// ── Projects ──────────────────────────────────────────────────────────────────

export async function saveProjectAction(formData: FormData) {
  const db = createServerClient();
  if (!db) return { error: "Supabase not configured" };

  const id = (formData.get("id") as string) || crypto.randomUUID().slice(0, 8);
  const slug =
    (formData.get("slug") as string) ||
    (formData.get("title") as string)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const parseLines = (val: string | null) =>
    (val ?? "")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

  const parseMetrics = (val: string | null) =>
    (val ?? "")
      .split("\n")
      .map((line) => {
        const [value, label, improvement] = line.split("|").map((s) => s.trim());
        return { value: value ?? "", label: label ?? "", improvement };
      })
      .filter((m) => m.value && m.label);

  const data = {
    id,
    slug,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    longDescription: formData.get("longDescription") as string,
    category: formData.get("category") as string,
    tags: parseLines(formData.get("tags") as string),
    stack: parseLines(formData.get("stack") as string),
    metrics: parseMetrics(formData.get("metrics") as string),
    challenges: parseLines(formData.get("challenges") as string),
    solutions: parseLines(formData.get("solutions") as string),
    architecture: formData.get("architecture") as string,
    featured: formData.get("featured") === "on",
    year: parseInt(formData.get("year") as string) || new Date().getFullYear(),
    status: formData.get("status") as string,
    accentColor: (formData.get("accentColor") as string) || "#7C3AED",
    mockupType: (formData.get("mockupType") as string) || "web",
  };

  const { error } = await db.from("projects").upsert({
    id,
    slug,
    data,
    featured: data.featured,
    sort_order: parseInt((formData.get("sort_order") as string) ?? "0") || 0,
    updated_at: new Date().toISOString(),
  });

  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/case-studies");
  revalidatePath(`/case-studies/${slug}`);
  redirect("/admin/projects");
}

export async function deleteProjectAction(id: string) {
  const db = createServerClient();
  if (!db) return { error: "Supabase not configured" };
  const { error } = await db.from("projects").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/case-studies");
  return { success: true };
}

// ── Services ──────────────────────────────────────────────────────────────────

export async function saveServiceAction(formData: FormData) {
  const db = createServerClient();
  if (!db) return { error: "Supabase not configured" };

  const id = formData.get("id") as string;
  const parseLines = (val: string | null) =>
    (val ?? "")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

  const data = {
    id,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    longDescription: formData.get("longDescription") as string,
    icon: (formData.get("icon") as string) || "Lightbulb",
    tags: parseLines(formData.get("tags") as string),
    technologies: parseLines(formData.get("technologies") as string),
    deliverables: parseLines(formData.get("deliverables") as string),
    idealFor: parseLines(formData.get("idealFor") as string),
    process: parseLines(formData.get("process") as string),
    featured: formData.get("featured") === "on",
  };

  const { error } = await db.from("services").upsert({
    id,
    data,
    featured: data.featured,
    sort_order: parseInt((formData.get("sort_order") as string) ?? "0") || 0,
    updated_at: new Date().toISOString(),
  });

  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/services");
  redirect("/admin/services");
}

// ── Testimonials ──────────────────────────────────────────────────────────────

export async function saveTestimonialAction(formData: FormData) {
  const db = createServerClient();
  if (!db) return { error: "Supabase not configured" };

  const id = (formData.get("id") as string) || crypto.randomUUID().slice(0, 8);

  const data = {
    id,
    name: formData.get("name") as string,
    role: formData.get("role") as string,
    company: formData.get("company") as string,
    content: formData.get("content") as string,
    rating: parseInt(formData.get("rating") as string) || 5,
    projectType: formData.get("projectType") as string,
  };

  const { error } = await db.from("testimonials").upsert({
    id,
    data,
    sort_order: parseInt((formData.get("sort_order") as string) ?? "0") || 0,
    updated_at: new Date().toISOString(),
  });

  if (error) return { error: error.message };
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function deleteTestimonialAction(id: string) {
  const db = createServerClient();
  if (!db) return { error: "Supabase not configured" };
  const { error } = await db.from("testimonials").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  return { success: true };
}
