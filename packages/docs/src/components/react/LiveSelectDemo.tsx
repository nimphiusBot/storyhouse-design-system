import React, { useState } from 'react';
import { Select } from '@storyhouse/components';

const sampleOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid' },
];

export default function LiveSelectDemo(): React.ReactNode {
  const [value, setValue] = useState('');

  return (
    <div className="space-y-8">
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500">Variants</p>
        <div className="flex flex-wrap gap-4">
          <div className="w-48">
            <Select
              label="Default"
              placeholder="Select..."
              options={sampleOptions}
            />
          </div>
          <div className="w-48">
            <Select
              label="Filled"
              placeholder="Select..."
              variant="filled"
              options={sampleOptions}
            />
          </div>
          <div className="w-48">
            <Select
              label="Error"
              placeholder="Select..."
              error="This field is required."
              options={sampleOptions}
            />
          </div>
        </div>
      </div>
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500">Controlled</p>
        <div className="w-64">
          <Select
            label="Framework"
            placeholder="Pick a framework..."
            options={sampleOptions}
            value={value}
            onChange={(v) => setValue(v)}
          />
        </div>
      </div>
      <p className="text-xs text-gray-400">
        A fully accessible custom dropdown with keyboard navigation, ARIA attributes, and form support.
      </p>
    </div>
  );
}
