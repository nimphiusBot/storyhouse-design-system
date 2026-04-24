import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Checkbox, CheckboxGroup } from './stubs';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'primary', 'success', 'error'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    label: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: { label: 'Accept terms and conditions' },
};

export const Checked: Story = {
  args: { label: 'Accept terms and conditions', checked: true },
};

export const WithDescription: Story = {
  args: {
    label: 'Subscribe to newsletter',
    description: 'Receive weekly updates and product announcements.',
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Select all items',
    indeterminate: true,
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox variant="default" label="Default" />
      <Checkbox variant="primary" label="Primary" />
      <Checkbox variant="success" label="Success" />
      <Checkbox variant="error" label="Error" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox size="sm" label="Small" />
      <Checkbox size="md" label="Medium" />
      <Checkbox size="lg" label="Large" />
    </div>
  ),
};

export const CheckboxOnly: Story = {
  args: { 'aria-label': 'Checkbox without label' },
};

export const Disabled: Story = {
  args: { label: 'Disabled checkbox', disabled: true, checked: true },
};

export const ErrorState: Story = {
  args: {
    label: 'I agree to the terms',
    error: 'You must agree to the terms to continue.',
  },
};

export const CheckboxGroupExample: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);

    const toggle = (value: string) => {
      setSelected((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value]
      );
    };

    return (
      <CheckboxGroup label="Select your interests" description="Choose all that apply.">
        <Checkbox
          label="Technology"
          checked={selected.includes('tech')}
          onChange={() => toggle('tech')}
        />
        <Checkbox
          label="Design"
          checked={selected.includes('design')}
          onChange={() => toggle('design')}
        />
        <Checkbox
          label="Business"
          checked={selected.includes('business')}
          onChange={() => toggle('business')}
        />
      </CheckboxGroup>
    );
  },
};
