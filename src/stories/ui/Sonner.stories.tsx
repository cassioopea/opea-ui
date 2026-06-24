import type { Meta, StoryObj } from '@storybook/react';
import { Toaster, toast } from 'sonner';
import { Button } from '@/ui/button';

const meta = {
  title: 'Primitivos/Sonner',
  component: Toaster,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div>
      <Toaster position="top-right" richColors />
      <Button
        variant="outline"
        onClick={() =>
          toast.success("Transferência enviada com sucesso", {
            description: "O comprovante já está disponível.",
          })
        }
      >
        Lançar Toast de Sucesso
      </Button>
    </div>
  ),
};
