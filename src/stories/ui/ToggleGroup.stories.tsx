import type { Meta, StoryObj } from '@storybook/react';
import { ToggleGroup, ToggleGroupItem } from '@/ui/toggle-group';
import { AlignCenter, AlignLeft, AlignRight } from 'lucide-react';

const meta = {
  title: 'Primitivos/ToggleGroup',
  component: ToggleGroup,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { type: 'single' as const },
  render: () => (
    <div className="p-4 border border-border bg-card rounded-lg">
      <ToggleGroup type="single" defaultValue="center">
        <ToggleGroupItem value="left" aria-label="Toggle left aligned">
          <AlignLeft className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Toggle center aligned">
          <AlignCenter className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Toggle right aligned">
          <AlignRight className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
};
