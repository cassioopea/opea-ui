import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '@/ui/label';

const meta = {
  title: 'Primitivos/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <input type="checkbox" id="terms" className="h-4 w-4 border-border rounded" />
      <Label htmlFor="terms">Concordo com os termos de uso.</Label>
    </div>
  ),
};
