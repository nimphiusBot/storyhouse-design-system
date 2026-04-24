import React from 'react';

export default function LiveSelectDemo(): React.ReactNode {
  return (
    <div className="space-y-8">
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500">Variants</p>
        <div className="flex flex-wrap gap-4">
          <div className="w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Default</label>
            <div className="relative">
              <select className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 pr-10 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>
          <div className="w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Filled</label>
            <div className="relative">
              <select className="w-full appearance-none rounded-lg border border-transparent bg-gray-100 px-3 py-2 text-base text-gray-900 pr-10 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 hover:bg-gray-200">
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>
          <div className="w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Error</label>
            <div className="relative">
              <select className="w-full appearance-none rounded-lg border-2 border-red-500 bg-white px-3 py-2 text-base text-gray-900 pr-10 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/20">
                <option>Select...</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
            <p className="text-sm text-red-600 mt-1">This field is required.</p>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-400">
        The Select component mirrors the Input's styling with a custom chevron indicator.
      </p>
    </div>
  );
}
