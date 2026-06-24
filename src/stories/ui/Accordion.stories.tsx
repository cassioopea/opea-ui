import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/ui/accordion';

const meta = {
  title: 'UI/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {} as any,
  render: () => (
    <div className="w-[500px]">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Como cadastro um novo favorecido?</AccordionTrigger>
          <AccordionContent>
            Para transferências via TED, é obrigatório cadastrar o favorecido previamente. Acesse a aba Favorecidos e clique em "Novo Favorecido".
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Qual o horário limite para TED?</AccordionTrigger>
          <AccordionContent>
            Transferências via TED podem ser enviadas até as 17:00 (Horário de Brasília) em dias úteis. Fora desse horário, utilize o Pix.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Como aprovar lotes de pagamento?</AccordionTrigger>
          <AccordionContent>
            Vá até o menu de Aprovações e selecione os lotes pendentes. Você precisará informar seu PIN transacional para confirmar a aprovação em lote.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};
