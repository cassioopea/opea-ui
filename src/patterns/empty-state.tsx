import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const iconWrapVariants = cva("grid h-12 w-12 place-items-center rounded-full", {
  variants: {
    tone: {
      neutral: "bg-muted text-muted-foreground",
      success: "bg-success/15 text-success",
      warning: "bg-warning/15 text-warning",
      info: "bg-info/15 text-info",
    },
  },
  defaultVariants: { tone: "neutral" },
});

export interface EmptyStateProps extends VariantProps<typeof iconWrapVariants> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  /** Optional call-to-action (link or button). */
  action?: React.ReactNode;
  className?: string;
}

/**
 * Centered empty/zero state for tables, lists and panels.
 * Treat empty states as first-class — always provide a next step when relevant.
 */
export function EmptyState({ icon, title, description, action, tone, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 px-6 py-16 text-center",
        className,
      )}
    >
      {icon && <div className={iconWrapVariants({ tone })}>{icon}</div>}
      <p className="text-body font-semibold text-foreground">{title}</p>
      {description && <p className="max-w-sm text-body text-muted-foreground">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
