import type { Meta, StoryObj } from '@storybook/react';
import { ActionCard } from '@/patterns/action-card';
import { ArrowUpRight } from 'lucide-react';

const meta = {
  title: 'Patterns/ActionCard',
  component: ActionCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ActionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Transferir",
    desc: "Pix, TED ou Opea",
    icon: ArrowUpRight
  },
};
