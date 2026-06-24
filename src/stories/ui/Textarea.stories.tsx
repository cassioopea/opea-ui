import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '@/ui/textarea';
import { Label } from '@/ui/label';

const meta = {
  title: 'Primitivos/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="grid w-[400px] gap-2">
      <Label htmlFor="message-2">Descrição do Lote</Label>
      <Textarea placeholder="Digite uma breve descrição para este lote de pagamentos..." id="message-2" />
      <p className="text-sm text-muted-foreground">
        Esta mensagem será visível para os aprovadores.
      </p>
    </div>
  ),
};
