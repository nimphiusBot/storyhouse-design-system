import React, { useState } from 'react';
import { SlidePanel, Button } from '@storyhouse/components';

const SlidePanelDemo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Click the button to open the slide panel from the right.
      </p>
      <Button onClick={() => setIsOpen(true)}>
        Open Panel
      </Button>
      <SlidePanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="User Settings"
        subtitle="Manage your account preferences"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>
              Save Changes
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Display Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Bio
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              rows={3}
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>
      </SlidePanel>
    </div>
  );
};

export default SlidePanelDemo;
