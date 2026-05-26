import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/data/blog-posts";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/shared/AnimatedSection";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical insights on iOS architecture, AI-powered development, product engineering, and startup technology from a senior software engineer.",
};

export default function BlogPage() {
  const featured = blogPosts.filter((p) => p.featured);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden hero-grid">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 right-1/4 h-[400px] w-[400px] rounded-full bg-brand-600/12 blur-[100px]" />
        </div>
        <div className="container mx-auto relative z-10">
          <AnimatedSection className="max-w-3xl">
            <Badge variant="brand" className="mb-4">Insights</Badge>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.05] mb-6">
              Technical Writing
              <br />
              <span className="gradient-text">From the Field</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Practical insights on iOS architecture, AI development, and building products that scale — written from experience shipping production software, not from tutorials.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20">
        <div className="container mx-auto">
          <AnimatedSection className="mb-10">
            <h2 className="text-2xl font-bold text-foreground">Featured Articles</h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-3 gap-6 mb-20">
            {featured.map((post) => (
              <StaggerItem key={post.id}>
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <article className="h-full flex flex-col rounded-2xl border border-border bg-card p-6 hover:border-brand-500/40 transition-all duration-300 hover:-translate-y-1">
                    <Badge variant="brand" className="mb-3 self-start text-[10px]">
                      {post.category}
                    </Badge>
                    <h2 className="text-lg font-semibold text-foreground mb-2 leading-snug group-hover:text-brand-400 transition-colors flex-1">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3 w-3" />
                        {post.readTime} min read
                      </div>
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                  </article>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* All articles */}
          <AnimatedSection className="mb-8">
            <h2 className="text-2xl font-bold text-foreground">All Articles</h2>
          </AnimatedSection>

          <div className="space-y-4">
            {blogPosts.map((post, i) => (
              <AnimatedSection key={post.id} delay={i * 0.05}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <article className="flex items-start gap-6 rounded-xl border border-border bg-card p-5 hover:border-brand-500/40 transition-all duration-300">
                    <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-500 text-xs font-semibold font-mono">
                      {post.readTime}m
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <Badge variant="brand" className="text-[10px]">{post.category}</Badge>
                        <span className="text-xs text-muted-foreground">{formatDate(post.publishedAt)}</span>
                      </div>
                      <h3 className="text-base font-semibold text-foreground mb-1 group-hover:text-brand-400 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-brand-400 transition-colors shrink-0 mt-1" />
                  </article>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
