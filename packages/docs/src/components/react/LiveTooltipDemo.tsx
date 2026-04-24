import React from 'react';

export default function LiveTooltipDemo(): React.ReactNode {
  return (
    <div className="space-y-8">
      <div>
        <p className="mb-6 text-sm font-medium text-gray-500">Hover over each element</p>
        <div className="flex flex-wrap items-center gap-12 justify-center py-8">
          {/* Tooltip top */}
          <div className="relative group">
            <button className="inline-flex items-center justify-center rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white">
              Hover top
            </button>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded shadow-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              Tooltip on top
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-gray-900 rotate-45" />
            </div>
          </div>

          {/* Tooltip bottom */}
          <div className="relative group">
            <button className="inline-flex items-center justify-center rounded-lg bg-gray-700 px-4 py-2 text-sm font-medium text-white">
              Hover bottom
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-900 rounded shadow-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              Tooltip on bottom
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-1 w-2 h-2 bg-gray-900 rotate-45" />
            </div>
          </div>

          {/* Tooltip left */}
          <div className="relative group">
            <button className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700">
              Hover left
            </button>
            <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2 px-2 py-1 text-xs text-white bg-gray-900 rounded shadow-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              Tooltip on left
              <div className="absolute left-full top-1/2 -translate-y-1/2 -ml-1 w-2 h-2 bg-gray-900 rotate-45" />
            </div>
          </div>

          {/* Tooltip right */}
          <div className="relative group">
            <span className="inline-flex items-center gap-1 text-sm text-gray-500 cursor-pointer hover:text-gray-700">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Hover right
            </span>
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 text-xs text-white bg-gray-900 rounded shadow-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              Tooltip on right
              <div className="absolute right-full top-1/2 -translate-y-1/2 -mr-1 w-2 h-2 bg-gray-900 rotate-45" />
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-400">
        Tooltips support top, bottom, left, and right positions with arrow indicators.
      </p>
    </div>
  );
}
