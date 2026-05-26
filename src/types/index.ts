export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  tags: string[];
  technologies: string[];
  deliverables: string[];
  idealFor: string[];
  process: string[];
  featured: boolean;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  tags: string[];
  stack: string[];
  metrics: Metric[];
  challenges: string[];
  solutions: string[];
  architecture: string;
  featured: boolean;
  year: number;
  status: "live" | "case-study" | "archived";
  imageUrl?: string;
  accentColor: string;
  mockupType: "ios" | "web" | "dashboard";
  es?: {
    title: string;
    description: string;
    longDescription: string;
  };
}

export interface Metric {
  label: string;
  value: string;
  improvement?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatarUrl?: string;
  projectType: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
  category: string;
  featured: boolean;
  coverImageUrl?: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  duration: string;
  role: string;
  summary: string;
  problem: string;
  solution: string;
  architecture: string;
  stack: string[];
  challenges: Challenge[];
  results: Metric[];
  process: ProcessStep[];
  featured: boolean;
  year: number;
  imageUrl?: string;
  accentColor: string;
}

export interface Challenge {
  title: string;
  description: string;
  resolution: string;
}

export interface ProcessStep {
  phase: string;
  title: string;
  description: string;
  duration: string;
  deliverables: string[];
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface TechStack {
  name: string;
  category: "mobile" | "backend" | "frontend" | "ai" | "devops" | "design";
  proficiency: "expert" | "advanced" | "proficient";
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  serviceType: string;
  budget: string;
  timeline: string;
  message: string;
}
