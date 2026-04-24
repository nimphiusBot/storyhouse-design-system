import React from 'react';
import { FormField, Input } from '@storyhouse/components';

export default function LiveFormFieldDemo(): React.ReactNode {
  return (
    <div className="space-y-6">
      {/* Basic */}
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Default</p>
        <FormField label="Email Address">
          <Input type="email" placeholder="you@example.com" />
        </FormField>
      </div>

      {/* Required */}
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Required</p>
        <FormField label="Full Name" required>
          <Input placeholder="John Doe" />
        </FormField>
      </div>

      {/* With Help Text */}
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">With Help Text</p>
        <FormField label="Password" helpText="Must be at least 8 characters with one number">
          <Input type="password" placeholder="Enter password" />
        </FormField>
      </div>

      {/* Error State */}
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Error State</p>
        <FormField label="Email" error="Please enter a valid email address">
          <Input type="email" value="invalid-email" />
        </FormField>
      </div>

      {/* Horizontal Layout */}
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Horizontal Layout</p>
        <FormField label="Full Name" layout="horizontal">
          <Input placeholder="John Doe" className="max-w-xs" />
        </FormField>
      </div>
    </div>
  );
}
