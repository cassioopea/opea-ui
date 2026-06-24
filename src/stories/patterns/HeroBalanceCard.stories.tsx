import type { Meta, StoryObj } from '@storybook/react';
import { HeroBalanceCard } from '@/patterns/hero-balance-card';

const meta = {
  title: 'Patterns/HeroBalanceCard',
  component: HeroBalanceCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HeroBalanceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    saldo: 806406.05,
    conta: "1973",
    agencia: "1",
    razaoSocial: "Opea Tech",
    metrics: { aggregated: 988533.85, inflow: 250000, outflow: 15000 }
  },
};
