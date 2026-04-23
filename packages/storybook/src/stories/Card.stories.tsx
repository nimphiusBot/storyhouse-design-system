import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, Button } from './stubs';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'elevated', 'bordered', 'flat'] },
    padding: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = { args: { children: 'Card content', style: { maxWidth: 320 } } };

export const WithHeaderAndFooter: Story = {
  render: (args) => (
    <Card {...args} style={{ maxWidth: 400 }}>
      <CardHeader>
        <CardTitle>Getting Started</CardTitle>
        <span className="text-sm text-gray-500">v2.1.0</span>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Welcome to the design system. This card demonstrates composing cards with headers, content, and footers.</p>
        <p className="text-sm text-gray-500">Cards are the foundation of our layout system.</p>
      </CardContent>
      <CardFooter>
        <Button variant="primary" size="sm">Learn More</Button>
        <Button variant="ghost" size="sm">Dismiss</Button>
      </CardFooter>
    </Card>
  ),
};

export const Elevated: Story = { args: { variant: 'elevated', children: 'Elevated card with shadow', style: { maxWidth: 320 } } };
export const Bordered: Story = { args: { variant: 'bordered', children: 'Card with thick border', style: { maxWidth: 320 } } };
export const Flat: Story = { args: { variant: 'flat', children: 'Flat card without border or shadow', style: { maxWidth: 320 } } };
export const NoPadding: Story = { args: { padding: 'none', children: 'Card without padding', style: { maxWidth: 320 } } };