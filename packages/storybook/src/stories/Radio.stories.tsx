import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Radio, RadioGroup, RadioCard } from './stubs';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'primary', 'success', 'error'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    label: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: { label: 'Option A' },
};

export const Checked: Story = {
  args: { label: 'Option A', checked: true },
};

export const WithDescription: Story = {
  args: {
    label: 'Option A',
    description: 'This is a helpful description for this option.',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Radio variant="default" label="Default" />
      <Radio variant="primary" label="Primary" />
      <Radio variant="success" label="Success" />
      <Radio variant="error" label="Error" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Radio size="sm" label="Small" />
      <Radio size="md" label="Medium" />
      <Radio size="lg" label="Large" />
    </div>
  ),
};

export const RadioOnly: Story = {
  args: { 'aria-label': 'Radio without label' },
};

export const Disabled: Story = {
  args: { label: 'Disabled option', disabled: true },
};

export const ErrorState: Story = {
  args: {
    label: 'Option A',
    error: 'Please select a valid option.',
  },
};

export const RadioGroupExample: Story = {
  render: () => {
    const [selected, setSelected] = useState('free');

    return (
      <RadioGroup
        label="Select a plan"
        description="Choose the best plan for your needs."
        name="plan"
        value={selected}
        onChange={setSelected}
      >
        <Radio value="free" label="Free" description="Basic features for personal use" />
        <Radio value="pro" label="Pro" description="Advanced features for professionals" />
        <Radio value="enterprise" label="Enterprise" description="Custom solutions for teams" />
      </RadioGroup>
    );
  },
};

export const RadioCardExample: Story = {
  render: () => {
    const [selected, setSelected] = useState('basic');

    return (
      <div className="flex flex-col gap-3 w-80">
        <p className="text-sm font-medium text-gray-700">Billing Plan</p>
        <RadioCard
          title="Basic"
          description="$10/mo - Essential features"
          name="billing"
          value="basic"
          checked={selected === 'basic'}
          onChange={() => setSelected('basic')}
        />
        <RadioCard
          title="Pro"
          description="$29/mo - Full access to all features"
          name="billing"
          value="pro"
          checked={selected === 'pro'}
          onChange={() => setSelected('pro')}
        />
        <RadioCard
          title="Enterprise"
          description="$99/mo - Custom solutions and support"
          name="billing"
          value="enterprise"
          checked={selected === 'enterprise'}
          onChange={() => setSelected('enterprise')}
        />
      </div>
    );
  },
};
