import type { Meta, StoryObj } from '@storybook/react';
import { SectionHeader } from '@/patterns/section-header';

const meta = {
  title: 'Patterns/SectionHeader',
  component: SectionHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {} as any,
  render: () => (
    <SectionHeader title="Seção" />
  ),
};
