import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormatSelect } from '@storyhouse/components';
import type { FormatOption } from '@storyhouse/components';

const meta: Meta<typeof FormatSelect> = {
  title: 'Components/FormatSelect',
  component: FormatSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof FormatSelect>;

const sampleOptions: FormatOption[] = [
  {
    format: 'YouTube Short',
    intent: 'Short-form video content for YouTube',
    emoji: '📱',
    sources: [],
    defaultAspectRatio: '9:16',
    generationModel: 'GPT-4',
  },
  {
    format: 'Instagram Post',
    intent: 'Square social media post',
    emoji: '📸',
    sources: [],
    defaultAspectRatio: '1:1',
  },
  {
    format: 'Blog Article',
    intent: 'Long-form written content',
    emoji: '📝',
    sources: [{ name: 'Docs' }],
  },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState('');

    return (
      <div className="max-w-md">
        <FormatSelect
          options={sampleOptions}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

export const WithSelection: Story = {
  render: () => {
    const [value, setValue] = React.useState('YouTube Short');

    return (
      <div className="max-w-md">
        <FormatSelect
          options={sampleOptions}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="max-w-md">
      <FormatSelect
        options={sampleOptions}
        value=""
        onChange={() => {}}
        disabled
      />
    </div>
  ),
};
