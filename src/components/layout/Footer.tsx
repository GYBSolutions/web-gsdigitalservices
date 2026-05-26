import React from "react";
import Link from "next/link";
import { Github, Linkedin, Twitter, Zap } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  Services: [
    { label: "Mobile Development", href: "/services#mobile-app-development" },
    { label: "AI Integration", href: "/services#ai-integrations" },
    { label: "Product Architecture", href: "/services#product-architecture" },
    { label: "MVP Development", href: "/services#mvp-development" },
  ],
  Work: [
    { label: "Case Studies", href: "/case-studies" },
    { label: "Projects", href: "/case-studies" },
    { label: "Blog", href: "/blog" },
    { label: "Insights", href: "/blog" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Book a Call", href: "/contact" },
  ],
};

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-foreground">
                Seijas<span className="text-brand-500">.</span>dev
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[240px]">
              Senior software engineer specializing in iOS architecture, AI integrations, and scalable product development.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-brand-500/50 hover:bg-brand-500/10 transition-colors"
                >
                  <social.icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
                {category}
              </p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Seijas Digital Services. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/admin/login"
              className="text-xs text-muted-foreground/30 hover:text-muted-foreground transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
