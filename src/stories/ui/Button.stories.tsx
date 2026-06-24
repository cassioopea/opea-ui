import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/ui/button';
import { ArrowRight, Mail } from 'lucide-react';

const meta = {
  title: 'Primitivos/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variantes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <Button variant="default">Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
    </div>
  ),
};

export const Tamanhos: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Button size="lg">Large</Button>
      <Button size="default">Default</Button>
      <Button size="sm">Small</Button>
      <Button size="icon"><Mail className="w-4 h-4" /></Button>
    </div>
  ),
};

export const Estados: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Button variant="default">Ativo</Button>
      <Button variant="default" disabled>Desabilitado</Button>
      <Button variant="default" className="cursor-wait opacity-80" disabled>Carregando...</Button>
    </div>
  ),
};

export const ComIcones: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Button variant="default">
        <Mail className="w-4 h-4 mr-2" /> E-mail
      </Button>
      <Button variant="secondary">
        Avançar <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  ),
};
