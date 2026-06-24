import type { Meta, StoryObj } from '@storybook/react';
import { FilterBar } from '@/patterns/filter-bar';

const meta = {
  title: 'Patterns/FilterBar',
  component: FilterBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    searchValue: "",
    onSearchChange: () => {},
    filters: [{ value: "ALL", onChange: () => {}, options: [{ label: "Todos", value: "ALL" }] }]
  },
};
