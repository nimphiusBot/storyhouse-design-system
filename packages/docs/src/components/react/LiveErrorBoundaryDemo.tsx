import React from 'react';

export default function LiveErrorBoundaryDemo(): React.ReactNode {
  const [hasError, setHasError] = React.useState(false);

  const handleClick = (): void => {
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center min-h-[300px] p-8 bg-red-50 rounded-lg border border-red-200">
          <svg className="w-16 h-16 text-red-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 className="text-xl font-semibold text-red-900 mb-2">Something went wrong</h3>
          <p className="text-sm text-red-700 mb-6 text-center max-w-md">
            An error was caught by the ErrorBoundary. The rest of the application continues to work normally.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setHasError(false)}
              className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700"
            >
              Reset & Try Again
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-400">This demonstrates how the ErrorBoundary catches rendering errors and displays a fallback UI.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500">ErrorBoundary Demo</p>
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <div className="text-4xl mb-4">✅</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Everything is working fine</h3>
          <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
            The application is running normally. Click the button below to simulate an error.
          </p>
          <button
            onClick={handleClick}
            className="inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Simulate Error
          </button>
        </div>
      </div>
      <p className="text-xs text-gray-400">
        Click "Simulate Error" to see the ErrorBoundary's default fallback UI in action.
      </p>
    </div>
  );
}
