import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@/ui/badge';

const meta = {
  title: 'Primitivos/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex gap-4">
      <Badge variant="default">Padrão</Badge>
      <Badge variant="secondary">Secundário</Badge>
      <Badge variant="destructive">Destrutivo</Badge>
      <Badge variant="outline">Contorno</Badge>
    </div>
  ),
};
