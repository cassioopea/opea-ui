import type { Meta, StoryObj } from '@storybook/react';
import { StatusBadge } from '@/ui/status-badge';

const meta = {
  title: 'Primitivos/StatusBadge',
  component: StatusBadge,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { status: 'ATIVO' },
  render: () => (
    <div className="flex gap-4">
      <StatusBadge status="ATIVO" showIcon />
      <StatusBadge status="PENDENTE" showIcon />
      <StatusBadge status="REPROVADO" showIcon />
      <StatusBadge status="AGENDADO" showIcon />
      <StatusBadge status="Desconhecido" />
    </div>
  ),
};
