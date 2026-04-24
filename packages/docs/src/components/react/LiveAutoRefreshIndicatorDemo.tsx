import React, { useState, useEffect } from 'react';

const Indicator: React.FC<{
  enabled: boolean;
  isPolling: boolean;
  intervalLabel: string;
  lastPollFailed?: boolean;
  tabHidden?: boolean;
  lastPolledLabel?: string;
}> = ({ enabled, isPolling, intervalLabel, lastPollFailed, tabHidden, lastPolledLabel }) => {
  const bgClass = lastPollFailed
    ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300'
    : isPolling
      ? 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-300'
      : tabHidden
        ? 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300'
        : enabled
          ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300'
          : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400';

  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium select-none ${bgClass}`}>
      <span>{enabled ? `Every ${intervalLabel}` : 'Auto-refresh off'}</span>
      {lastPolledLabel && <span className="opacity-60 ml-0.5">· {lastPolledLabel}</span>}
    </div>
  );
};

export default function LiveAutoRefreshIndicatorDemo(): React.ReactNode {
  const [state, setState] = useState<'enabled' | 'polling' | 'disabled' | 'error' | 'hidden'>('enabled');
  const states = [
    { key: 'enabled', label: 'Enabled', enabled: true, isPolling: false, intervalLabel: '30s', lastPolledLabel: '2m ago', lastPollFailed: false, tabHidden: false },
    { key: 'polling', label: 'Polling', enabled: true, isPolling: true, intervalLabel: '30s', lastPolledLabel: undefined, lastPollFailed: false, tabHidden: false },
    { key: 'disabled', label: 'Disabled', enabled: false, isPolling: false, intervalLabel: '30s', lastPolledLabel: '5m ago', lastPollFailed: false, tabHidden: false },
    { key: 'error', label: 'Failed', enabled: true, isPolling: false, intervalLabel: '30s', lastPolledLabel: '1m ago', lastPollFailed: true, tabHidden: false },
    { key: 'hidden', label: 'Tab Hidden', enabled: true, isPolling: false, intervalLabel: '30s', lastPolledLabel: '3m ago', lastPollFailed: false, tabHidden: true },
  ];

  const current = states.find(s => s.key === state)!;

  return (
    <div className="space-y-8">
      <div>
        <div className="flex flex-wrap gap-2 mb-6">
          {states.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setState(s.key)}
              className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
                state === s.key
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div className="flex justify-center p-8 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <Indicator {...current} />
        </div>
      </div>
      <p className="text-xs text-gray-400">
        The AutoRefreshIndicator provides real-time feedback on dashboard data refresh state.
        Supports enabled, polling, failed, tab-hidden, and disabled states.
      </p>
    </div>
  );
}
