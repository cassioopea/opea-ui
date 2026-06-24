import type { Meta, StoryObj } from '@storybook/react';
import { ScrollArea } from '@/ui/scroll-area';

const meta = {
  title: 'Primitivos/ScrollArea',
  component: ScrollArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-48 w-[300px] rounded-xl border border-border bg-card p-4">
      <div className="space-y-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="text-[14px] text-foreground border-b border-border/50 pb-2">
            Item da lista longa número {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};
