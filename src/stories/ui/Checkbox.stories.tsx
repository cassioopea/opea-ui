import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '@/ui/checkbox';
import { Label } from '@/ui/label';

const meta = {
  title: 'Primitivos/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="items-top flex space-x-2">
      <Checkbox id="terms1" />
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor="terms1">Aceitar termos e condições</Label>
        <p className="text-sm text-muted-foreground">
          Você concorda com nossos Termos de Serviço e Política de Privacidade.
        </p>
      </div>
    </div>
  ),
};
