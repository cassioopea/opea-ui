import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/ui/card';
import { Button } from '@/ui/button';

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Limites de Movimentação</CardTitle>
        <CardDescription>Gerencie o limite diário de transferências da conta corrente.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center border-b border-border/50 pb-2">
            <span className="text-[13px] text-muted-foreground">Limite Diurno</span>
            <span className="text-[14px] font-semibold text-foreground">R$ 250.000,00</span>
          </div>
          <div className="flex justify-between items-center pb-2">
            <span className="text-[13px] text-muted-foreground">Limite Noturno</span>
            <span className="text-[14px] font-semibold text-foreground">R$ 25.000,00</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Solicitar Aumento de Limite</Button>
      </CardFooter>
    </Card>
  ),
};
