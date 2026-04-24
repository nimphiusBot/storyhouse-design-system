import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ToggleSwitch } from './stubs';

const meta: Meta<typeof ToggleSwitch> = {
  title: 'Components/ToggleSwitch',
  component: ToggleSwitch,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof ToggleSwitch>;

export const Off: Story = {
  args: { checked: false },
};

export const On: Story = {
  args: { checked: true },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500 w-16">Small</span>
        <ToggleSwitch checked size="sm" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500 w-16">Medium</span>
        <ToggleSwitch checked size="md" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500 w-16">Large</span>
        <ToggleSwitch checked size="lg" />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: { checked: true, disabled: true },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500 w-24">Off</span>
        <ToggleSwitch checked={false} />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500 w-24">On</span>
        <ToggleSwitch checked />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500 w-24">Disabled off</span>
        <ToggleSwitch checked={false} disabled />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500 w-24">Disabled on</span>
        <ToggleSwitch checked disabled />
      </div>
    </div>
  ),
};
