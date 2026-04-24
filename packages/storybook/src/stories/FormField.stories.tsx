import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormField, FormGroup, Input } from './stubs';

const meta: Meta<typeof FormField> = {
  title: 'Components/FormField',
  component: FormField,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    layout: { control: 'select', options: ['vertical', 'horizontal'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    showOptional: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  args: {
    label: 'Email',
    children: <Input type="email" placeholder="Enter your email" />,
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    error: 'Please enter a valid email address',
    children: <Input type="email" value="invalid" />,
  },
};

export const WithHelpText: Story = {
  args: {
    label: 'Password',
    helpText: 'Must be at least 8 characters',
    children: <Input type="password" placeholder="Enter password" />,
  },
};

export const Required: Story = {
  args: {
    label: 'Full Name',
    required: true,
    children: <Input type="text" placeholder="Enter your name" />,
  },
};

export const WithOptional: Story = {
  args: {
    label: 'Phone Number',
    showOptional: true,
    children: <Input type="tel" placeholder="Enter phone (optional)" />,
  },
};

export const Horizontal: Story = {
  args: {
    label: 'Full Name',
    layout: 'horizontal',
    children: <Input type="text" placeholder="Enter your name" />,
  },
};

// FormGroup story
export const Grouped: StoryObj<typeof FormGroup> = {
  render: () => (
    <FormGroup title="Personal Information" description="Enter your personal details below.">
      <FormField label="First Name" required>
        <Input placeholder="John" />
      </FormField>
      <FormField label="Last Name" required>
        <Input placeholder="Doe" />
      </FormField>
      <FormField label="Email">
        <Input type="email" placeholder="john@example.com" />
      </FormField>
    </FormGroup>
  ),
};
