import type { Meta, StoryObj } from '@storybook/react';
import { SurfaceCard } from '@/patterns/surface-card';

const meta = {
  title: 'Patterns/SurfaceCard',
  component: SurfaceCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SurfaceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Component default args
  },
};
