import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, RadioGroupItem } from '@/ui/radio-group';
import { Label } from '@/ui/label';

const meta = {
  title: 'Primitivos/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="pix">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="pix" id="r1" />
        <Label htmlFor="r1">Transferência via Pix (Imediato)</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="ted" id="r2" />
        <Label htmlFor="r2">Transferência via TED (Até 17h)</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="tef" id="r3" />
        <Label htmlFor="r3">Transferência entre contas Opea</Label>
      </div>
    </RadioGroup>
  ),
};
