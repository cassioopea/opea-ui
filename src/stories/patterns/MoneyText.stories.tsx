import type { Meta, StoryObj } from '@storybook/react';
import { MoneyText } from '@/patterns/money-text';

const meta = {
  title: 'Patterns/MoneyText',
  component: MoneyText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MoneyText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 12500.50,
    size: "lg",
    tone: "default"
  },
};
