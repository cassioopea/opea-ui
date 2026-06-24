import type { Meta, StoryObj } from '@storybook/react';
import { OpeaLogo } from '@/ui/opea-logo';

const meta = {
  title: 'Primitivos/OpeaLogo',
  component: OpeaLogo,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof OpeaLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="p-8 bg-card rounded-xl border border-border flex items-center justify-center">
      <OpeaLogo />
    </div>
  ),
};
