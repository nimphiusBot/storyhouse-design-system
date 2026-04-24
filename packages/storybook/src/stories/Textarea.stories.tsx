import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Textarea } from './stubs';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'filled', 'error', 'success'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    focusRing: { control: 'select', options: ['default', 'none', 'subtle'] },
    placeholder: { control: 'text' },
    label: { control: 'text' },
    error: { control: 'text' },
    helpText: { control: 'text' },
    disabled: { control: 'boolean' },
    resize: { control: 'boolean' },
    autoResize: { control: 'boolean' },
    showCharCount: { control: 'boolean' },
    maxLength: { control: 'number' },
    minRows: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: { placeholder: 'Enter your message...' },
};

export const WithLabel: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter a description...',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Textarea variant="default" label="Default" placeholder="Default textarea" />
      <Textarea variant="filled" label="Filled" placeholder="Filled background" />
      <Textarea variant="success" label="Success" placeholder="Success state" />
      <Textarea variant="error" label="Error" placeholder="Error state" error="This field has an error" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Textarea size="sm" label="Small" placeholder="Small textarea" />
      <Textarea size="md" label="Medium" placeholder="Medium textarea" />
      <Textarea size="lg" label="Large" placeholder="Large textarea" />
    </div>
  ),
};

export const WithHelpText: Story = {
  args: {
    label: 'Bio',
    helpText: 'A short bio about yourself.',
    placeholder: 'Tell us about yourself...',
  },
};

export const WithError: Story = {
  args: {
    label: 'Description',
    error: 'Description is required.',
    placeholder: 'Enter a description...',
  },
};

export const AutoResize: Story = {
  args: {
    label: 'Auto-resizing textarea',
    autoResize: true,
    placeholder: 'Type a lot of text to see auto-resize...',
    minRows: 3,
    maxRows: 10,
  },
};

export const WithCharCount: Story = {
  args: {
    label: 'Limited input',
    showCharCount: true,
    maxLength: 200,
    placeholder: 'Max 200 characters...',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    value: 'This textarea is disabled.',
    disabled: true,
  },
};
