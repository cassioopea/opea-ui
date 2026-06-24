import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from '@/ui/slider';

const meta = {
  title: 'Primitivos/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[300px] p-6 border border-border bg-card rounded-xl">
      <p className="text-[14px] font-semibold text-foreground mb-4 block">Ajuste o Zoom</p>
      <Slider defaultValue={[50]} max={100} step={1} />
    </div>
  ),
};
