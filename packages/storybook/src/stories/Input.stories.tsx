import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './stubs';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    type: { control: 'select', options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'] },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = { args: { placeholder: 'Enter text...' } };
export const WithLabel: Story = { args: { label: 'Email', placeholder: 'you@example.com', type: 'email' } };
export const WithError: Story = { args: { label: 'Email', placeholder: 'you@example.com', error: 'Please enter a valid email address', value: 'invalid' } };
export const WithHelperText: Story = { args: { label: 'Password', placeholder: 'Enter password', type: 'password', helperText: 'Must be at least 8 characters' } };
export const Small: Story = { args: { size: 'sm', placeholder: 'Small input' } };
export const Large: Story = { args: { size: 'lg', placeholder: 'Large input' } };
export const Disabled: Story = { args: { disabled: true, placeholder: 'Disabled input', value: 'Cannot edit this' } };
export const FullWidth: Story = { args: { fullWidth: true, placeholder: 'Full width input' } };