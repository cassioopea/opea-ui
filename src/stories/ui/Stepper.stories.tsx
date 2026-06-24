import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from '@/ui/stepper';

const meta = {
  title: 'Primitivos/Stepper',
  component: Stepper,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { steps: [], currentStep: 0 },
  render: () => (
    <div className="w-[600px] p-8 border border-border bg-card rounded-xl">
      <Stepper 
        steps={['Identificação', 'Valor', 'Revisão', 'Comprovante']} 
        currentStep={1} 
      />
    </div>
  ),
};
