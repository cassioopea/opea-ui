import type { Meta, StoryObj } from '@storybook/react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/ui/select';

const meta = {
  title: 'Primitivos/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[300px]">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Selecione um banco" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="itau">Itaú (341)</SelectItem>
          <SelectItem value="bradesco">Bradesco (237)</SelectItem>
          <SelectItem value="nubank">Nubank (260)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[300px]">
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Selecione um banco" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="itau">Itaú (341)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <div className="w-[300px]">
      <Select>
        <SelectTrigger aria-invalid="true">
          <SelectValue placeholder="Selecione um banco" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="itau">Itaú (341)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};
