import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Breadcrumb } from './stubs';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'simple', 'arrow'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    maxItems: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

const defaultItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Widgets', href: '/products/widgets' },
  { label: 'Edit Widget' },
];

export const Default: Story = {
  args: {
    items: defaultItems,
    variant: 'default',
  },
};

export const Simple: Story = {
  args: {
    items: defaultItems,
    variant: 'simple',
  },
};

export const Arrow: Story = {
  args: {
    items: defaultItems,
    variant: 'arrow',
  },
};

export const Small: Story = {
  args: {
    items: defaultItems,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    items: defaultItems,
    size: 'lg',
  },
};

export const TwoLevels: Story = {
  args: {
    items: [
      { label: 'Dashboard', href: '/' },
      { label: 'Settings' },
    ],
  },
};

export const Collapsed: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Documents', href: '/docs' },
      { label: 'Projects', href: '/docs/projects' },
      { label: 'Current Project', href: '/docs/projects/current' },
      { label: 'Settings' },
    ],
    maxItems: 3,
  },
};

export const LongPath: Story = {
  render: () => (
    <div className="w-96">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Organization', href: '/org' },
          { label: 'Team', href: '/org/team' },
          { label: 'Project Alpha', href: '/org/team/alpha' },
          { label: 'Sprint 3', href: '/org/team/alpha/sprint3' },
          { label: 'Task Details' },
        ]}
        maxItems={4}
      />
    </div>
  ),
};
