import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from '@/ui/separator';

const meta = {
  title: 'Primitivos/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[300px] p-6 border border-border bg-card rounded-xl">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Minha Conta</h4>
        <p className="text-sm text-muted-foreground">Configurações de agência e conta.</p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Ag 1973</div>
        <Separator orientation="vertical" />
        <div>CC 000123-4</div>
        <Separator orientation="vertical" />
        <div>Opea Tech</div>
      </div>
    </div>
  ),
};
