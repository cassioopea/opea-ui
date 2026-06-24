import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from '@/ui/calendar';
import { useState } from 'react';

const meta = {
  title: 'Primitivos/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border border-border shadow"
      />
    );
  },
};
