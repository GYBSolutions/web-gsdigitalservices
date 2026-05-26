"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type MockupType = "ios" | "web" | "dashboard";

interface AppMockupProps {
  type: MockupType;
  accentColor: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  imageUrl?: string;
}

function IPhoneMockup({
  accentColor,
  size,
  imageUrl,
}: {
  accentColor: string;
  size: "sm" | "md" | "lg";
  imageUrl?: string;
}) {
  const dims =
    size === "lg"
      ? { w: "w-[200px]", h: "h-[400px]", radius: "rounded-[40px]", border: "border-[5px]" }
      : size === "md"
      ? { w: "w-[160px]", h: "h-[320px]", radius: "rounded-[32px]", border: "border-4" }
      : { w: "w-[120px]", h: "h-[240px]", radius: "rounded-[24px]", border: "border-[3px]" };

  const bars = size === "lg" ? [35, 58, 42, 75, 52, 88, 65, 48] : [35, 58, 42, 75, 52, 88, 65];

  return (
    <div
      className={cn(
        "relative shrink-0",
        dims.w,
        dims.h,
        dims.radius,
        dims.border,
        "border-foreground/20 bg-card overflow-hidden shadow-2xl"
      )}
    >
      {/* Dynamic island */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[35%] h-4 rounded-full bg-foreground/80 z-10" />

      {imageUrl ? (
        /* Real screenshot */
        <img
          src={imageUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
      ) : (
        /* Placeholder UI */
        <>
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(160deg, ${accentColor}35 0%, ${accentColor}10 45%, transparent 75%)`,
            }}
          />
          <div className="absolute top-8 left-4 right-4 flex justify-between items-center">
            <div className="h-1.5 w-8 rounded-full bg-foreground/25" />
            <div className="flex gap-1">
              {[3, 2, 1].map((i) => (
                <div key={i} className="w-1 rounded-sm bg-foreground/25" style={{ height: `${i * 3 + 2}px` }} />
              ))}
            </div>
          </div>
          <div className="absolute inset-0 px-4 pt-14 pb-4">
            <div className="mb-4">
              <div className="h-2 w-20 rounded-full bg-foreground/30 mb-1.5" />
              <div className="h-1.5 w-28 rounded-full bg-foreground/15" />
            </div>
            <div
              className="mb-4 rounded-xl p-3"
              style={{ backgroundColor: `${accentColor}20`, border: `1px solid ${accentColor}40` }}
            >
              <div className="h-1.5 w-12 rounded-full bg-foreground/20 mb-2" />
              <div className="h-5 w-20 rounded-md bg-foreground/30" />
            </div>
            <div className="flex items-end gap-1 h-14 mb-4">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm"
                  style={{
                    height: `${h}%`,
                    backgroundColor: `${accentColor}${i === bars.length - 2 ? "cc" : "55"}`,
                  }}
                />
              ))}
            </div>
            <div className="space-y-2">
              {[100, 80, 65].map((w, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full shrink-0" style={{ backgroundColor: `${accentColor}30` }} />
                  <div className="h-1.5 rounded-full bg-foreground/15" style={{ width: `${w}%` }} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Home indicator — always on top */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 rounded-full bg-foreground/20 z-10" />
    </div>
  );
}

function BrowserMockup({
  accentColor,
  size,
  imageUrl,
}: {
  accentColor: string;
  size: "sm" | "md" | "lg";
  imageUrl?: string;
}) {
  const h = size === "lg" ? "h-[280px]" : size === "md" ? "h-[210px]" : "h-[160px]";

  return (
    <div className={cn("w-full rounded-xl border border-foreground/15 bg-card overflow-hidden shadow-2xl", h)}>
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-foreground/10 bg-foreground/[0.03] shrink-0">
        <div className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
        <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
        <div className="flex-1 mx-2 h-4 rounded-md bg-foreground/8 border border-foreground/10 flex items-center px-2">
          <div className="h-1.5 w-24 rounded-full bg-foreground/20" />
        </div>
      </div>

      {imageUrl ? (
        /* Real screenshot */
        <div className="flex-1 overflow-hidden" style={{ height: "calc(100% - 32px)" }}>
          <img
            src={imageUrl}
            alt=""
            className="w-full h-full object-cover object-top"
          />
        </div>
      ) : (
        /* Placeholder UI */
        <div className="flex h-full">
          <div className="w-12 border-r border-foreground/10 bg-foreground/[0.02] shrink-0 flex flex-col gap-2 p-2 pt-3">
            <div className="h-6 w-6 rounded-lg mx-auto" style={{ backgroundColor: `${accentColor}40` }} />
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-5 w-5 rounded-md mx-auto bg-foreground/10" />
            ))}
          </div>
          <div className="flex-1 p-3">
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="rounded-lg p-2"
                  style={{
                    backgroundColor: i === 0 ? `${accentColor}25` : `${accentColor}10`,
                    border: `1px solid ${accentColor}${i === 0 ? "40" : "20"}`,
                  }}
                >
                  <div className="h-3 w-10 rounded-sm bg-foreground/30 mb-1" />
                  <div className="h-1.5 w-7 rounded-full bg-foreground/15" />
                </div>
              ))}
            </div>
            <div
              className="rounded-xl p-3 mb-3"
              style={{
                background: `linear-gradient(135deg, ${accentColor}15 0%, transparent 70%)`,
                border: `1px solid ${accentColor}25`,
              }}
            >
              <div className="flex items-end gap-1 h-12">
                {[45, 65, 40, 80, 55, 90, 70, 60].map((bh, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm"
                    style={{ height: `${bh}%`, backgroundColor: `${accentColor}${i === 5 ? "cc" : "50"}` }}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-2 rounded-lg bg-foreground/[0.03] px-2 py-1.5">
                  <div className="h-4 w-4 rounded-full shrink-0" style={{ backgroundColor: `${accentColor}30` }} />
                  <div className="h-1.5 rounded-full bg-foreground/20 flex-1" />
                  <div className="h-1.5 w-8 rounded-full bg-foreground/15 shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function AppMockup({ type, accentColor, className, size = "md", imageUrl }: AppMockupProps) {
  if (type === "ios") {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <IPhoneMockup accentColor={accentColor} size={size} imageUrl={imageUrl} />
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <BrowserMockup accentColor={accentColor} size={size} imageUrl={imageUrl} />
    </div>
  );
}

export function DualMockup({
  accentColor,
  className,
}: {
  accentColor: string;
  className?: string;
}) {
  return (
    <div className={cn("relative flex items-end justify-center gap-4", className)}>
      <div className="w-[260px] -mb-4">
        <BrowserMockup accentColor={accentColor} size="sm" />
      </div>
      <div className="relative z-10 -ml-8">
        <IPhoneMockup accentColor={accentColor} size="sm" />
      </div>
    </div>
  );
}
