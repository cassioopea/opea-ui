import type { Meta, StoryObj } from '@storybook/react';
import { PixIcon } from '@/ui/pix-icon';

const meta = {
  title: 'Primitivos/PixIcon',
  component: PixIcon,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PixIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex gap-4">
      <PixIcon className="w-8 h-8 text-foreground" />
      <PixIcon className="w-8 h-8 text-primary" />
    </div>
  ),
};
