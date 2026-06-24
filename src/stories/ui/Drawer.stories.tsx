import type { Meta, StoryObj } from '@storybook/react';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from '@/ui/drawer';
import { Button } from '@/ui/button';

const meta = {
  title: 'Primitivos/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Abrir Gaveta Bottom</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Comprovante de Pix</DrawerTitle>
            <DrawerDescription>Selecione a ação desejada para o comprovante.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0 flex flex-col gap-4">
            <Button variant="secondary" className="w-full">Compartilhar no WhatsApp</Button>
            <Button variant="secondary" className="w-full">Salvar em PDF</Button>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  ),
};
