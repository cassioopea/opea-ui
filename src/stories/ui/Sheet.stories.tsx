import type { Meta, StoryObj } from '@storybook/react';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/ui/sheet';
import { Button } from '@/ui/button';

const meta = {
  title: 'Primitivos/Sheet',
  component: Sheet,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Abrir Menu Lateral</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editar Perfil</SheetTitle>
          <SheetDescription>
            Faça alterações no seu perfil aqui. Clique em salvar quando terminar.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <div className="h-[200px] border border-dashed rounded-md flex items-center justify-center text-muted-foreground">
            Formulário Exemplo
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ),
};
