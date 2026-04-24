import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './stubs';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'filled', 'error', 'success'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    label: { control: 'text' },
    error: { control: 'text' },
    helpText: { control: 'text' },
    placeholder: { control: 'text' },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const defaultOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
];

export const Default: Story = {
  args: {
    label: 'Choose a fruit',
    options: defaultOptions,
    placeholder: 'Select a fruit...',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Choose a fruit',
    options: defaultOptions,
    value: 'cherry',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <Select label="Default" options={defaultOptions} placeholder="Select..." />
      <Select variant="filled" label="Filled" options={defaultOptions} placeholder="Select..." />
      <Select variant="success" label="Success" options={defaultOptions} value="banana" />
      <Select variant="error" label="Error" options={defaultOptions} error="This field is required." />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <Select size="sm" label="Small" options={defaultOptions} placeholder="Select..." />
      <Select size="md" label="Medium" options={defaultOptions} placeholder="Select..." />
      <Select size="lg" label="Large" options={defaultOptions} placeholder="Select..." />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    options: defaultOptions,
    value: 'banana',
    disabled: true,
  },
};

export const WithGroupedOptions: Story = {
  args: {
    label: 'Choose a food',
    placeholder: 'Select...',
    options: [
      {
        label: 'Fruits',
        options: [
          { value: 'apple', label: 'Apple' },
          { value: 'banana', label: 'Banana' },
        ],
      },
      {
        label: 'Vegetables',
        options: [
          { value: 'carrot', label: 'Carrot' },
          { value: 'broccoli', label: 'Broccoli' },
        ],
      },
    ],
  },
};

export const HelpText: Story = {
  args: {
    label: 'Country',
    options: [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
      { value: 'uk', label: 'United Kingdom' },
    ],
    helpText: 'Select your country of residence.',
  },
};
