import * as React from "react";
import { cn } from "@/lib/utils";

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  /** Right-aligned actions (buttons, export, etc.). */
  actions?: React.ReactNode;
  /** Optional breadcrumb rendered above the title. */
  breadcrumb?: React.ReactNode;
  className?: string;
}

/**
 * Standard top-of-page header: H1 title + optional subtitle + actions.
 * Goes directly inside <AppShell>. Replaces hand-rolled `text-display` headers.
 */
export function PageHeader({ title, subtitle, actions, breadcrumb, className }: PageHeaderProps) {
  return (
    <div className={cn("mb-6", className)}>
      {breadcrumb && <div className="mb-3 text-caption text-muted-foreground">{breadcrumb}</div>}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-display font-semibold tracking-tight text-foreground">{title}</h1>
          {subtitle && <p className="mt-1 text-label text-muted-foreground">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}
