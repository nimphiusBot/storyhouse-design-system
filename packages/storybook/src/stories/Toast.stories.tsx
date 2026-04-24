import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Toast, useToast, Button } from './stubs';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['success', 'error', 'warning', 'info'] },
    message: { control: 'text' },
    duration: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  args: { message: 'Successfully saved changes!', type: 'success', show: true },
};

export const Error: Story = {
  args: { message: 'Failed to save changes. Please try again.', type: 'error', show: true },
};

export const Warning: Story = {
  args: { message: 'This action cannot be undone.', type: 'warning', show: true },
};

export const Info: Story = {
  args: { message: 'New updates are available.', type: 'info', show: true },
};

export const WithHook: Story = {
  render: () => {
    const { showToast, ToastContainer } = useToast();
    return (
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => showToast('Saved!', 'success')}>Success</Button>
        <Button variant="danger" onClick={() => showToast('Error!', 'error')}>Error</Button>
        <Button variant="secondary" onClick={() => showToast('Warning!', 'warning', 4000)}>Warning</Button>
        <Button variant="secondary" onClick={() => showToast('Info message', 'info', 2000)}>Info</Button>
        <ToastContainer />
      </div>
    );
  },
};
