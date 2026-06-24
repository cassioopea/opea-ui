import type { Meta, StoryObj } from '@storybook/react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/ui/resizable';

const meta = {
  title: 'Primitivos/Resizable',
  component: ResizablePanelGroup,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ResizablePanelGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {} as any,
  render: () => (
    <div className="h-[200px] w-[500px] rounded-xl border border-border bg-card">
      {/* @ts-ignore */}
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={30} className="p-4 flex items-center justify-center">
          <span className="font-semibold">Sidebar</span>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={70} className="p-4 flex items-center justify-center">
          <span className="font-semibold">Content</span>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};
