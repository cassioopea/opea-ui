import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  /** Right-aligned actions (e.g. a "Ver tudo" link or button). */
  action?: React.ReactNode;
  className?: string;
}

/**
 * In-page section title (h2 level), used above grids and lists.
 * For the top-of-page title use <PageHeader> instead.
 */
export function SectionHeader({ title, subtitle, action, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-4 mt-2 flex items-end justify-between gap-4", className)}>
      <div>
        <h2 className="text-heading font-semibold text-foreground">{title}</h2>
        {subtitle && <p className="text-body text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
