import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DataTable, type DataTableColumn, DataTablePagination } from '@/patterns/data-table';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { MoreHorizontal } from 'lucide-react';

const meta = {
  title: 'Patterns/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

interface User {
  id: string;
  name: string;
  email: string;
  amount: number;
  status: 'Ativo' | 'Pendente' | 'Inativo';
}

const data: User[] = [
  { id: '1', name: 'Jonathan Santos', email: 'jonathan@example.com', amount: 1500.5, status: 'Ativo' },
  { id: '2', name: 'Maria Silva', email: 'maria@example.com', amount: 320.0, status: 'Pendente' },
  { id: '3', name: 'Carlos Ferreira', email: 'carlos@example.com', amount: 45000.75, status: 'Ativo' },
  { id: '4', name: 'Ana Oliveira', email: 'ana@example.com', amount: 0.0, status: 'Inativo' },
  { id: '5', name: 'Roberto Justus', email: 'roberto@example.com', amount: 125000.0, status: 'Ativo' },
];

const columns: DataTableColumn<User>[] = [
  {
    key: 'name',
    header: 'Nome',
    cell: (row) => <span className="font-medium">{row.name}</span>,
  },
  {
    key: 'email',
    header: 'E-mail',
    cell: (row) => row.email,
  },
  {
    key: 'status',
    header: 'Status',
    cell: (row) => (
      <Badge variant={row.status === 'Ativo' ? 'default' : row.status === 'Pendente' ? 'secondary' : 'destructive'}>
        {row.status}
      </Badge>
    ),
  },
  {
    key: 'amount',
    header: 'Valor',
    align: 'right',
    numeric: true,
    cell: (row) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(row.amount),
  },
  {
    key: 'actions',
    header: '',
    align: 'center',
    width: 60,
    cell: () => (
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    ),
  },
];

export const DashboardComfortable: Story = {
  args: {} as any,
  render: () => (
    <DataTable
      columns={columns}
      data={data}
      getRowId={(r) => r.id}
      density="comfortable"
      hoverable
    />
  ),
};

export const BackofficeCompactStriped: Story = {
  args: {} as any,
  render: () => (
    <DataTable
      columns={columns}
      data={data.concat(data).concat(data)} // make it longer to show sticky header
      getRowId={(r) => r.id + Math.random()} // avoid key clash for demo
      density="compact"
      striped
      size="sm"
      stickyHeader
      tableClassName="max-h-[300px]"
    />
  ),
};

export const ApprovalsSelectable: Story = {
  args: {} as any,
  render: function Render() {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <DataTable
        columns={columns}
        data={data}
        getRowId={(r) => r.id}
        selectable
        selectedIds={selected}
        onSelectionChange={setSelected}
        bordered="rows"
        header={
          <div className="p-4 border-b border-border flex items-center justify-between bg-muted/20">
            <h3 className="font-semibold">Aprovações Pendentes</h3>
            <span className="text-sm text-muted-foreground">{selected.length} selecionados</span>
          </div>
        }
      />
    );
  }
};

export const LoadingState: Story = {
  args: {} as any,
  render: () => (
    <DataTable
      columns={columns}
      data={[]}
      getRowId={(r) => r.id}
      loading
    />
  ),
};

export const EmptyState: Story = {
  args: {} as any,
  render: () => (
    <DataTable
      columns={columns}
      data={[]}
      getRowId={(r) => r.id}
      emptyState={
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
            <span className="text-2xl text-muted-foreground">📁</span>
          </div>
          <h3 className="text-lg font-semibold text-foreground">Nenhum dado encontrado</h3>
          <p className="text-sm text-muted-foreground max-w-sm mt-1">
            Não existem registros para exibir com os filtros atuais.
          </p>
        </div>
      }
    />
  ),
};

export const WithPagination: Story = {
  args: {} as any,
  render: () => (
    <DataTable
      columns={columns}
      data={data}
      getRowId={(r) => r.id}
      footer={
        <DataTablePagination
          page={1}
          pageSize={10}
          total={100}
          onPageChange={(page) => console.log('Page changed to', page)}
        />
      }
    />
  ),
};
