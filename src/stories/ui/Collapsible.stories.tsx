import type { Meta, StoryObj } from '@storybook/react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/ui/collapsible';
import { Button } from '@/ui/button';
import { ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

const meta = {
  title: 'Primitivos/Collapsible',
  component: Collapsible,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-[350px] space-y-2 border border-border p-4 rounded-xl bg-card"
      >
        <div className="flex items-center justify-between space-x-4">
          <h4 className="text-sm font-semibold">
            @pedro adicionou 3 novos favorecidos
          </h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <div className="rounded-md border border-border px-4 py-3 font-mono text-sm">
          João da Silva - Itaú (341)
        </div>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border border-border px-4 py-3 font-mono text-sm">
            Maria Oliveira - Bradesco (237)
          </div>
          <div className="rounded-md border border-border px-4 py-3 font-mono text-sm">
            Empresa X - Santander (033)
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};
