import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/ui/tabs';

const meta = {
  title: 'UI/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="pendentes" className="w-[400px]">
      <TabsList className="w-full grid grid-cols-2">
        <TabsTrigger value="pendentes">Lotes Pendentes</TabsTrigger>
        <TabsTrigger value="processados">Processados</TabsTrigger>
      </TabsList>
      <TabsContent value="pendentes" className="p-4 border border-border rounded-b-xl border-t-0 bg-card">
        <p className="text-[13px] text-muted-foreground text-center py-6">
          Nenhum lote pendente de aprovação no momento.
        </p>
      </TabsContent>
      <TabsContent value="processados" className="p-4 border border-border rounded-b-xl border-t-0 bg-card">
        <p className="text-[13px] text-muted-foreground text-center py-6">
          Aqui aparecerão os lotes já processados.
        </p>
      </TabsContent>
    </Tabs>
  ),
};
