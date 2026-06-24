import type { Meta, StoryObj } from '@storybook/react';
import { AspectRatio } from '@/ui/aspect-ratio';

const meta = {
  title: 'Primitivos/AspectRatio',
  component: AspectRatio,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[300px]">
      <AspectRatio ratio={16 / 9} className="bg-muted rounded-xl flex items-center justify-center border border-border">
        <span className="text-muted-foreground font-semibold">16:9 Banner</span>
      </AspectRatio>
    </div>
  ),
};
