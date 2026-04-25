import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Spinner } from './stubs';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    variant: { control: 'select', options: ['default', 'primary', 'white'] },
    label: { control: 'text' },
    labelPosition: { control: 'radio', options: ['bottom', 'right'] },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Small: Story = {
  args: { size: 'sm' },
};

export const Medium: Story = {
  args: { size: 'md' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const ExtraLarge: Story = {
  args: { size: 'xl' },
};

export const Primary: Story = {
  args: { size: 'lg', variant: 'primary' },
};

export const WithLabel: Story = {
  args: { size: 'lg', variant: 'primary', label: 'Loading...' },
};

export const LabelRight: Story = {
  args: { label: 'Saving changes...', labelPosition: 'right', variant: 'primary' },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  ),
};

export const WithLabels: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-8">
        <Spinner size="sm" label="Loading" />
        <Spinner size="md" label="Loading" />
        <Spinner size="lg" label="Loading" />
      </div>
      <div className="flex flex-col gap-4">
        <Spinner label="Processing..." labelPosition="right" />
        <Spinner label="Please wait..." labelPosition="right" variant="primary" />
      </div>
    </div>
  ),
};

export const FullPage: Story = {
  render: () => (
    <div className="flex items-center justify-center w-96 h-48 bg-gray-50 dark:bg-gray-900 rounded-xl">
      <Spinner size="xl" variant="primary" label="Loading page..." />
    </div>
  ),
};
