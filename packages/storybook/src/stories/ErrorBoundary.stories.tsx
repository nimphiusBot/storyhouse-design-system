import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { ErrorBoundary, Button } from './stubs';

const meta: Meta<typeof ErrorBoundary> = {
  title: 'Components/ErrorBoundary',
  component: ErrorBoundary,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ErrorBoundary>;

const BuggyComponent: React.FC<{ shouldThrow?: boolean }> = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('Something went wrong!');
  }
  return <p className="text-sm text-gray-600">Everything is working fine.</p>;
};

export const DefaultFallback: Story = {
  render: () => {
    const [shouldThrow, setShouldThrow] = useState(false);
    return (
      <div className="w-96">
        <ErrorBoundary>
          <div className="space-y-4">
            <BuggyComponent shouldThrow={shouldThrow} />
            <Button onClick={() => setShouldThrow(true)}>
              Trigger Error
            </Button>
          </div>
        </ErrorBoundary>
      </div>
    );
  },
};

export const CustomFallback: Story = {
  render: () => {
    const [shouldThrow, setShouldThrow] = useState(false);
    return (
      <div className="w-96">
        <ErrorBoundary
          fallback={
            <div className="p-8 text-center bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-yellow-800 font-medium">Custom error UI</p>
              <p className="text-yellow-600 text-sm mt-1">Try refreshing the page.</p>
            </div>
          }
        >
          <div className="space-y-4">
            <BuggyComponent shouldThrow={shouldThrow} />
            <Button onClick={() => setShouldThrow(true)}>
              Trigger Error
            </Button>
          </div>
        </ErrorBoundary>
      </div>
    );
  },
};

export const WithErrorCallback: Story = {
  render: () => {
    const [shouldThrow, setShouldThrow] = useState(false);
    const [lastError, setLastError] = useState<string | null>(null);
    return (
      <div className="w-96 space-y-4">
        {lastError && (
          <div className="text-xs text-red-500 bg-red-50 p-2 rounded border border-red-200">
            Error logged: {lastError}
          </div>
        )}
        <ErrorBoundary
          onError={(error) => setLastError(error.message)}
          fallback={
            <div className="p-4 text-center bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-yellow-800 font-medium">An error was caught</p>
              <p className="text-yellow-600 text-sm mt-1">Check the log above for details.</p>
            </div>
          }
        >
          <div className="space-y-4">
            <BuggyComponent shouldThrow={shouldThrow} />
            <Button onClick={() => setShouldThrow(true)}>
              Trigger Error
            </Button>
          </div>
        </ErrorBoundary>
      </div>
    );
  },
};
