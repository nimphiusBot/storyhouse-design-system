import React from 'react';
import { Badge, type BadgeProps } from '@storyhouse/components';

const allVariants: { variant: BadgeProps['variant']; label: string }[] = [
  { variant: 'default', label: 'Default' },
  { variant: 'primary', label: 'Primary' },
  { variant: 'success', label: 'Success' },
  { variant: 'warning', label: 'Warning' },
  { variant: 'danger', label: 'Danger' },
  { variant: 'neutral', label: 'Neutral' },
];

const dotVariants: { variant: BadgeProps['variant']; label: string }[] = [
  { variant: 'success', label: 'Online' },
  { variant: 'warning', label: 'Away' },
  { variant: 'danger', label: 'Offline' },
];

export default function LiveBadgeDemo(): React.ReactNode {
  const [tags, setTags] = React.useState<string[]>([
    'TypeScript',
    'React',
    'Tailwind',
    'Astro',
  ]);

  return (
    <div className="space-y-8">
      {/* Variants */}
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500">Variants</p>
        <div className="flex flex-wrap items-center gap-2">
          {allVariants.map((item) => (
            <Badge key={item.variant} variant={item.variant}>
              {item.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500">Sizes</p>
        <div className="flex flex-wrap items-center gap-2">
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
        </div>
      </div>

      {/* Dot indicators */}
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500">Dot Indicators</p>
        <div className="flex flex-wrap items-center gap-2">
          {dotVariants.map((item) => (
            <Badge key={item.variant} variant={item.variant} dot>
              {item.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Removable tags */}
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500">
          Removable Tags <span className="text-xs text-gray-400">(click X to remove)</span>
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="primary"
              removable
              onRemove={() => setTags((prev) => prev.filter((t) => t !== tag))}
            >
              {tag}
            </Badge>
          ))}
          {tags.length === 0 && (
            <span className="text-sm text-gray-400">All tags removed. Refresh to reset.</span>
          )}
        </div>
      </div>
    </div>
  );
}
