import React from 'react';
import { DurationSlider } from '@storyhouse/components';

export default function LiveDurationSliderDemo(): React.ReactNode {
  const [value, setValue] = React.useState<20 | 60 | 90 | 900>(60);

  const labels: Record<number, string> = {
    20: 'Short (20s)',
    60: 'Standard (1m)',
    90: 'Extended (1m 30s)',
    900: 'Long Form (15m)',
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">
          Current Duration: <span className="font-semibold text-gray-900 dark:text-gray-100">{labels[value] || `${value}s`}</span>
        </p>
        <DurationSlider value={value} onChange={setValue} />
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Disabled State</p>
        <DurationSlider value={60} onChange={() => {}} disabled />
      </div>
    </div>
  );
}
