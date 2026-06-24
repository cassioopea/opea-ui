import type { Meta, StoryObj } from '@storybook/react';
import { BaseModal } from '@/ui/base-modal';
import { Button } from '@/ui/button';
import { useState } from 'react';

const meta = {
  title: 'Primitivos/BaseModal',
  component: BaseModal,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof BaseModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {} as any,
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Abrir Modal Customizado</Button>
        <BaseModal open={open} onOpenChange={setOpen} title="Transferência Enviada">
          <div className="p-6 flex flex-col gap-4 text-center">
            <p className="text-muted-foreground text-sm">Sua transferência foi agendada para amanhã.</p>
            <Button onClick={() => setOpen(false)} className="mt-4">Entendi</Button>
          </div>
        </BaseModal>
      </>
    );
  },
};
