import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, Button } from './stubs';
import { HelpCircle } from 'lucide-react';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
    position: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    delay: { control: 'number' },
    className: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '100px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Top: Story = {
  args: { content: 'This tooltip appears on top', position: 'top', children: <Button>Hover me (top)</Button> },
};

export const Bottom: Story = {
  args: { content: 'This tooltip appears below', position: 'bottom', children: <Button>Hover me (bottom)</Button> },
};

export const Left: Story = {
  args: { content: 'This tooltip is on the left', position: 'left', children: <Button>Hover me (left)</Button> },
};

export const Right: Story = {
  args: { content: 'This tooltip is on the right', position: 'right', children: <Button>Hover me (right)</Button> },
};

export const WithIcon: Story = {
  args: {
    content: 'Helpful information',
    position: 'top',
    children: (
      <span className="inline-flex items-center gap-1 text-sm text-gray-500 cursor-pointer hover:text-gray-700">
        <HelpCircle className="w-4 h-4" /> Hover for help
      </span>
    ),
  },
};

export const CustomDelay: Story = {
  args: {
    content: 'Appears after 1 second',
    position: 'top',
    delay: 1000,
    children: <Button variant="secondary">Slow tooltip (1s)</Button>,
  },
};
