import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeBase =
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

const badgeVariants = cva(badgeBase, {
  variants: {
    variant: {
      default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
      secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
      destructive:
        "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
      outline: "text-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

/**
 * Semantic color axis, shared with <StatusBadge>. Prefer `tone` for
 * status/meaning (success/warning/danger/info/neutral); use `variant` for
 * structural fills (default/secondary/outline). Soft tinted pill, like StatusBadge.
 */
const badgeToneVariants = cva(badgeBase, {
  variants: {
    tone: {
      success: "border-transparent bg-success/12 text-success ring-1 ring-inset ring-success/25",
      warning: "border-transparent bg-warning/15 text-warning ring-1 ring-inset ring-warning/25",
      danger:
        "border-transparent bg-destructive/12 text-destructive ring-1 ring-inset ring-destructive/25",
      info: "border-transparent bg-info/12 text-info ring-1 ring-inset ring-info/25",
      neutral: "bg-muted text-muted-foreground ring-1 ring-inset ring-border",
    },
  },
});

export type BadgeTone = NonNullable<VariantProps<typeof badgeToneVariants>["tone"]>;

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  /** Semantic color (shared vocabulary with StatusBadge). Overrides `variant` when set. */
  tone?: BadgeTone;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, tone, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(tone ? badgeToneVariants({ tone }) : badgeVariants({ variant }), className)}
      {...props}
    />
  ),
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
