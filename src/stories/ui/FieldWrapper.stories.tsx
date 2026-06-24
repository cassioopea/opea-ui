import type { Meta, StoryObj } from '@storybook/react';
import { FieldWrapper } from '@/ui/field-wrapper';
import { Input } from '@/ui/input';

const meta = {
  title: 'Primitivos/FieldWrapper',
  component: FieldWrapper,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof FieldWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: '', children: <div /> },
  render: () => (
    <div className="w-[300px]">
      <FieldWrapper label="Agência">
        <Input placeholder="0000" />
      </FieldWrapper>
    </div>
  ),
};
