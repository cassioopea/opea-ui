import type { Meta, StoryObj } from '@storybook/react';
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator, MenubarShortcut } from '@/ui/menubar';

const meta = {
  title: 'Primitivos/Menubar',
  component: Menubar,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Menubar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Arquivo</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Novo Lote <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Importar CNAB <MenubarShortcut>⌘O</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Imprimir Relatório</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Visualizar</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Modo Privacidade</MenubarItem>
          <MenubarItem>Ocultar Saldos</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};
