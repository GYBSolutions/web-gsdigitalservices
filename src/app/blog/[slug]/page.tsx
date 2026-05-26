import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { getPostBySlug, blogPosts } from "@/lib/data/blog-posts";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { formatDate } from "@/lib/utils";
import { CTASection } from "@/components/home/CTASection";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <article className="pt-32 pb-20">
        <div className="container mx-auto max-w-3xl">
          <AnimatedSection>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            <Badge variant="brand" className="mb-4">{post.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight mb-4">
              {post.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">{post.excerpt}</p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pb-8 mb-8 border-b border-border">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-brand-500" />
                {formatDate(post.publishedAt)}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-brand-500" />
                {post.readTime} min read
              </div>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="inline-flex items-center rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-p:text-muted-foreground prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-ul:text-muted-foreground prose-li:leading-relaxed prose-strong:text-foreground prose-a:text-brand-400 hover:prose-a:text-brand-300">
              {post.content.split("\n\n").map((paragraph, i) => {
                if (paragraph.startsWith("## ")) {
                  return <h2 key={i} className="text-2xl font-bold text-foreground mt-10 mb-4">{paragraph.replace("## ", "")}</h2>;
                }
                if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                  return <p key={i} className="font-semibold text-foreground">{paragraph.replace(/\*\*/g, "")}</p>;
                }
                if (paragraph.startsWith("- ") || paragraph.startsWith("1. ")) {
                  const items = paragraph.split("\n").filter(Boolean);
                  return (
                    <ul key={i} className="space-y-2 my-4">
                      {items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-muted-foreground">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-500 mt-2 shrink-0" />
                          {item.replace(/^[-\d.]+\s/, "")}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return <p key={i} className="text-muted-foreground leading-relaxed mb-4">{paragraph}</p>;
              })}
            </div>
          </AnimatedSection>
        </div>
      </article>
      <CTASection />
    </>
  );
}
