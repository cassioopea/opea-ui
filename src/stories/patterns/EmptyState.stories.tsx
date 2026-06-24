import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from '@/patterns/empty-state';
import { FileSpreadsheet } from 'lucide-react';

const meta = {
  title: 'Patterns/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Nenhum arquivo encontrado",
    description: "Nenhum lote foi importado hoje.",
    icon: <FileSpreadsheet className="w-6 h-6" />
  },
};
