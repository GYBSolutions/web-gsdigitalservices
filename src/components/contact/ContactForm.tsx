"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Calendar,
  MessageSquare,
  Clock,
  CheckCircle2,
  ArrowRight,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

const serviceOptions = [
  "Mobile App Development (iOS)",
  "AI Integration & Automation",
  "Product Architecture",
  "MVP Development",
  "UI/UX Engineering",
  "Backend & APIs",
  "Technical Consulting",
  "Other",
];

const budgetOptions = [
  "< $10K (Scoping call)",
  "$10K – $25K (Small project)",
  "$25K – $75K (Medium project)",
  "$75K – $150K (Large project)",
  "$150K+ (Enterprise / retainer)",
  "Not sure yet",
];

const timelineOptions = [
  "ASAP (< 1 month)",
  "1–3 months",
  "3–6 months",
  "6+ months",
  "Flexible",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-12 text-center"
      >
        <CheckCircle2 className="h-14 w-14 text-emerald-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">Message Received</h2>
        <p className="text-muted-foreground mb-6">
          {"Thank you for reaching out. I'll review your project details and respond within 24 hours with honest feedback and next steps."}
        </p>
        <Button asChild variant="outline">
          <Link href="/case-studies">Explore Case Studies While You Wait</Link>
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-card p-8 space-y-6"
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input id="name" placeholder="Alex Johnson" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input id="email" type="email" placeholder="alex@company.com" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company / Project Name</Label>
        <Input id="company" placeholder="Acme Inc. or My Startup" />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label>Service Needed *</Label>
          <Select required>
            <SelectTrigger>
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {serviceOptions.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Project Timeline</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="When do you need this?" />
            </SelectTrigger>
            <SelectContent>
              {timelineOptions.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Estimated Budget</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a budget range" />
          </SelectTrigger>
          <SelectContent>
            {budgetOptions.map((b) => (
              <SelectItem key={b} value={b}>{b}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Tell Me About Your Project *</Label>
        <Textarea
          id="message"
          placeholder="What are you building? What's the core challenge? What does success look like? The more detail, the better the response."
          rows={5}
          required
          className="resize-none"
        />
      </div>

      <Button
        type="submit"
        variant="gradient"
        size="lg"
        className="w-full gap-2"
        disabled={loading}
      >
        {loading ? (
          <>
            <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send Message
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        No spam. Your information is kept private and never shared.
      </p>
    </form>
  );
}

export function ContactSidebar() {
  return (
    <AnimatedSection delay={0.15} direction="left" className="space-y-5">
      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">Prefer Direct Contact?</h3>
        <div className="space-y-3">
          <a
            href="mailto:hello@seijas.dev"
            className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-muted/50 text-brand-500">
              <Mail className="h-4 w-4" />
            </div>
            hello@seijas.dev
          </a>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-muted/50 text-brand-500">
              <Clock className="h-4 w-4" />
            </div>
            Response within 24 hours
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-brand-500/30 bg-brand-500/5 p-6">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="h-5 w-5 text-brand-500" />
          <h3 className="text-sm font-semibold text-foreground">Book a Free Call</h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed mb-4">
          Skip the back-and-forth. Book a 45-minute discovery call to discuss your project directly. No obligation.
        </p>
        <Button variant="gradient" size="sm" className="w-full gap-2" asChild>
          <a href="#calendly-placeholder">
            <Calendar className="h-3.5 w-3.5" />
            Schedule a Call
          </a>
        </Button>
        <p className="text-[10px] text-muted-foreground text-center mt-2">
          Calendly integration (configure your link)
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">What to Expect</h3>
        <div className="space-y-3">
          {[
            { step: "01", text: "I review your project details carefully" },
            { step: "02", text: "Response within 24 hours with honest feedback" },
            { step: "03", text: "Discovery call to align on scope & goals" },
            { step: "04", text: "Detailed proposal with timeline & pricing" },
            { step: "05", text: "Start building" },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-3">
              <span className="text-xs font-mono text-brand-500 shrink-0 mt-0.5">{item.step}</span>
              <span className="text-xs text-muted-foreground">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border/50 bg-muted/20 p-4">
        <div className="flex items-start gap-2">
          <MessageSquare className="h-4 w-4 text-brand-500 shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="text-foreground font-medium">Honest note:</span>{" I take on a limited number of projects to ensure quality. If I'm not the right fit for your project, I'll tell you — and often recommend someone who is."}
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}
