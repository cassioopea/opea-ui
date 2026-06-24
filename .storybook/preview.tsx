import type { Preview } from '@storybook/react-vite';
import React, { useEffect } from 'react';
import '../src/styles/base.css';
import '../src/styles/theme-wine.css';
import '../src/styles/theme-blue.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo'
    }
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'theme-wine',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'theme-wine', title: 'Wine (IB)' },
          { value: 'theme-blue', title: 'Blue (Backoffice)' },
        ],
        dynamicTitle: true,
      },
    },
    colorMode: {
      description: 'Color mode',
      defaultValue: 'light',
      toolbar: {
        title: 'Mode',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const { theme, colorMode } = context.globals;
      
      useEffect(() => {
        const html = document.documentElement;
        html.classList.remove('theme-wine', 'theme-blue', 'dark', 'light');
        html.classList.add(theme);
        if (colorMode === 'dark') {
          html.classList.add('dark');
        }
      }, [theme, colorMode]);

      return (
        <div className="storybook-wrapper p-8">
          <Story />
        </div>
      );
    },
  ],
};

export default preview;