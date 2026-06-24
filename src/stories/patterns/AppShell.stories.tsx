import type { Meta, StoryObj } from '@storybook/react';
import { AppShell } from '@/patterns/app-shell';
import { MoneyText } from '@/patterns/money-text';
import { Button } from '@/ui/button';

const meta = {
  title: 'Patterns/AppShell',
  component: AppShell,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AppShell>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The contextual sub-bar is app-provided via `utilityStart` / `utilityEnd`.
 * Here the IB composes an account chip + balances using DS primitives — the
 * shell itself knows nothing about accounts.
 */
export const Default: Story = {
  args: {
    children: <div />,
    user: { name: "Jonathan", initials: "JG" },
    navigation: [{ label: "Início", href: "/", isActive: true }],
    utilityStart: (
      <button className="flex items-center gap-2 rounded-md px-2 py-1 text-brand-surface-foreground/85 transition hover:bg-brand-surface-foreground/10">
        <span className="tabular-nums text-brand-surface-foreground/60">Ag. 1 · CC 1973</span>
        <span className="h-3 w-px bg-brand-surface-foreground/15" />
        <span className="font-medium text-brand-surface-foreground">Nubank</span>
      </button>
    ),
    utilityEnd: (
      <div className="flex items-center gap-2 text-label">
        <span className="text-brand-surface-foreground/60">Saldo</span>
        <MoneyText value={806406.05} size="sm" className="font-semibold text-brand-surface-foreground" />
      </div>
    ),
  },
};

export const MegaMenu: Story = {
  args: {
    children: <div />,
    user: { name: "Cassio Barbosa", initials: "CB", email: "cassio.barbosa@opea.com.br", role: "Operador N2" },
    utilityStart: (
      <span className="flex items-center gap-2 rounded-full border border-brand-surface-foreground/15 bg-brand-surface-foreground/5 px-3 py-1 text-caption font-medium uppercase tracking-wider text-brand-surface-foreground/85">
        <span className="size-1.5 rounded-full bg-success" /> Produção
      </span>
    ),
    navigation: [
      { label: "Início", href: "/", isActive: false },
      {
        label: "Cadastro",
        isActive: true,
        children: [
          { href: "/cadastro", label: "Visão geral", description: "Hub com as 4 etapas", isActive: true },
          { href: "/cadastro/empresas", label: "Empresas", description: "CNPJs, times e endereços" },
          { href: "/cadastro/usuarios", label: "Usuários", description: "Gerencie permissões" }
        ]
      },
      {
        label: "Operação",
        children: [
          { href: "/transacoes", label: "Transações" },
        ]
      }
    ],
    actions: <Button size="sm" variant="secondary" className="bg-brand-surface-foreground/10 text-brand-surface-foreground hover:bg-brand-surface-foreground/20">Novo cadastro</Button>
  }
};
