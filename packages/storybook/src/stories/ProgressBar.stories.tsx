import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ProgressBar } from './stubs';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    max: { control: 'number' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    variant: { control: 'select', options: ['default', 'success', 'warning', 'error', 'info', 'primary', undefined] },
    showLabel: { control: 'boolean' },
    labelPosition: { control: 'select', options: ['top', 'bottom', 'inline'] },
    showValues: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: { value: 65 },
};

export const WithLabel: Story = {
  args: { value: 65, showLabel: true },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <ProgressBar value={75} size="sm" showLabel labelPosition="top" />
      <ProgressBar value={75} size="md" showLabel labelPosition="top" />
      <ProgressBar value={75} size="lg" showLabel labelPosition="top" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <ProgressBar value={65} variant="default" />
      <ProgressBar value={65} variant="success" />
      <ProgressBar value={65} variant="warning" />
      <ProgressBar value={65} variant="error" />
      <ProgressBar value={65} variant="info" />
      <ProgressBar value={65} variant="primary" />
    </div>
  ),
};

export const Thresholds: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <ProgressBar value={30} thresholds={{ success: 50, warning: 80 }} showLabel />
      <ProgressBar value={65} thresholds={{ success: 50, warning: 80 }} showLabel />
      <ProgressBar value={90} thresholds={{ success: 50, warning: 80 }} showLabel />
    </div>
  ),
};

export const ShowValues: Story = {
  args: {
    value: 234,
    max: 500,
    showValues: true,
    showLabel: true,
  },
};

export const LabelTop: Story = {
  args: {
    value: 72,
    showLabel: true,
    labelPosition: 'top',
  },
};

export const LabelBottom: Story = {
  args: {
    value: 72,
    showLabel: true,
    labelPosition: 'bottom',
  },
};

export const Complete: Story = {
  args: { value: 100, variant: 'success', showLabel: true },
};

export const Empty: Story = {
  args: { value: 0 },
};
