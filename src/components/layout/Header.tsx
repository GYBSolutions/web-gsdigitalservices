"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X, Zap } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useAdminMode } from "@/lib/admin/AdminModeContext";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9 opacity-0">
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9 text-muted-foreground hover:text-foreground"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {theme === "dark" ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </motion.div>
    </Button>
  );
}

function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setLang(lang === "en" ? "es" : "en")}
      className="flex items-center gap-0.5 rounded-md border border-border px-2 py-1 text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-brand-500/40 transition-all"
      aria-label="Toggle language"
    >
      <span className={cn("transition-colors", lang === "en" ? "text-foreground" : "text-muted-foreground/50")}>
        EN
      </span>
      <span className="text-muted-foreground/30 mx-0.5">|</span>
      <span className={cn("transition-colors", lang === "es" ? "text-foreground" : "text-muted-foreground/50")}>
        ES
      </span>
    </button>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();
  const isAdmin = useAdminMode();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navItems = [
    { label: t.nav.services, href: "/services" },
    { label: t.nav.caseStudies, href: "/case-studies" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.blog, href: "/blog" },
  ];

  if (!mounted) {
    return (
      <header className="fixed top-0 z-50 w-full transition-all duration-300 bg-transparent">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-foreground tracking-tight">
              Seijas<span className="text-brand-500">.</span>dev
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: "Services", href: "/services" },
              { label: "Case Studies", href: "/case-studies" },
              { label: "About", href: "/about" },
              { label: "Blog", href: "/blog" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium rounded-lg text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="gradient" size="sm" className="hidden md:inline-flex h-9">
              <Link href="/contact">Book Consultation</Link>
            </Button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed z-50 w-full transition-all duration-300",
          isAdmin ? "top-10" : "top-0",
          scrolled
            ? "border-b border-border/50 bg-background/80 backdrop-blur-xl shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient shadow-glow-sm group-hover:shadow-glow-md transition-shadow">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-foreground tracking-tight">
              Seijas<span className="text-brand-500">.</span>dev
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute inset-0 rounded-lg bg-accent"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <Button
              asChild
              variant="gradient"
              size="sm"
              className="hidden md:inline-flex h-9"
            >
              <Link href="/contact">{t.nav.bookConsultation}</Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={cn("fixed inset-x-0 z-40 border-b border-border bg-background/95 backdrop-blur-xl shadow-lg md:hidden", isAdmin ? "top-[6.5rem]" : "top-16")}
          >
            <nav className="container mx-auto py-4 flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                      pathname === item.href
                        ? "text-foreground bg-accent"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-2 px-4">
                <Button asChild variant="gradient" className="w-full">
                  <Link href="/contact">{t.nav.bookConsultation}</Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
