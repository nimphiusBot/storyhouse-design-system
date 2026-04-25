import React, { Component, type ReactNode } from 'react';

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  /** Callback invoked after the user triggers a retry (reset). Useful for
   *  re-initializing application state before children re-render. */
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Maximum length for component stack logging to avoid spamming the console
 * with enormous trace strings.
 */
const MAX_STACK_LENGTH = 1000;

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  /** Guard flag to prevent setState after unmount. */
  private _isMounted = false;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  override componentDidMount(): void {
    this._isMounted = true;
  }

  override componentWillUnmount(): void {
    this._isMounted = false;
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log the error with full detail at console.error level, but truncate
    // the component stack to avoid flooding the console with multi-hundred-line traces.
    if (errorInfo.componentStack && errorInfo.componentStack.length > MAX_STACK_LENGTH) {
      console.error(
        'ErrorBoundary caught an error:',
        error,
        { componentStack: errorInfo.componentStack.slice(0, MAX_STACK_LENGTH) + '…' },
      );
      // Use console.debug for the full stack when it's large so it's still
      // discoverable but doesn't clutter the default console output.
      console.debug('ErrorBoundary full component stack:', errorInfo.componentStack);
    } else {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    this.props.onError?.(error, errorInfo);
  }

  handleReload = (): void => {
    window.location.reload();
  };

  handleReset = (): void => {
    if (this._isMounted) {
      this.setState({ hasError: false, error: null }, () => {
        this.props.onReset?.();
      });
    }
  };

  override render(): React.ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <svg
            className="w-16 h-16 text-red-600 dark:text-red-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <h3 className="text-xl font-semibold text-red-900 dark:text-red-100 mb-2">
            Something went wrong
          </h3>
          <p className="text-sm text-red-700 dark:text-red-300 mb-6 text-center max-w-md">
            {this.state.error?.message ||
              'An unexpected error occurred. Please try reloading the page.'}
          </p>
          <div className="flex gap-3">
            <button
              className="inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
              onClick={this.handleReload}
            >
              Reload Page
            </button>
            <button
              className="inline-flex items-center justify-center rounded-lg bg-white border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
              onClick={this.handleReset}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
