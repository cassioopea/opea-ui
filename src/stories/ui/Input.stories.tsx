import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@/ui/input';

const meta = {
  title: 'Primitivos/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[300px]">
      <Input type="text" placeholder="Nome completo" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[300px]">
      <Input type="text" placeholder="Você não pode editar" disabled />
    </div>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[300px]">
      <Input type="email" placeholder="E-mail inválido" aria-invalid="true" defaultValue="joao@." />
    </div>
  ),
};
