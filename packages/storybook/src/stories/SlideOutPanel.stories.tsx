import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SlideOutPanel, Button } from './stubs';

const meta: Meta<typeof SlideOutPanel> = {
  title: 'Components/SlideOutPanel',
  component: SlideOutPanel,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
  },
};

export default meta;
type Story = StoryObj<typeof SlideOutPanel>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(true);
    return (
      <div className="p-8">
        <Button onClick={() => setIsOpen(true)}>Open Panel</Button>
        <SlideOutPanel
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Settings Panel"
          subtitle="Configure your preferences"
        >
          <div className="space-y-4">
            <p className="text-gray-600">
              This is the slide-out panel content. It can contain any React components, forms, or content.
            </p>
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Example settings content area</p>
            </div>
          </div>
        </SlideOutPanel>
      </div>
    );
  },
};

export const Small: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(true);
    return (
      <div className="p-8">
        <Button onClick={() => setIsOpen(true)}>Open Small Panel</Button>
        <SlideOutPanel
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Small Panel"
          size="sm"
        >
          <p className="text-gray-600">Compact panel for quick actions.</p>
        </SlideOutPanel>
      </div>
    );
  },
};

export const Large: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(true);
    return (
      <div className="p-8">
        <Button onClick={() => setIsOpen(true)}>Open Large Panel</Button>
        <SlideOutPanel
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Large Panel"
          size="lg"
        >
          <p className="text-gray-600">Expanded panel with more space for complex content.</p>
        </SlideOutPanel>
      </div>
    );
  },
};
