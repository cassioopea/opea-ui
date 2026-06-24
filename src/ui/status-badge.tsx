import { Check, Clock, X, AlertCircle, Calendar, type LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export type StatusType =
  | "ATIVO"
  | "INATIVO"
  | "PENDENTE"
  | "AGENDADO"
  | "EXECUTADO"
  | "APROVADO"
  | "CANCELADO"
  | "REPROVADO";

export type StatusTone = "success" | "danger" | "warning" | "info" | "neutral";

const statusBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-caption font-bold uppercase tracking-wider ring-1 ring-inset",
  {
    variants: {
      tone: {
        success: "bg-success/12 text-success ring-success/25",
        danger: "bg-destructive/12 text-destructive ring-destructive/25",
        warning: "bg-warning/15 text-warning ring-warning/25",
        info: "bg-info/12 text-info ring-info/25",
        neutral: "bg-muted text-muted-foreground ring-border",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

const toneByStatus: Record<StatusType, StatusTone> = {
  ATIVO: "success",
  EXECUTADO: "success",
  APROVADO: "success",
  INATIVO: "danger",
  CANCELADO: "danger",
  REPROVADO: "danger",
  PENDENTE: "warning",
  AGENDADO: "info",
};

const iconByTone: Record<StatusTone, LucideIcon> = {
  success: Check,
  danger: X,
  warning: Clock,
  info: Calendar,
  neutral: AlertCircle,
};

export interface StatusBadgeProps extends VariantProps<typeof statusBadgeVariants> {
  status: StatusType | string;
  /** Override the auto-detected tone (useful for type badges like PIX/TED). */
  tone?: StatusTone;
  showIcon?: boolean;
  className?: string;
}

/**
 * Token-driven status pill. The tone is inferred from known statuses
 * (ATIVO/PENDENTE/AGENDADO/…) or can be set explicitly via `tone`.
 * Always communicates by text + color (never color alone).
 */
export function StatusBadge({ status, tone, showIcon = false, className }: StatusBadgeProps) {
  const resolvedTone: StatusTone =
    tone ?? toneByStatus[status.toUpperCase() as StatusType] ?? "neutral";
  const Icon = iconByTone[resolvedTone];

  return (
    <span className={cn(statusBadgeVariants({ tone: resolvedTone }), className)}>
      {showIcon && <Icon className="h-3 w-3" />}
      {status}
    </span>
  );
}

export { statusBadgeVariants };
