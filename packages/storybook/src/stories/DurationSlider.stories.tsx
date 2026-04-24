import type { Meta, StoryObj } from '@storybook/react';
import { DurationSlider } from './stubs';

const meta: Meta<typeof DurationSlider> = {
  title: 'Components/DurationSlider',
  component: DurationSlider,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'select', options: [20, 60, 90, 900] },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof DurationSlider>;

export const Short: Story = {
  args: { value: 20 },
};

export const Standard: Story = {
  args: { value: 60 },
};

export const Extended: Story = {
  args: { value: 90 },
};

export const LongForm: Story = {
  args: { value: 900 },
};

export const Disabled: Story = {
  args: { value: 60, disabled: true },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = React.useState<20 | 60 | 90 | 900>(60);
    return <DurationSlider value={value} onChange={setValue} />;
  },
};
