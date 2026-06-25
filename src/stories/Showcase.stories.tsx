import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

// Icons
import {
  ArrowLeftRight,
  ArrowUpRight,
  Barcode,
  Calendar,
  ChevronRight,
  DollarSign,
  Download,
  Eye,
  EyeOff,
  Sparkles,
  TriangleAlert,
  Wallet,
  Zap,
} from 'lucide-react';

// Patterns
import { MoneyText } from '@/patterns/money-text';
import { SectionHeader } from '@/patterns/section-header';
import { SurfaceCard } from '@/patterns/surface-card';
import { AppShell } from '@/patterns/app-shell';
import { HeroBalanceCard } from '@/patterns/hero-balance-card';

const NAV = [
  { href: "/", label: "Início", isActive: true },
  { href: "/caixinha", label: "Caixinha" },
  { href: "/aprovacao", label: "Aprovação" },
  { href: "/favorecidos", label: "Favorecidos" },
  { href: "/extrato", label: "Extrato" },
];

const ACTIONS = [
  { label: "Pix", desc: "Envie em segundos", icon: Zap, to: "/transferir" },
  { label: "Transferir", desc: "TED entre bancos", icon: ArrowUpRight, to: "/transferir" },
  { label: "Receber", desc: "Cobrar via Pix", icon: DollarSign, to: "/receber" },
  { label: "Pagar", desc: "Boletos e contas", icon: Barcode, to: "/pagamentos" },
] as const;

const CAIXINHAS = [
  { id: "antecipacao", name: "Antecipação", code: "2000001973", value: 99544.0, progress: 100, tone: "wine" as const },
  { id: "fundo-reserva", name: "Fundo de Reserva", code: "1200001973", value: 82583.8, progress: 100, tone: "wine" as const },
  { id: "capital-giro", name: "Capital de Giro", code: "3500001973", value: 42110.55, progress: 64, tone: "neutral" as const },
  { id: "reserva-operacional", name: "Reserva Operacional", code: "4100001973", value: 18295.4, progress: 31, tone: "neutral" as const },
];

const RECENT = [
  { t: "Retirada", s: "Fundo de Reserva", v: 2500.2, d: "02/06 09:28" },
  { t: "TED enviada", s: "Opea Securitizadora", v: -75.0, d: "29/05 11:53" },
  { t: "Transferência", s: "DOM Medical Center", v: -5000.0, d: "29/05 11:55" },
  { t: "Retirada", s: "Antecipação", v: 456.0, d: "28/05 17:44" },
];

function DashboardContent() {
  const account = { id: '1', apelido: 'CRI.1.CIA.2 — NUBANK', razaoSocial: 'OPEA SECURITIZADORA S.A.', agencia: '1', conta: '1973', saldo: 806406.05, aggregatedBalance: 988533.85 };
  const pendingCount = 25;

  return (
    <>
      {/* Greeting */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-body text-muted-foreground">Olá, Jonathan · você está em</p>
          <h1 className="mt-1 text-display font-semibold tracking-tight text-foreground">
            {account.apelido}
          </h1>
          <p className="mt-1 text-body text-muted-foreground tabular-nums">
            {account.razaoSocial} · Ag. {account.agencia} · CC {account.conta}
          </p>
        </div>
        <p className="text-body text-muted-foreground">
          Atualizado em <span className="text-foreground">03/06/2026, 16:19</span>
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Balance hero */}
        <section className="col-span-12 lg:col-span-8">
          <HeroBalanceCard
            saldo={account.saldo}
            conta={account.conta}
            agencia={account.agencia}
            razaoSocial={account.razaoSocial}
            metrics={{
              aggregated: account.aggregatedBalance,
              inflow: 1012456.00,
              outflow: 873220.15
            }}
            onExtractClick={() => {}}
          />
        </section>

        {/* Side stack */}
        <aside className="col-span-12 space-y-4 lg:col-span-4">
          <SurfaceCard asChild interactive>
            <a href="#" className="flex items-start gap-3 outline-none">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-warning/15 text-warning">
                <TriangleAlert className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-label font-semibold text-foreground">Aprovados pendentes</p>
                <p className="text-body text-muted-foreground">Operações aguardando assinatura</p>
              </div>
              <span className="grid h-6 min-w-6 place-items-center rounded-full bg-destructive px-1.5 text-caption font-bold text-destructive-foreground shadow-sm">
                {pendingCount}
              </span>
            </a>
          </SurfaceCard>
          <SurfaceCard asChild interactive>
            <a href="#" className="flex items-start gap-3 outline-none">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-info/15 text-info">
                <Calendar className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-label font-semibold text-foreground">Agendados</p>
                <p className="text-body text-muted-foreground">Visualizar agendamentos da conta</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </a>
          </SurfaceCard>
          <SurfaceCard interactive>
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-success/15 text-success">
                <Sparkles className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-label font-semibold text-foreground">Opea Insights</p>
                <p className="text-body text-muted-foreground">Sua liquidez cresceu 4,2% no mês</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </SurfaceCard>
        </aside>

        {/* Quick actions */}
        <section className="col-span-12">
          <SectionHeader title="Ações rápidas" subtitle="Movimentações em um clique" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {ACTIONS.map((a) => (
              <SurfaceCard key={a.label} asChild interactive>
                <a href="#" className="group block outline-none">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <a.icon className="h-5 w-5" />
                  </span>
                  <p className="mt-4 text-subheading font-semibold text-foreground">{a.label}</p>
                  <p className="text-body text-muted-foreground">{a.desc}</p>
                </a>
              </SurfaceCard>
            ))}
          </div>
        </section>

        {/* Caixinhas */}
        <section className="col-span-12 lg:col-span-8">
          <SectionHeader title="Suas caixinhas" subtitle="Atualizado às 16:19" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {CAIXINHAS.map((c) => (
              <SurfaceCard key={c.code} asChild interactive>
                <a href="#" className="group block outline-none">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0">
                      <p className="truncate text-body font-semibold text-foreground">{c.name}</p>
                      <p className="text-label tabular-nums text-muted-foreground">{c.code}</p>
                    </div>
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                      <Wallet className="h-4 w-4" />
                    </span>
                  </div>
                  <MoneyText value={c.value} size="lg" className="mt-4 block" />
                  <div className="mt-4">
                    <div className="mb-1.5 flex items-center justify-between text-caption text-muted-foreground">
                      <span>Meta</span>
                      <span className="font-semibold text-foreground tabular-nums">{c.progress}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full ${c.tone === "wine" ? "bg-primary" : "bg-foreground/40"}`}
                        style={{ width: `${c.progress}%` }}
                      />
                    </div>
                  </div>
                </a>
              </SurfaceCard>
            ))}
          </div>
        </section>

        {/* Recent activity preview */}
        <section className="col-span-12 lg:col-span-4">
          <SectionHeader title="Últimos movimentos" subtitle="Atualizado às 16:19" />
          <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-card">
            {RECENT.map((r, i) => (
              <div key={i} className="flex items-center justify-between border-b border-border/60 px-5 py-3.5 last:border-0">
                <div className="min-w-0">
                  <p className="truncate text-label font-medium text-foreground">{r.t}</p>
                  <p className="truncate text-caption text-muted-foreground">{r.s} · {r.d}</p>
                </div>
                <MoneyText value={r.v} signed tone="flow" size="sm" className="shrink-0 font-semibold" />
              </div>
            ))}
            <a href="#" className="flex items-center justify-center gap-1 border-t border-border/60 px-5 py-3 text-body font-semibold text-primary hover:bg-accent">
              Ver extrato completo <ChevronRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </section>
      </div>
    </>
  );
}

const meta: Meta = {
  title: 'Pages/Internet Banking',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

function IBDashboardDemo() {
  const [isPrivacyMode, setIsPrivacyMode] = useState(false);
  return (
      <AppShell
        user={{ name: "Jonathan Gomes Santos", initials: "JG" }}
        navigation={NAV}
        utilityStart={
          <button className="flex items-center gap-2 rounded-md px-2 py-1 text-brand-surface-foreground/85 transition hover:bg-brand-surface-foreground/10">
            <span className="tabular-nums text-brand-surface-foreground/60">Ag. 1 · CC 1973</span>
            <span className="h-3 w-px bg-brand-surface-foreground/15" />
            <span className="max-w-[260px] truncate font-medium text-brand-surface-foreground">CRI.1.CIA.2 — NUBANK</span>
          </button>
        }
        utilityEnd={
          <>
            <div className="flex items-center gap-2 text-label">
              <span className="text-brand-surface-foreground/60">Saldo</span>
              <MoneyText value={806406.05} size="sm" privacy={isPrivacyMode} className="font-semibold text-brand-surface-foreground" />
            </div>
            <span className="h-4 w-px bg-brand-surface-foreground/15" />
            <div className="flex items-center gap-2 text-label">
              <span className="text-brand-surface-foreground/60">Total</span>
              <MoneyText value={988533.85} size="sm" privacy={isPrivacyMode} className="font-semibold text-brand-surface-foreground" />
            </div>
            <button
              onClick={() => setIsPrivacyMode(!isPrivacyMode)}
              aria-label="Alternar privacidade"
              className="grid size-7 place-items-center rounded-md text-brand-surface-foreground/65 transition hover:bg-brand-surface-foreground/10 hover:text-brand-surface-foreground"
            >
              {isPrivacyMode ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
            </button>
          </>
        }
        actions={
          <>
            <a href="#" className="flex items-center gap-2 px-4 py-2 bg-brand-surface-foreground text-brand-surface font-semibold rounded-full hover:bg-brand-surface-foreground/90 transition text-label shadow-sm">
              <ArrowLeftRight className="w-4 h-4" /> Pagar / Transferir
            </a>
            <a href="#" className="flex items-center gap-2 px-4 py-2 bg-brand-surface-foreground/10 text-brand-surface-foreground font-semibold rounded-full hover:bg-brand-surface-foreground/20 transition text-label border border-brand-surface-foreground/20">
              <Download className="w-4 h-4" /> Cobrar / Receber
            </a>
          </>
        }
      >
        <DashboardContent />
      </AppShell>
  );
}

export const IB_Dashboard: StoryObj = {
  render: () => <IBDashboardDemo />,
};
