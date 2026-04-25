import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Alert } from './stubs';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'warning', 'error', 'tip'] },
    dismissible: { control: 'boolean' },
    title: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Heads up!',
    children: 'This is an informational message that requires attention.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success!',
    children: 'Your changes have been saved successfully.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    children: 'Your session will expire in 5 minutes. Please save your work.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    children: 'There was a problem processing your request. Please try again.',
  },
};

export const Tip: Story = {
  args: {
    variant: 'tip',
    title: 'Pro Tip',
    children: 'You can use keyboard shortcuts to navigate faster. Press ⌘K to open the command palette.',
  },
};

export const WithoutTitle: Story = {
  args: {
    variant: 'info',
    children: 'Your profile has been updated. Allow up to 24 hours for changes to take effect.',
  },
};

export const Dismissible: Story = {
  args: {
    variant: 'success',
    title: 'Dismiss me!',
    dismissible: true,
    children: 'Click the X button to dismiss this alert.',
  },
};

export const DismissibleControlled: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    if (!visible) {
      return (
        <button
          onClick={() => setVisible(true)}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm"
        >
          Reset Alert
        </button>
      );
    }
    return (
      <Alert variant="warning" dismissible onDismiss={() => setVisible(false)}>
        <strong>Note:</strong> This alert uses controlled dismissal via onDismiss callback.
      </Alert>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-96">
      <Alert variant="info" title="Info">Informational message.</Alert>
      <Alert variant="success" title="Success">Operation completed.</Alert>
      <Alert variant="warning" title="Warning">Be careful.</Alert>
      <Alert variant="error" title="Error">Something went wrong.</Alert>
      <Alert variant="tip" title="Tip">Helpful suggestion.</Alert>
    </div>
  ),
};
