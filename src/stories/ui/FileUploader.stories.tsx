import type { Meta, StoryObj } from '@storybook/react';
import { FileUploader } from '@/ui/file-uploader';
import { useState } from 'react';

const meta = {
  title: 'Primitivos/FileUploader',
  component: FileUploader,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof FileUploader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { onFileSelect: () => {} } as any,
  render: function Render() {
    const [file, setFile] = useState<File | null>(null);
    return (
      <div className="w-[400px]">
        <FileUploader
          onFileSelect={(f) => setFile(f)}
        />
        {file && (
          <p className="mt-4 text-sm text-muted-foreground text-center">
            Selecionado: {file.name}
          </p>
        )}
      </div>
    );
  },
};
