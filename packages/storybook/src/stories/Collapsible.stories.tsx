import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Collapsible } from './stubs';

const meta: Meta<typeof Collapsible> = {
  title: 'Components/Collapsible',
  component: Collapsible,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'card', 'ghost'] },
    defaultOpen: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  render: () => (
    <div className="w-96">
      <Collapsible trigger="Show Details">
        <p>This is the collapsible content. Click the trigger header to toggle visibility.</p>
        <p className="mt-2">You can put any content here — text, forms, lists, etc.</p>
      </Collapsible>
    </div>
  ),
};

export const CardStyle: Story = {
  render: () => (
    <div className="w-96">
      <Collapsible variant="card" trigger="System Information">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Uptime</span>
            <span className="font-mono">24d 12h 33m</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Memory</span>
            <span className="font-mono">6.2 / 16 GB</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">CPU</span>
            <span className="font-mono">23%</span>
          </div>
        </div>
      </Collapsible>
    </div>
  ),
};

export const Ghost: Story = {
  render: () => (
    <div className="w-96">
      <Collapsible variant="ghost" trigger="Advanced Options">
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" /> Enable debug mode
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" /> Verbose logging
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" /> Auto-refresh
          </label>
        </div>
      </Collapsible>
    </div>
  ),
};

export const DefaultOpen: Story = {
  render: () => (
    <div className="w-96">
      <Collapsible defaultOpen trigger="Frequently Asked Questions">
        <div className="space-y-3">
          <div>
            <p className="font-medium text-gray-700 dark:text-gray-300">How do I reset my password?</p>
            <p className="mt-1">Go to Settings → Security → Password Reset.</p>
          </div>
          <div>
            <p className="font-medium text-gray-700 dark:text-gray-300">Can I export my data?</p>
            <p className="mt-1">Yes, visit Settings → Data → Export.</p>
          </div>
        </div>
      </Collapsible>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="w-96 space-y-3">
        <button
          onClick={() => setOpen(!open)}
          className="px-3 py-1.5 text-sm bg-orange-500 text-white rounded-lg"
        >
          {open ? 'Collapse' : 'Expand'}
        </button>
        <Collapsible open={open} onOpenChange={setOpen} trigger="Controlled Panel">
          <p>This collapsible is controlled externally by the button above.</p>
        </Collapsible>
      </div>
    );
  },
};
