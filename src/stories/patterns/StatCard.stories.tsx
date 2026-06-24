import type { Meta, StoryObj } from '@storybook/react';
import { Stat } from '@/patterns/stat-card';

const meta = {
  title: 'Patterns/StatCard',
  component: Stat,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Stat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Entradas (30d)",
    value: "R$ 250.000,00",
    tone: "default"
  },
};
