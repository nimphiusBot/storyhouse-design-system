import React, { useState } from 'react';
import { FormatSelect, type FormatOption } from '@storyhouse/components';

const options: FormatOption[] = [
  {
    format: 'YouTube Short',
    intent: 'Short-form video content',
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

const FormatSelectDemo: React.FC = () => {
  const [value, setValue] = useState('');

  return (
    <div className="max-w-md">
      <FormatSelect
        options={options}
        value={value}
        onChange={setValue}
        placeholder="Select a format..."
      />
      {value && (
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          Selected: <strong>{value}</strong>
        </p>
      )}
    </div>
  );
};

export default FormatSelectDemo;
