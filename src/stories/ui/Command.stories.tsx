import type { Meta, StoryObj } from '@storybook/react';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/ui/command';
import { Calculator, Calendar, CreditCard, Settings, User } from 'lucide-react';

const meta = {
  title: 'Primitivos/Command',
  component: Command,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Command className="rounded-lg border border-border shadow-md w-[400px]">
      <CommandInput placeholder="Digite um comando ou busque..." />
      <CommandList>
        <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
        <CommandGroup heading="Sugestões">
          <CommandItem>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Agendamentos</span>
          </CommandItem>
          <CommandItem>
            <Calculator className="mr-2 h-4 w-4" />
            <span>Simulador de Taxas</span>
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Configurações">
          <CommandItem>
            <User className="mr-2 h-4 w-4" />
            <span>Perfil</span>
          </CommandItem>
          <CommandItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Limites de Transferência</span>
          </CommandItem>
          <CommandItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Segurança</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};
