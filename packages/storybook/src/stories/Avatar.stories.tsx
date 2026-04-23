import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '@storyhouse/components';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'select',
      options: ['circle', 'square'],
    },
    name: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?u=storyhouse',
    alt: 'User avatar',
    name: 'Jane Smith',
  },
};

export const WithInitials: Story = {
  args: {
    name: 'Jane Smith',
  },
};

export const SingleInitial: Story = {
  args: {
    name: 'Alice',
  },
};

export const FallbackIcon: Story = {
  args: {},
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      <Avatar name="XS" size="xs" />
      <Avatar name="SM" size="sm" />
      <Avatar name="MD" size="md" />
      <Avatar name="LG" size="lg" />
      <Avatar name="XL" size="xl" />
    </div>
  ),
};

export const CircleVariant: Story = {
  args: {
    name: 'Circle',
    variant: 'circle',
  },
};

export const SquareVariant: Story = {
  args: {
    name: 'Square',
    variant: 'square',
  },
};