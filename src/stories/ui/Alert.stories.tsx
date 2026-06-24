import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertTitle, AlertDescription } from '@/ui/alert';
import { Terminal } from 'lucide-react';

const meta = {
  title: 'Primitivos/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-lg">
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Atenção</AlertTitle>
        <AlertDescription>
          Você não possui limite suficiente para concluir esta transação diurna.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Erro de Conexão</AlertTitle>
        <AlertDescription>
          O sistema de aprovações está indisponível no momento. Tente novamente mais tarde.
        </AlertDescription>
      </Alert>
    </div>
  ),
};
