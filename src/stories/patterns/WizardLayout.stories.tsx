import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { WizardLayout } from '@/patterns/wizard-layout';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';

const meta = {
  title: 'Patterns/WizardLayout',
  component: WizardLayout,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WizardLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

function WizardDemo() {
  const [step, setStep] = useState(0);

  const steps = [
    { id: "1", label: "Dados Pessoais", description: "Informações básicas" },
    { id: "2", label: "Endereço", description: "Localização atual" },
    { id: "3", label: "Revisão", description: "Confirme os dados" },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <WizardLayout
        title="Novo Cadastro"
        steps={steps}
        currentStepIndex={step}
        footer={
          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
            >
              Voltar
            </Button>
            <Button 
              onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
            >
              {step === steps.length - 1 ? 'Finalizar' : 'Avançar'}
            </Button>
          </div>
        }
      >
        <div className="space-y-6">
          <h3 className="text-title font-medium">{steps[step].label}</h3>
          
          {step === 0 && (
            <div className="grid gap-4 max-w-sm">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input id="name" placeholder="Ex: Cassio Barbosa" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="cassio@opea.com.br" />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-4 max-w-sm">
              <div className="space-y-2">
                <Label htmlFor="cep">CEP</Label>
                <Input id="cep" placeholder="00000-000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Logradouro</Label>
                <Input id="address" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="rounded-lg bg-muted/20 p-4 border border-border">
              <p className="text-body text-muted-foreground">Revise os dados inseridos e clique em Finalizar.</p>
            </div>
          )}
        </div>
      </WizardLayout>
    </div>
  );
}

export const Default: Story = {
  args: {} as any,
  render: () => <WizardDemo />
};
