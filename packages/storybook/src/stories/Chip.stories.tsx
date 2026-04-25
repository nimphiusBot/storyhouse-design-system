import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Chip } from './stubs';
import { Star, Filter } from 'lucide-react';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'primary', 'success', 'warning', 'danger', 'outline'] },
    size: { control: 'select', options: ['sm', 'md'] },
    removable: { control: 'boolean' },
    dot: { control: 'boolean' },
    interactive: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: { children: 'Default Chip' },
};

export const Primary: Story = {
  args: { variant: 'primary', children: 'Primary' },
};

export const Success: Story = {
  args: { variant: 'success', children: 'Active' },
};

export const Warning: Story = {
  args: { variant: 'warning', children: 'Pending' },
};

export const Danger: Story = {
  args: { variant: 'danger', children: 'Failed' },
};

export const Outline: Story = {
  args: { variant: 'outline', children: 'Outline' },
};

export const WithDot: Story = {
  args: { variant: 'success', dot: true, children: 'Online' },
};

export const WithIcon: Story = {
  args: { variant: 'primary', icon: <Star className="h-3 w-3" />, children: 'Featured' },
};

export const Removable: Story = {
  render: () => {
    const [tags, setTags] = useState(['React', 'TypeScript', 'Tailwind']);
    return (
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Chip
            key={tag}
            variant="primary"
            removable
            onRemove={() => setTags((prev) => prev.filter((t) => t !== tag))}
          >
            {tag}
          </Chip>
        ))}
        {tags.length === 0 && (
          <span className="text-sm text-gray-400">All removed</span>
        )}
      </div>
    );
  },
};

export const Interactive: Story = {
  render: () => {
    const [count, setCount] = useState(0);
    return (
      <div className="flex items-center gap-3">
        <Chip variant="outline" interactive onClick={() => setCount((c) => c + 1)}>
          <span className="flex items-center gap-1">
            <Filter className="h-3 w-3" />
            Add Filter
          </span>
        </Chip>
        <span className="text-sm text-gray-500">Clicked {count} times</span>
      </div>
    );
  },
};

export const Small: Story = {
  args: { size: 'sm', children: 'Small Chip' },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip>Default</Chip>
      <Chip variant="primary">Primary</Chip>
      <Chip variant="success">Success</Chip>
      <Chip variant="warning">Warning</Chip>
      <Chip variant="danger">Danger</Chip>
      <Chip variant="outline">Outline</Chip>
    </div>
  ),
};

export const WithDotIndicators: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip variant="success" dot>Active</Chip>
      <Chip variant="warning" dot>Away</Chip>
      <Chip variant="danger" dot>Offline</Chip>
      <Chip variant="default" dot>Idle</Chip>
    </div>
  ),
};
