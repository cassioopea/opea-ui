import fs from 'fs';
import path from 'path';

const SRC_DIRS = [
  { in: 'src/ui', out: 'src/stories/ui', titlePrefix: 'Primitivos' },
  { in: 'src/patterns', out: 'src/stories/patterns', titlePrefix: 'Patterns' }
];

const workspaceRoot = path.resolve('c:/Users/CassioBarbosa/Development/opea-ui');

SRC_DIRS.forEach(({ in: inDir, out: outDir, titlePrefix }) => {
  const fullInDir = path.resolve(workspaceRoot, inDir);
  const fullOutDir = path.resolve(workspaceRoot, outDir);

  if (!fs.existsSync(fullOutDir)) {
    fs.mkdirSync(fullOutDir, { recursive: true });
  }

  const files = fs.readdirSync(fullInDir).filter(f => f.endsWith('.tsx') && f !== 'index.ts');

  files.forEach(file => {
    const baseName = path.basename(file, '.tsx');
    // Convert kebab-case to PascalCase
    const componentName = baseName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
    
    // Check if story exists (case insensitive to avoid Avatar vs avatar issues)
    const existingStories = fs.readdirSync(fullOutDir);
    const storyExists = existingStories.some(s => s.toLowerCase() === `${baseName.toLowerCase()}.stories.tsx` || s.toLowerCase() === `${componentName.toLowerCase()}.stories.tsx`);
    
    if (storyExists) {
      console.log(`Skipping ${componentName}, story already exists.`);
      return;
    }

    const storyFile = path.join(fullOutDir, `${componentName}.stories.tsx`);

    const template = `import type { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from '@/${inDir.replace('src/', '')}/${baseName}';

const meta = {
  title: '${titlePrefix}/${componentName}',
  component: ${componentName},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ${componentName}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Component default args
  },
};
`;
    fs.writeFileSync(storyFile, template);
    console.log(`Created story for ${componentName}`);
  });
});
