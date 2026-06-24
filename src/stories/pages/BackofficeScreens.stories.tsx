import type { Meta } from '@storybook/react';
import { useState } from 'react';
import { AppShell } from '@/patterns/app-shell';
import { PageHeader } from '@/patterns/page-header';
import { DataTable, DataTablePagination } from '@/patterns/data-table';
import { WizardLayout } from '@/patterns/wizard-layout';
import { DetailDrawer } from '@/patterns/detail-drawer';
import { Toolbar, SearchInput } from '@/patterns/toolbar';
import { SurfaceCard } from '@/patterns/surface-card';
import { Button } from '@/ui/button';
import { Badge } from '@/ui/badge';
import { DataRow } from '@/ui/data-row';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { Plus, Download, MoreHorizontal, UserCheck, Shield } from 'lucide-react';

const meta = {
  title: 'Pages/BackofficeScreens',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

// Mock data & Shell Config
const appShellProps = {
  user: { name: "Cassio Barbosa", initials: "CB", email: "cassio.barbosa@opea.com.br", role: "Operador N2" },
  environment: { name: "prod", label: "Produção", options: ["Produção", "Staging", "Sandbox"] },
  navigation: [
    { label: "Início", href: "/", isActive: false },
    { 
      label: "Cadastro", 
      isActive: true,
      children: [
        { href: "/cadastro", label: "Visão geral", description: "Hub com as 4 etapas" },
        { href: "/cadastro/empresas", label: "Empresas", description: "CNPJs, times e endereços" },
        { href: "/cadastro/usuarios", label: "Usuários", description: "Gerencie permissões", isActive: true }
      ]
    },
    {
      label: "Acesso",
      children: [
        { href: "/grupos", label: "Grupos de permissões" },
      ]
    }
  ],
  actions: <Button size="sm" variant="secondary" className="bg-brand-surface-foreground/10 text-brand-surface-foreground hover:bg-brand-surface-foreground/20">Novo cadastro</Button>
};

export const TelaContas_DetailDrawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [search, setSearch] = useState("");

  const users = [
    { id: '1', name: 'Ana Silva', email: 'ana@empresa.com', status: 'Ativo', role: 'Admin' },
    { id: '2', name: 'Carlos Santos', email: 'carlos@empresa.com', status: 'Pendente', role: 'Visualizador' },
  ];

  return (
    <AppShell {...appShellProps}>
      <PageHeader 
        title="Usuários" 
        subtitle="Gerencie as pessoas que possuem acesso ao sistema."
        breadcrumb={<span className="flex items-center gap-2">Início <span className="text-muted-foreground">/</span> Cadastro <span className="text-muted-foreground">/</span> Usuários</span>}
        actions={
          <>
            <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Exportar</Button>
            <Button><Plus className="mr-2 h-4 w-4" /> Adicionar usuário</Button>
          </>
        }
      />

      <Toolbar>
        <SearchInput 
          placeholder="Buscar por nome ou e-mail..." 
          className="w-[300px]" 
          value={search}
          onValueChange={setSearch}
        />
        <div className="flex-1" />
        <Button variant="outline" size="sm">Filtrar por Status</Button>
      </Toolbar>

      <DataTable
        data={users}
        getRowId={(r) => r.id}
        selectable
        onRowClick={(user) => {
          setSelectedUser(user);
          setDrawerOpen(true);
        }}
        columns={[
          { key: 'name', header: 'Nome', cell: (r) => <span className="font-medium">{r.name}</span> },
          { key: 'email', header: 'E-mail', cell: (r) => r.email },
          { key: 'role', header: 'Papel', cell: (r) => <Badge variant="secondary">{r.role}</Badge> },
          { 
            key: 'status', 
            header: 'Status', 
            cell: (r) => <Badge tone={r.status === 'Ativo' ? 'success' : 'warning'}>{r.status}</Badge> 
          },
          { 
            key: 'actions', 
            header: '', 
            align: 'right', 
            cell: () => <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button> 
          }
        ]}
        footer={<DataTablePagination page={1} pageSize={10} total={2} onPageChange={() => {}} />}
      />

      <DetailDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        title={selectedUser?.name || "Detalhes"}
        description={selectedUser?.email}
        footer={
          <div className="flex justify-between w-full">
            <Button variant="destructive" size="sm">Bloquear Acesso</Button>
            <Button size="sm">Editar Perfil</Button>
          </div>
        }
      >
        {selectedUser && (
          <div className="space-y-6">
             <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card">
               <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                 {selectedUser.name.charAt(0)}
               </div>
               <div>
                 <p className="font-semibold">{selectedUser.name}</p>
                 <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
               </div>
               <Badge className="ml-auto" tone={selectedUser.status === 'Ativo' ? 'success' : 'warning'}>{selectedUser.status}</Badge>
             </div>

             <SurfaceCard padding="sm">
               <h3 className="font-semibold border-b pb-2 mb-3">Permissões de Sistema</h3>
               <div className="space-y-3">
                 <DataRow label="Nível de Acesso" value={<Badge variant="secondary">{selectedUser.role}</Badge>} />
                 <DataRow label="Último Login" value="Hoje, 10:43" />
                 <DataRow label="Autenticação em 2 Passos" value="Habilitada" />
               </div>
             </SurfaceCard>
          </div>
        )}
      </DetailDrawer>
    </AppShell>
  );
};

export const TelaCadastro_Wizard = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { id: "1", label: "Dados da Empresa", description: "CNPJ e Razão Social" },
    { id: "2", label: "Representantes", description: "Quem assina pela empresa" },
    { id: "3", label: "Contas Vinculadas", description: "Dados bancários" },
  ];

  return (
    <AppShell {...appShellProps}>
      <PageHeader 
        title="Novo Cadastro" 
        subtitle="Inicie a inserção de um novo cedente ou investidor."
        breadcrumb={<span className="flex items-center gap-2">Início <span className="text-muted-foreground">/</span> Cadastro <span className="text-muted-foreground">/</span> Novo</span>}
      />
      
      <WizardLayout
        title="Nova Empresa"
        steps={steps}
        currentStepIndex={step}
        footer={
          <div className="flex justify-between items-center w-full">
            <Button variant="outline" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
              Voltar Passo
            </Button>
            <Button onClick={() => setStep(Math.min(steps.length - 1, step + 1))}>
              {step === steps.length - 1 ? 'Concluir Cadastro' : 'Salvar e Avançar'}
            </Button>
          </div>
        }
      >
        <div className="max-w-xl">
          <h3 className="text-title font-semibold mb-6">{steps[step].label}</h3>
          
          {step === 0 && (
            <div className="space-y-5">
              <div className="space-y-2">
                <Label>CNPJ</Label>
                <Input placeholder="00.000.000/0000-00" />
              </div>
              <div className="space-y-2">
                <Label>Razão Social</Label>
                <Input placeholder="Empresa S.A." />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="p-10 border border-dashed border-border rounded-xl flex flex-col items-center justify-center text-center">
              <UserCheck className="h-10 w-10 text-muted-foreground mb-4" />
              <h4 className="font-semibold">Nenhum representante adicionado</h4>
              <p className="text-sm text-muted-foreground mt-1 mb-4">Você precisa adicionar pelo menos uma pessoa autorizada.</p>
              <Button variant="secondary"><Plus className="mr-2 h-4 w-4" /> Adicionar Representante</Button>
            </div>
          )}

          {step === 2 && (
            <div className="p-4 rounded-xl border border-warning/30 bg-warning/5 text-warning flex gap-3">
              <Shield className="h-5 w-5 shrink-0" />
              <div>
                <p className="font-semibold text-sm">Contas serão vinculadas após a aprovação</p>
                <p className="text-sm opacity-80 mt-1">Este passo é opcional neste momento e pode ser feito pela equipe de tesouraria.</p>
              </div>
            </div>
          )}
        </div>
      </WizardLayout>
    </AppShell>
  );
};
