import * as React from "react";
import { cn } from "@/lib/utils";

/** Where the stat is rendered, so its text adapts to the surface. */
export type StatTone = "default" | "onBrand";

export interface StatProps {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  /** Use `onBrand` when placed on a dark branded surface (hero/banner). */
  tone?: StatTone;
  className?: string;
}

/**
 * A single label + value KPI. Compose several inside <StatGroup>.
 * Colors come from tokens: `onBrand` consumes `--brand-surface-foreground`
 * so it themes with the active theme instead of a hardcoded white.
 */
export function Stat({ label, value, icon, tone = "default", className }: StatProps) {
  const onBrand = tone === "onBrand";
  return (
    <div className={className}>
      <p
        className={cn(
          "flex items-center gap-1.5 text-caption uppercase tracking-[0.14em]",
          onBrand ? "text-brand-surface-foreground/60" : "text-muted-foreground",
        )}
      >
        {icon}
        {label}
      </p>
      <p
        className={cn(
          "mt-1 text-heading font-semibold tabular-nums",
          onBrand ? "text-brand-surface-foreground" : "text-foreground",
        )}
      >
        {value}
      </p>
    </div>
  );
}

export interface StatGroupProps {
  children: React.ReactNode;
  /** Number of columns on the widest breakpoint (2, 3 or 4). */
  cols?: 2 | 3 | 4;
  className?: string;
}

const colClass: Record<NonNullable<StatGroupProps["cols"]>, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
};

/** Responsive grid wrapper for <Stat> items. */
export function StatGroup({ children, cols = 4, className }: StatGroupProps) {
  return <div className={cn("grid gap-4", colClass[cols], className)}>{children}</div>;
}
