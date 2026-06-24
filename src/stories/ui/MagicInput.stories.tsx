import type { Meta, StoryObj } from '@storybook/react';
import { MagicInput } from '@/ui/magic-input';

const meta = {
  title: 'Primitivos/MagicInput',
  component: MagicInput,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof MagicInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {} as any,
  render: function Render() {
    return (
      <div className="w-[300px]">
        <MagicInput
          placeholder="CPF, CNPJ, E-mail, Celular..."
        />
      </div>
    );
  },
};
