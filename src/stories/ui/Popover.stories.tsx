import type { Meta, StoryObj } from '@storybook/react';
import { Popover, PopoverTrigger, PopoverContent } from '@/ui/popover';
import { Button } from '@/ui/button';

const meta = {
  title: 'Primitivos/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Filtros Avançados</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Filtros</h4>
            <p className="text-sm text-muted-foreground">
              Ajuste as datas para filtrar os lançamentos.
            </p>
          </div>
          <div className="grid gap-2">
            {/* Popover content example */}
            <div className="text-sm font-semibold text-muted-foreground p-4 text-center border border-dashed rounded-md">
              Conteúdo customizado
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
