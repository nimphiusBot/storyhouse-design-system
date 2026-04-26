import React, { useEffect, useState, useRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { RefreshCw, Wifi, WifiOff, AlertTriangle } from 'lucide-react';

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export interface AutoRefreshIndicatorProps {
  /** Whether the auto-refresh is enabled */
  enabled: boolean;
  /** Whether a poll is currently in-flight */
  isPolling: boolean;
  /** Human-readable label for the current interval (e.g., "30s") */
  intervalLabel: string;
  /** Whether the page tab is currently hidden (respects Page Visibility API) */
  tabHidden?: boolean;
  /** When this indicator was last polled, as a relative time string */
  lastPolledLabel?: string;
  /** Exact timestamp (epoch ms) for tooltip */
  lastPolledAt?: number | null;
  /** Optional class name override */
  className?: string;
  /** Whether the last poll attempt failed */
  lastPollFailed?: boolean;
  /** Whether data was just refreshed (triggers highlight animation) */
  dataJustRefreshed?: boolean;
  /** The effective interval (with backoff info) displayed in the label */
  effectiveIntervalLabel?: string;
  /**
   * Whether auto-refresh is programmatically paused by the parent.
   * When true, the indicator shows a paused state visually distinct from
   * tab-hidden. Use this when the parent needs to temporarily pause
   * auto-refresh (e.g., during form editing, error state, modal open)
   * without disabling or unmounting the component.
   */
  paused?: boolean;
}

/**
 * Format an epoch timestamp for display in a tooltip.
 */
function formatTimestamp(ts: number): string {
  try {
    return new Date(ts).toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  } catch {
    return String(ts);
  }
}

/**
 * Format a relative time string (e.g., "5s ago", "2m ago").
 */
function formatRelativeTime(ts: number): string {
  const diff = Date.now() - ts;
  const seconds = Math.floor(diff / 1000);
  if (seconds < 5) return 'just now';
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

/**
 * AutoRefreshIndicator
 *
 * A compact UI badge that shows the auto-refresh state of a dashboard or data view.
 * Displays enabled/disabled state with a pulsing dot, active polling spinner,
 * tab-hidden awareness, "last polled" timestamp, error/stale state visual,
 * data-change highlight animation, and an exact timestamp tooltip.
 *
 * Renders as a small pill badge intended for dashboard header toolbars.
 *
 * @example
 * ```tsx
 * <AutoRefreshIndicator
 *   enabled={true}
 *   isPolling={false}
 *   intervalLabel="30s"
 *   lastPolledLabel="2m ago"
 *   lastPolledAt={Date.now() - 120000}
 * />
 * ```
 */
export const AutoRefreshIndicator: React.FC<AutoRefreshIndicatorProps> = ({
  enabled,
  isPolling,
  intervalLabel,
  tabHidden = false,
  lastPolledLabel,
  lastPolledAt,
  className,
  lastPollFailed = false,
  dataJustRefreshed = false,
  effectiveIntervalLabel,
  paused = false,
}) => {
  /**
   * Tick every 5 seconds to keep relative-time labels and tooltips fresh.
   * The interval is properly cleaned up on unmount to prevent memory leaks.
   * Note: hooks must be declared unconditionally (before any early returns).
   */
  const [, setTick] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTick((n) => n + 1);
    }, 5000);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  if (!enabled && !lastPolledLabel) return null;

  // Compute dynamic relative-time label from timestamp (re-evaluated on each tick)
  const dynamicTimeLabel = lastPolledAt ? formatRelativeTime(lastPolledAt) : undefined;
  const effectiveTimeLabel = lastPolledLabel || dynamicTimeLabel;

  // Build tooltip
  const tooltipParts: string[] = [];
  if (paused) {
    tooltipParts.push('Auto-refresh paused');
  } else if (enabled) {
    tooltipParts.push(`Auto-refreshing every ${intervalLabel}`);
    if (effectiveIntervalLabel && effectiveIntervalLabel !== intervalLabel) {
      tooltipParts.push(`Effective: ${effectiveIntervalLabel}`);
    }
  } else {
    tooltipParts.push('Auto-refresh is off');
  }
  if (lastPolledAt) {
    tooltipParts.push(`Last updated: ${formatTimestamp(lastPolledAt)}`);
  }
  if (lastPollFailed) {
    tooltipParts.push('⚠️ Last poll failed — retrying with backoff');
  }

  // Determine background based on state priority
  // Priority: lastPollFailed > isPolling > paused > tabHidden > enabled > disabled
  const bgClass = lastPollFailed
    ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300'
    : isPolling
      ? 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-300'
      : paused
        ? 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300'
        : tabHidden
          ? 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300'
          : enabled
            ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300'
            : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400';

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium select-none transition-all duration-200',
        bgClass,
        dataJustRefreshed && 'animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.5)] dark:shadow-[0_0_8px_rgba(251,146,60,0.5)] ring-2 ring-orange-400',
        className
      )}
      title={tooltipParts.join(' | ')}
      role="status"
      aria-live="polite"
      aria-label={`Auto-refresh status: ${lastPollFailed ? 'retrying' : isPolling ? 'refreshing' : paused ? 'paused by user' : tabHidden ? 'paused' : enabled ? `every ${effectiveIntervalLabel ?? intervalLabel}` : 'off'}`}
    >
      {/* Icon */}
      {lastPollFailed ? (
        <AlertTriangle className="h-3 w-3" aria-hidden="true" />
      ) : isPolling ? (
        <RefreshCw className="h-3 w-3 animate-spin" aria-hidden="true" />
      ) : paused ? (
        <WifiOff className="h-3 w-3" aria-hidden="true" />
      ) : tabHidden ? (
        <WifiOff className="h-3 w-3" aria-hidden="true" />
      ) : enabled ? (
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
      ) : (
        <Wifi className="h-3 w-3 opacity-50" aria-hidden="true" />
      )}

      {/* Label */}
      <span>
        {lastPollFailed
          ? 'Retrying…'
          : isPolling
            ? 'Refreshing…'
            : paused
              ? 'Paused'
              : tabHidden
                ? 'Paused (tab hidden)'
                : enabled
                  ? `Every ${effectiveIntervalLabel ?? intervalLabel}`
                  : 'Auto-refresh off'}
      </span>

      {/* Last polled (always shown for refinement) */}
      {effectiveTimeLabel && (
        <span className="opacity-60 ml-0.5">· {effectiveTimeLabel}</span>
      )}

      {/* Data-just-refreshed indicator dot */}
      {dataJustRefreshed && !isPolling && (
        <span className="relative flex h-2 w-2 ml-0.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
        </span>
      )}
    </div>
  );
};

AutoRefreshIndicator.displayName = 'AutoRefreshIndicator';

export default AutoRefreshIndicator;
