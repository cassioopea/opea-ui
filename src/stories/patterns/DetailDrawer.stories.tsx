import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DetailDrawer } from '@/patterns/detail-drawer';
import { Button } from '@/ui/button';
import { Badge } from '@/ui/badge';
import { DataRow } from '@/ui/data-row';

const meta = {
  title: 'Patterns/DetailDrawer',
  component: DetailDrawer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DetailDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

function DrawerDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Abrir Detalhes do Usuário</Button>
      
      <DetailDrawer
        open={open}
        onOpenChange={setOpen}
        title="Detalhes do Usuário"
        description={<Badge tone="success" className="mt-2">Ativo</Badge>}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={() => setOpen(false)}>Salvar alterações</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="rounded-xl border border-border p-4 bg-card shadow-sm space-y-4">
            <h3 className="text-subheading font-medium border-b border-border pb-2">Informações Pessoais</h3>
            <div className="space-y-3">
              <DataRow label="Nome" value="Cassio Barbosa" />
              <DataRow label="E-mail" value="cassio.barbosa@opea.com.br" />
              <DataRow label="Papel" value="Operador N2" />
            </div>
          </div>
          
          <div className="rounded-xl border border-border p-4 bg-card shadow-sm space-y-4">
            <h3 className="text-subheading font-medium border-b border-border pb-2">Segurança</h3>
            <div className="space-y-3">
              <DataRow label="Último login" value="Hoje, 15:30" />
              <DataRow label="Status MFA" value="Habilitado" />
            </div>
          </div>
        </div>
      </DetailDrawer>
    </>
  );
}

export const Default: Story = {
  args: {} as any,
  render: () => <DrawerDemo />
};
