import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, Button, Badge } from '@storyhouse/components';

export default function LiveCardDemo(): React.ReactNode {
  const [activeVariant, setActiveVariant] = React.useState<'default' | 'elevated' | 'bordered' | 'flat'>('default');

  return (
    <div className="space-y-8">
      {/* Variant selector */}
      <div className="flex flex-wrap items-center gap-2">
        {(['default', 'elevated', 'bordered', 'flat'] as const).map((v) => (
          <button
            key={v}
            onClick={() => setActiveVariant(v)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              activeVariant === v
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </button>
        ))}
      </div>

      {/* Live card */}
      <Card variant={activeVariant} padding="md" className="w-full max-w-md">
        <CardHeader>
          <CardTitle as="h3">Account Settings</CardTitle>
          <Badge variant="primary" dot>Active</Badge>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage your account preferences, notification settings, and security options from this panel.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="secondary" size="sm">Cancel</Button>
          <Button variant="primary" size="sm">Save Changes</Button>
        </CardFooter>
      </Card>

      <p className="text-xs text-gray-400">
        Click the variant buttons above to see the card style change live.
      </p>
    </div>
  );
}
