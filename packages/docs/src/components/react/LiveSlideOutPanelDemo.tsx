import React from 'react';
import { SlideOutPanel, Button } from '@storyhouse/components';

export default function LiveSlideOutPanelDemo(): React.ReactNode {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Click the button below to open a slide-out panel.
      </p>
      <Button onClick={() => setIsOpen(true)}>Open Settings Panel</Button>

      <SlideOutPanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Settings"
        subtitle="Manage your application preferences"
        size="md"
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Notifications</h3>
            <p className="text-sm text-gray-500">
              Configure how you receive notifications from the application.
            </p>
            <div className="mt-3 space-y-2">
              {['Email Notifications', 'Push Notifications', 'Weekly Digest'].map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Theme</h3>
            <div className="flex gap-2">
              {['Light', 'Dark', 'System'].map((theme) => (
                <button
                  key={theme}
                  className="px-3 py-1.5 text-sm rounded-md border border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>
        </div>
      </SlideOutPanel>
    </div>
  );
}
