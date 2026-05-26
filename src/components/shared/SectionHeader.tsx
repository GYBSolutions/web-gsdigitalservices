import React from "react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GradientText } from "@/components/shared/GradientText";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  titleHighlight,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <AnimatedSection
      className={cn(
        "mb-16",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-500 mb-4">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.1] mb-4">
        {titleHighlight ? (
          <>
            {title}{" "}
            <GradientText>{titleHighlight}</GradientText>
          </>
        ) : (
          title
        )}
      </h2>
      {description && (
        <p
          className={cn(
            "text-base md:text-lg text-muted-foreground leading-relaxed",
            align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"
          )}
        >
          {description}
        </p>
      )}
    </AnimatedSection>
  );
}
