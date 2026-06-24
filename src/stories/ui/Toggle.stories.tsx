import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from '@/ui/toggle';
import { Bold } from 'lucide-react';

const meta = {
  title: 'Primitivos/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="p-4 bg-card border border-border rounded-lg">
      <Toggle aria-label="Toggle italic">
        <Bold className="h-4 w-4" />
      </Toggle>
    </div>
  ),
};
