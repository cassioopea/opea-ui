import type { Meta, StoryObj } from '@storybook/react';
import { DataRow } from '@/ui/data-row';

const meta = {
  title: 'Primitivos/DataRow',
  component: DataRow,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DataRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Favorecido', value: 'João da Silva' },
  render: () => (
    <div className="w-[400px] flex flex-col gap-2">
      <DataRow label="Favorecido" value="João da Silva" />
      <DataRow label="CPF" value="123.456.789-00" />
      <DataRow label="Instituição" value="Itaú (341)" />
      <DataRow label="Valor" value="R$ 1.500,00" emphasis />
    </div>
  ),
};
