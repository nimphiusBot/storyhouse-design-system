import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './stubs';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    isLoading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { variant: 'primary', children: 'Primary Button' } };
export const Secondary: Story = { args: { variant: 'secondary', children: 'Secondary Button' } };
export const Ghost: Story = { args: { variant: 'ghost', children: 'Ghost Button' } };
export const Danger: Story = { args: { variant: 'danger', children: 'Danger Button' } };
export const Small: Story = { args: { size: 'sm', children: 'Small Button' } };
export const Large: Story = { args: { size: 'lg', children: 'Large Button' } };
export const Loading: Story = { args: { isLoading: true, children: 'Loading' } };
export const Disabled: Story = { args: { disabled: true, children: 'Disabled' } };
export const FullWidth: Story = { args: { fullWidth: true, children: 'Full Width' } };

// Accessibility stories
export const A11yKeyboardFocus: Story = {
  name: 'A11y — Keyboard Focus',
  parameters: {
    a11y: { element: 'button' },
    docs: {
      description: {
        story: 'Buttons receive keyboard focus via Tab. They can be activated with Enter or Spacebar. Focus-visible ring provides a clear visual indicator.',
      },
    },
  },
  args: { children: 'Focusable Button', variant: 'primary' },
};

export const A11yScreenReader: Story = {
  name: 'A11y — Screen Reader Label',
  parameters: {
    docs: {
      description: {
        story: 'Buttons include implicit accessible labels via their text content. Icon-only buttons must include an aria-label describing the action (e.g., "Close", "Edit"). Loading state uses aria-busy="true" and disables the button to prevent double-activation.',
      },
    },
  },
  args: { children: 'Submit Form', variant: 'primary', 'aria-label': 'Submit the form data' },
};

export const A11yColorContrast: Story = {
  name: 'A11y — Color Contrast',
  parameters: {
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: true }] } },
    docs: {
      description: {
        story: 'All button variants meet WCAG 2.1 AA contrast requirements (4.5:1 for normal text, 3:1 for large text). Danger variant uses red tones that maintain minimum contrast on both light and dark backgrounds.',
      },
    },
  },
  args: { children: 'Contrast Check', variant: 'primary' },
};