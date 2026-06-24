import type { Meta, StoryObj } from '@storybook/react';
import { AccountSelector } from '@/patterns/account-selector';

const meta = {
  title: 'Patterns/AccountSelector',
  component: AccountSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AccountSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "1",
    onChange: () => {},
    options: [
      { id: "1", title: "Conta Principal", subtitle: "Ag 0001 · CC 1234" },
      { id: "2", title: "Reserva", subtitle: "Ag 0001 · CC 5678" }
    ]
  },
};
