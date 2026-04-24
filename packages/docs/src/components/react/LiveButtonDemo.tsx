import React from 'react';
import { Button, type ButtonProps } from '@storyhouse/components';

const variantGroups: { label: string; items: { variant: ButtonProps['variant']; label: string }[] }[] = [
  {
    label: 'Variants',
    items: [
      { variant: 'primary', label: 'Primary' },
      { variant: 'secondary', label: 'Secondary' },
      { variant: 'ghost', label: 'Ghost' },
      { variant: 'danger', label: 'Danger' },
    ],
  },
];

const sizeVariants: { size: ButtonProps['size']; label: string }[] = [
  { size: 'sm', label: 'Small' },
  { size: 'md', label: 'Medium' },
  { size: 'lg', label: 'Large' },
];

export default function LiveButtonDemo() {
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <div className="space-y-8">
      {/* Variants */}
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500">Variants</p>
        <div className="flex flex-wrap items-center gap-3">
          {variantGroups[0].items.map((item) => (
            <Button key={item.variant} variant={item.variant}>
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500">Sizes</p>
        <div className="flex flex-wrap items-center gap-3">
          {sizeVariants.map((item) => (
            <Button key={item.size} size={item.size} variant="primary">
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      {/* States */}
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500">States</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            isLoading={isLoading}
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => setIsLoading(false), 2000);
            }}
          >
            {isLoading ? 'Saving...' : 'Click to Load'}
          </Button>
          <Button disabled>Disabled</Button>
          <Button fullWidth className="max-w-xs">
            Full Width
          </Button>
        </div>
      </div>

      {/* Interactive: click the loading button above */}
      <p className="text-xs text-gray-400">
        The loading button simulates a 2-second async operation. Click it to see the spinner in action.
      </p>
    </div>
  );
}
