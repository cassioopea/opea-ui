import type { Meta, StoryObj } from '@storybook/react';
import { Toolbar } from '@/patterns/toolbar';

const meta = {
  title: 'Patterns/Toolbar',
  component: Toolbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {} as any,
  render: () => (
    <Toolbar>Ações</Toolbar>
  ),
};
