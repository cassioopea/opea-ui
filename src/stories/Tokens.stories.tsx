import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Design System/Tokens',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

export const PaletaETipografia: StoryObj = {
  render: () => (
    <div className="space-y-12">
      <section>
        <h2 className="text-display mb-4">Tipografia</h2>
        <div className="space-y-4 border p-6 rounded-xl border-border bg-card text-card-foreground shadow-card">
          <div><span className="text-display">text-display (28px / 1.75rem)</span></div>
          <div><span className="text-title">text-title (22px / 1.375rem)</span></div>
          <div><span className="text-heading">text-heading (17px / 1.0625rem)</span></div>
          <div><span className="text-subheading">text-subheading (15px / 0.9375rem)</span></div>
          <div><span className="text-body">text-body (14px / 0.875rem)</span></div>
          <div><span className="text-label">text-label (13px / 0.8125rem)</span></div>
          <div><span className="text-caption">text-caption (11px / 0.6875rem)</span></div>
        </div>
      </section>

      <section>
        <h2 className="text-heading mb-4">Cores de Marca (Variáveis com o Tema)</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col gap-2">
            <div className="h-16 rounded-md bg-primary border border-border"></div>
            <span className="text-body font-semibold">Primary</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-16 rounded-md bg-accent border border-border"></div>
            <span className="text-body font-semibold">Accent</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-16 rounded-md bg-ring border border-border"></div>
            <span className="text-body font-semibold">Ring</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-16 rounded-md bg-brand-surface border border-border"></div>
            <span className="text-body font-semibold">Sidebar</span>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-heading mb-4">Cores Neutras (Constantes)</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col gap-2">
            <div className="h-16 rounded-md bg-background border border-border"></div>
            <span className="text-body font-semibold text-foreground">Background</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-16 rounded-md bg-card border border-border"></div>
            <span className="text-body font-semibold text-card-foreground">Card</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-16 rounded-md bg-muted border border-border"></div>
            <span className="text-body font-semibold text-muted-foreground">Muted</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-16 rounded-md bg-destructive border border-border"></div>
            <span className="text-body font-semibold text-destructive-foreground">Destructive</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-16 rounded-md bg-success border border-border"></div>
            <span className="text-body font-semibold text-success-foreground">Success</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-16 rounded-md bg-warning border border-border"></div>
            <span className="text-body font-semibold text-warning-foreground">Warning</span>
          </div>
        </div>
      </section>
    </div>
  ),
};
