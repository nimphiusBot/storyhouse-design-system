import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './stubs';
import { Search, Lock, Database, AlertTriangle, Plus } from 'lucide-react';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['no-data', 'no-results', 'error', 'no-permission', 'loading'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const NoData: Story = {
  args: {
    title: 'No data available',
    description: 'There are no items to display at this time.',
    icon: <Database className="w-6 h-6" />,
  },
};

export const NoResults: Story = {
  args: {
    variant: 'no-results',
    title: 'No results found',
    description: 'Try adjusting your search or filter criteria.',
    icon: <Search className="w-6 h-6" />,
  },
};

export const ErrorState: Story = {
  args: {
    variant: 'error',
    title: 'Something went wrong',
    description: 'An error occurred while loading data. Please try again.',
    icon: <AlertTriangle className="w-6 h-6" />,
    primaryAction: { label: 'Retry', onClick: () => {} },
  },
};

export const NoPermission: Story = {
  args: {
    variant: 'no-permission',
    title: 'Access denied',
    description: 'You do not have permission to view this content. Contact your administrator.',
    icon: <Lock className="w-6 h-6" />,
  },
};

export const WithActions: Story = {
  args: {
    title: 'No projects yet',
    description: 'Get started by creating your first project.',
    icon: <Database className="w-6 h-6" />,
    primaryAction: { label: 'Create Project', onClick: () => {} },
    secondaryAction: { label: 'Learn more', onClick: () => {} },
  },
};

export const WithActionProp: Story = {
  args: {
    title: 'No projects yet',
    description: 'Get started by creating your first project.',
    icon: <Database className="w-6 h-6" />,
    action: (
      <button className="inline-flex items-center justify-center rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700">
        <Plus className="w-4 h-4 mr-1.5" />
        Create Project
      </button>
    ),
  },
};

export const WithCustomLinkAction: Story = {
  args: {
    title: 'Access denied',
    variant: 'no-permission',
    description: 'Contact your administrator to request access.',
    icon: <Lock className="w-6 h-6" />,
    action: <a href="/support" className="text-orange-600 underline text-sm">Contact Support →</a>,
  },
};

export const Loading: Story = {
  args: {
    variant: 'loading',
    title: 'Loading data...',
    description: 'Please wait while we fetch your information.',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    title: 'No items',
    description: 'No items to show.',
    icon: <Database className="w-4 h-4" />,
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    title: 'Welcome to your dashboard',
    description: 'Your dashboard is empty. As you add data, it will appear here. Get started by creating your first item or importing data.',
    icon: <Database className="w-8 h-8" />,
    primaryAction: { label: 'Get Started', onClick: () => {} },
  },
};
