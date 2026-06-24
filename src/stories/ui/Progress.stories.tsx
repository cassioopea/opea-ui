import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from '@/ui/progress';

const meta = {
  title: 'Primitivos/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[300px] flex flex-col gap-2">
      <span className="text-sm font-semibold">Processando arquivo... 60%</span>
      <Progress value={60} className="w-full" />
    </div>
  ),
};
