import type { Meta, StoryObj } from '@storybook/react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/ui/carousel';

const meta = {
  title: 'Primitivos/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[300px]">
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <div className="p-1">
              <div className="flex aspect-square items-center justify-center rounded-xl border border-border bg-card p-6">
                <span className="text-4xl font-semibold">1</span>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="p-1">
              <div className="flex aspect-square items-center justify-center rounded-xl border border-border bg-card p-6">
                <span className="text-4xl font-semibold">2</span>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};
