import type { Meta, StoryObj } from '@storybook/react';
import { DateTimePicker, DateRangePicker } from './stubs';

const meta: Meta<typeof DateTimePicker> = {
  title: 'Components/DateTimePicker',
  component: DateTimePicker,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'select', options: ['date', 'time', 'datetime'] },
    variant: { control: 'select', options: ['default', 'filled', 'error', 'success'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    clearable: { control: 'boolean' },
    disabled: { control: 'boolean' },
    showIcon: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof DateTimePicker>;

export const Date: Story = {
  args: { label: 'Select Date', mode: 'date' },
};

export const Time: Story = {
  args: { label: 'Select Time', mode: 'time' },
};

export const DateTime: Story = {
  args: { label: 'Select Date & Time', mode: 'datetime' },
};

export const Filled: Story = {
  args: { label: 'Select Date', mode: 'date', variant: 'filled' },
};

export const Error: Story = {
  args: { label: 'Select Date', mode: 'date', error: 'Please select a valid date', variant: 'error' },
};

export const Success: Story = {
  args: { label: 'Select Date', mode: 'date', variant: 'success' },
};

export const Disabled: Story = {
  args: { label: 'Select Date', mode: 'date', disabled: true },
};

export const WithHelpText: Story = {
  args: { label: 'Event Date', mode: 'date', helpText: 'Choose the date of your event' },
};

export const Small: Story = {
  args: { label: 'Date', mode: 'date', size: 'sm' },
};

export const Large: Story = {
  args: { label: 'Date', mode: 'date', size: 'lg' },
};

// DateRangePicker stories
export const DateRange: StoryObj<typeof DateRangePicker> = {
  render: () => (
    <DateRangePicker
      startLabel="Start Date"
      endLabel="End Date"
      startValue={null}
      endValue={null}
    />
  ),
};

DateRange.storyName = 'Date Range Picker';
