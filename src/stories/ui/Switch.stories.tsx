import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '@/ui/switch';
import { Label } from '@/ui/label';

const meta = {
  title: 'Primitivos/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Ativar notificações por e-mail</Label>
    </div>
  ),
};
