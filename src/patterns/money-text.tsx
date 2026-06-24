import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { formatBRL, formatBRLSigned } from "@/lib/format";

const moneyVariants = cva("tabular-nums", {
  variants: {
    size: {
      sm: "text-label",
      md: "text-body",
      lg: "text-title font-semibold",
      xl: "text-hero font-semibold",
    },
    tone: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      /** Green when positive, neutral when negative — matches statement/extrato. */
      flow: "",
    },
  },
  defaultVariants: { size: "md", tone: "default" },
});

export interface MoneyTextProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">, VariantProps<typeof moneyVariants> {
  value: number;
  /** Render a leading +/− sign. Implies `tone="flow"` coloring when tone is "flow". */
  signed?: boolean;
  /** When true, masks the value (privacy mode). */
  privacy?: boolean;
}

/**
 * Canonical way to render BRL money in the UI. Never format currency inline.
 *
 * - `signed` shows +/− and, with `tone="flow"`, colors positive green.
 * - `privacy` masks the value with dots.
 */
export function MoneyText({
  value,
  signed = false,
  privacy = false,
  size,
  tone,
  className,
  ...props
}: MoneyTextProps) {
  const flowColor = tone === "flow" ? (value >= 0 ? "text-success" : "text-foreground") : undefined;

  return (
    <span className={cn(moneyVariants({ size, tone }), flowColor, className)} {...props}>
      {privacy ? "••••••••" : signed ? formatBRLSigned(value) : formatBRL(value)}
    </span>
  );
}
