import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Skeleton } from './stubs';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    rounded: { control: 'select', options: ['none', 'sm', 'md', 'lg', 'full'] },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: { className: 'h-4 w-48' },
};

export const Circle: Story = {
  args: { className: 'h-12 w-12', rounded: 'full' },
};

export const Card: Story = {
  render: () => (
    <div className="w-72 space-y-4 rounded-xl border border-gray-200 p-4 dark:border-gray-800">
      <Skeleton className="h-40 w-full" rounded="md" />
      <div className="space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton count={3} />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-8 w-20" rounded="md" />
        <Skeleton className="h-8 w-20" rounded="md" />
      </div>
    </div>
  ),
};

export const AvatarWithText: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton className="h-12 w-12" rounded="full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-48" />
      </div>
    </div>
  ),
};

export const TextBlock: Story = {
  render: () => (
    <div className="w-96 space-y-2">
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  ),
};

export const List: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="h-8 w-8" rounded="full" />
          <div className="flex-1 space-y-1">
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-2 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Table: Story = {
  render: () => (
    <div className="w-full space-y-3">
      <div className="flex gap-4 pb-3 border-b border-gray-200 dark:border-gray-800">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-28" />
      </div>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex gap-4">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-28" />
        </div>
      ))}
    </div>
  ),
};

export const MultipleLines: Story = {
  args: { count: 4, className: 'w-full' },
};
