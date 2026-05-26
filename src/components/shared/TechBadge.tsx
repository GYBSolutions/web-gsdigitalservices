import React from "react";
import { cn } from "@/lib/utils";

interface TechBadgeProps {
  name: string;
  className?: string;
  size?: "sm" | "md";
}

export function TechBadge({ name, className, size = "md" }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-muted/50 font-mono text-muted-foreground hover:border-brand-500/40 hover:text-brand-400 hover:bg-brand-500/5 transition-colors",
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs",
        className
      )}
    >
      {name}
    </span>
  );
}

interface TechStackProps {
  technologies: string[];
  className?: string;
  limit?: number;
}

export function TechStack({ technologies, className, limit }: TechStackProps) {
  const displayed = limit ? technologies.slice(0, limit) : technologies;
  const remaining = limit ? technologies.length - limit : 0;

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {displayed.map((tech) => (
        <TechBadge key={tech} name={tech} size="sm" />
      ))}
      {remaining > 0 && (
        <span className="inline-flex items-center rounded-md border border-border bg-muted/50 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
          +{remaining}
        </span>
      )}
    </div>
  );
}
