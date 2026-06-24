import type { Meta, StoryObj } from '@storybook/react';
import { PinDialog } from '@/ui/pin-dialog';

const meta = {
  title: 'Primitivos/PinDialog',
  component: PinDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PinDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    title: "Assinatura Eletrônica",
    description: "Digite seu PIN de 6 dígitos para confirmar a transferência.",
    onOpenChange: () => {},
    onSuccess: () => alert("PIN Sucesso!")
  },
};
