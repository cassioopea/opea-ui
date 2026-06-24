import { cn } from "@/lib/utils";
import { Eye, ChevronRight } from "lucide-react";
import { formatBRL } from "@/lib/format";
import { MoneyText } from "@/patterns/money-text";
import { Stat } from "@/patterns/stat-card";

export interface HeroBalanceCardProps {
  saldo: number;
  conta: string;
  agencia: string;
  razaoSocial: string;
  metrics: {
    aggregated: string | number;
    inflow: string | number;
    outflow: string | number;
  };
  onExtractClick?: () => void;
  className?: string;
}

export function HeroBalanceCard({
  saldo,
  conta,
  agencia,
  razaoSocial,
  metrics,
  onExtractClick,
  className
}: HeroBalanceCardProps) {
  const formatMetric = (val: string | number) =>
    typeof val === "number" ? formatBRL(val) : val;

  return (
    <div className={cn("relative overflow-hidden rounded-2xl bg-brand-surface p-8 text-brand-surface-foreground shadow-elevated", className)}>
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary opacity-30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-40 w-[60%] bg-gradient-to-l from-brand-surface-foreground/5 to-transparent" />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="flex items-center gap-2 text-body uppercase tracking-[0.10em] text-brand-surface-foreground/60">
            Saldo em conta <Eye className="h-3.5 w-3.5" />
          </p>
          <MoneyText value={saldo} size="xl" className="mt-3 block text-brand-surface-foreground" />
          <p className="mt-2 text-label text-brand-surface-foreground/65">
            CC {conta} · Agência {agencia} · {razaoSocial}
          </p>
        </div>
        {onExtractClick && (
          <button
            onClick={onExtractClick}
            className="group flex items-center gap-1.5 rounded-full border border-brand-surface-foreground/20 bg-brand-surface-foreground/10 px-4 py-2 text-label font-medium backdrop-blur transition hover:bg-brand-surface-foreground/15"
          >
            Ver extrato
            <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </button>
        )}
      </div>
      <div className="relative mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl bg-brand-surface-foreground/10">
        {[
          { l: "Total agregado", v: formatMetric(metrics.aggregated) },
          { l: "Entradas (30d)", v: formatMetric(metrics.inflow) },
          { l: "Saídas (30d)", v: formatMetric(metrics.outflow) },
        ].map((s) => (
          <div key={s.l} className="bg-brand-surface px-5 py-4">
            <Stat tone="onBrand" label={s.l} value={s.v} />
          </div>
        ))}
      </div>
    </div>
  );
}
