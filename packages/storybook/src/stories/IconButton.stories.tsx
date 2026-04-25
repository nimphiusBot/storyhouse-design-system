import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { IconButton } from './stubs';
import { X, Pencil, Trash2, Settings, Plus, Bell } from 'lucide-react';

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['solid', 'outline', 'ghost'] },
    color: { control: 'select', options: ['default', 'primary', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    isLoading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const GhostDefault: Story = {
  args: { 'aria-label': 'Close', icon: <X />, variant: 'ghost', color: 'default' },
};

export const SolidPrimary: Story = {
  args: { 'aria-label': 'Settings', icon: <Settings />, variant: 'solid', color: 'primary' },
};

export const OutlineDefault: Story = {
  args: { 'aria-label': 'Edit', icon: <Pencil />, variant: 'outline', color: 'default' },
};

export const Danger: Story = {
  args: { 'aria-label': 'Delete', icon: <Trash2 />, variant: 'ghost', color: 'danger' },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      <div className="flex flex-col items-center gap-2">
        <IconButton aria-label="Small" icon={<Plus />} size="sm" variant="solid" color="primary" />
        <span className="text-xs text-gray-500">sm</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <IconButton aria-label="Medium" icon={<Plus />} size="md" variant="solid" color="primary" />
        <span className="text-xs text-gray-500">md</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <IconButton aria-label="Large" icon={<Plus />} size="lg" variant="solid" color="primary" />
        <span className="text-xs text-gray-500">lg</span>
      </div>
    </div>
  ),
};

export const Loading: Story = {
  args: { 'aria-label': 'Loading', icon: <Bell />, isLoading: true, variant: 'solid', color: 'primary' },
};

export const Disabled: Story = {
  args: { 'aria-label': 'Disabled', icon: <X />, disabled: true, variant: 'solid', color: 'primary' },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs text-gray-500 mb-2 font-medium">Solid</p>
        <div className="flex gap-2">
          <IconButton aria-label="Default" icon={<X />} variant="solid" color="default" />
          <IconButton aria-label="Primary" icon={<Plus />} variant="solid" color="primary" />
          <IconButton aria-label="Danger" icon={<Trash2 />} variant="solid" color="danger" />
        </div>
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-2 font-medium">Outline</p>
        <div className="flex gap-2">
          <IconButton aria-label="Default" icon={<X />} variant="outline" color="default" />
          <IconButton aria-label="Primary" icon={<Plus />} variant="outline" color="primary" />
          <IconButton aria-label="Danger" icon={<Trash2 />} variant="outline" color="danger" />
        </div>
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-2 font-medium">Ghost</p>
        <div className="flex gap-2">
          <IconButton aria-label="Default" icon={<X />} variant="ghost" color="default" />
          <IconButton aria-label="Primary" icon={<Plus />} variant="ghost" color="primary" />
          <IconButton aria-label="Danger" icon={<Trash2 />} variant="ghost" color="danger" />
        </div>
      </div>
    </div>
  ),
};
