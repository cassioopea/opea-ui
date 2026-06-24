import type { Meta, StoryObj } from '@storybook/react';
// Opea Chart UI wrapper relies on Recharts
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/ui/chart';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const meta = {
  title: 'Primitivos/Chart',
  component: ChartContainer,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ChartContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

const data = [
  { name: 'Jan', total: 1500 },
  { name: 'Fev', total: 2300 },
  { name: 'Mar', total: 3400 },
];

export const Default: Story = {
  args: {} as any,
  render: () => (
    <div className="w-[400px] h-[300px]">
      <ChartContainer
        config={{
          total: {
            label: "Total Recebido",
            color: "hsl(var(--primary))",
          },
        }}
        className="w-full h-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `R$${value}`} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="total" fill="var(--color-total)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  ),
};
