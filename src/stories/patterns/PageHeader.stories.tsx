import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader } from '@/patterns/page-header';

const meta = {
  title: 'Patterns/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {} as any,
  render: () => (
    <PageHeader 
      title="Central de Pagamentos"
      subtitle="Centralize transferências e pagamentos."
    />
  ),
};

export const WithBreadcrumb: Story = {
  args: {} as any,
  render: () => (
    <PageHeader 
      title="Usuários"
      subtitle="Gerencie os usuários do sistema."
      breadcrumb={<span className="flex items-center gap-2">Início <span className="text-muted-foreground">/</span> Usuários</span>}
    />
  ),
};

