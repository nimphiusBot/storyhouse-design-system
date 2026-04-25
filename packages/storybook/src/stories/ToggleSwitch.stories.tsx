import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
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
    label: { control: 'text' },
    ariaLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ToggleSwitch>;

export const Off: Story = {
  args: { checked: false, ariaLabel: 'Toggle switch' },
};

export const On: Story = {
  args: { checked: true, ariaLabel: 'Toggle switch' },
};

export const WithLabel: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <ToggleSwitch
        checked={checked}
        onChange={setChecked}
        label="Enable notifications"
      />
    );
  },
};

export const WithLabelOn: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);
    return (
      <ToggleSwitch
        checked={checked}
        onChange={setChecked}
        label="Dark mode"
      />
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex items-center gap-4">
        <ToggleSwitch checked size="sm" ariaLabel="Small toggle" />
        <span className="text-sm text-gray-500">Small</span>
      </div>
      <div className="flex items-center gap-4">
        <ToggleSwitch checked size="md" ariaLabel="Medium toggle" />
        <span className="text-sm text-gray-500">Medium</span>
      </div>
      <div className="flex items-center gap-4">
        <ToggleSwitch checked size="lg" ariaLabel="Large toggle" />
        <span className="text-sm text-gray-500">Large</span>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: { checked: true, disabled: true, ariaLabel: 'Disabled toggle' },
};

export const DisabledWithLabel: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="flex flex-col gap-4">
        <ToggleSwitch
          checked={checked}
          onChange={setChecked}
          label="Feature flag (disabled)"
          disabled
        />
        <ToggleSwitch
          checked={true}
          onChange={setChecked}
          label="Dark mode (disabled, on)"
          disabled
        />
      </div>
    );
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-center">
      <ToggleSwitch checked={false} label="Off" />
      <ToggleSwitch checked label="On" />
      <ToggleSwitch checked={false} disabled label="Disabled off" />
      <ToggleSwitch checked disabled label="Disabled on" />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <ToggleSwitch
        checked={checked}
        onChange={setChecked}
        label="Toggle me"
      />
    );
  },
};
