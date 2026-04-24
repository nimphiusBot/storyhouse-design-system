import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SlidePanel, Button } from '@storyhouse/components';

const meta: Meta<typeof SlidePanel> = {
  title: 'Components/SlidePanel',
  component: SlidePanel,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SlidePanel>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <div className="p-8">
          <Button onClick={() => setIsOpen(true)}>Open Slide Panel</Button>
        </div>
        <SlidePanel
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Settings"
          subtitle="Manage your preferences"
        >
          <p className="text-gray-600 dark:text-gray-400">
            Panel content goes here. This panel has a title and subtitle.
          </p>
        </SlidePanel>
      </>
    );
  },
};

export const WithFooter: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <div className="p-8">
          <Button onClick={() => setIsOpen(true)}>Open Panel with Footer</Button>
        </div>
        <SlidePanel
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Confirm Changes"
          description="Review your changes before saving."
          footer={
            <div className="flex justify-end gap-3">
              <Button variant="secondary" onClick={() => {}}>Cancel</Button>
              <Button onClick={() => {}}>Save</Button>
            </div>
          }
        >
          <p className="text-gray-600 dark:text-gray-400">
            This panel has a footer with action buttons.
          </p>
        </SlidePanel>
      </>
    );
  },
};

export const LeftPosition: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <div className="p-8">
          <Button onClick={() => setIsOpen(true)}>Open from Left</Button>
        </div>
        <SlidePanel
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Navigation"
          position="left"
        >
          <nav className="space-y-2">
            <a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">Dashboard</a>
            <a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">Projects</a>
            <a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">Settings</a>
          </nav>
        </SlidePanel>
      </>
    );
  },
};

export const LargeSize: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <div className="p-8">
          <Button onClick={() => setIsOpen(true)}>Open Large Panel</Button>
        </div>
        <SlidePanel
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Large Panel"
          size="lg"
        >
          <p className="text-gray-600 dark:text-gray-400">
            This panel uses the &quot;lg&quot; size variant for more content space.
          </p>
        </SlidePanel>
      </>
    );
  },
};
