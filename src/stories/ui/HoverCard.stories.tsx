import type { Meta, StoryObj } from '@storybook/react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/ui/hover-card';
import { Button } from '@/ui/button';

const meta = {
  title: 'Primitivos/HoverCard',
  component: HoverCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@opea-fintech</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Opea Fintech</h4>
            <p className="text-sm">
              Plataforma de Internet Banking SCD.
            </p>
            <div className="flex items-center pt-2">
              <span className="text-xs text-muted-foreground">
                Último acesso em Dez 2026
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};
