import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const surfaceCardVariants = cva(
  // `block` so the surface lays out correctly even when rendered as an inline
  // element via asChild (e.g. a TanStack <Link>, which is an <a>).
  "block rounded-2xl border border-border/70 bg-card text-card-foreground shadow-card transition",
  {
    variants: {
      padding: {
        none: "",
        sm: "p-4",
        md: "p-5",
        lg: "p-6",
      },
      interactive: {
        true: "hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-elevated",
        false: "",
      },
    },
    defaultVariants: { padding: "md", interactive: false },
  },
);

export interface SurfaceCardProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof surfaceCardVariants> {
  /** Render as the child element (e.g. a TanStack <Link> or a <button>) instead of a div. */
  asChild?: boolean;
}

/**
 * The canonical content surface (rounded-2xl, border, card bg, card shadow).
 * Use `interactive` for clickable cards and `asChild` to wrap a Link/button.
 * This is the single surface primitive — <Card> composes it, and patterns
 * should reach for it instead of hand-rolling `rounded-2xl border bg-card`.
 */
export const SurfaceCard = React.forwardRef<HTMLDivElement, SurfaceCardProps>(
  ({ className, padding, interactive, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        ref={ref}
        className={cn(surfaceCardVariants({ padding, interactive }), className)}
        {...props}
      />
    );
  },
);
SurfaceCard.displayName = "SurfaceCard";

export { surfaceCardVariants };
