import React, { useState } from 'react';

export default function LiveModalDemo(): React.ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const [isDangerOpen, setIsDangerOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500">Trigger Examples</p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center justify-center rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-700"
          >
            Open Modal
          </button>
          <button
            onClick={() => setIsDangerOpen(true)}
            className="inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
          >
            Danger Modal
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setIsOpen(false)}>
          <div className="w-full max-w-md bg-white rounded-lg shadow-xl border-t-4 border-t-orange-500" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Modal Title</h2>
                <p className="mt-1 text-sm text-gray-500">Description of what this modal is for.</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-500">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600">This is the modal content area. You can add forms, text, or any other content here.</p>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button onClick={() => setIsOpen(false)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={() => setIsOpen(false)} className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700">Save</button>
            </div>
          </div>
        </div>
      )}

      {isDangerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setIsDangerOpen(false)}>
          <div className="w-full max-w-sm bg-white rounded-lg shadow-xl border-t-4 border-t-red-500" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between p-6 border-b border-red-200">
              <h2 className="text-lg font-semibold text-red-900">Delete Account</h2>
              <button onClick={() => setIsDangerOpen(false)} className="text-gray-400 hover:text-gray-500">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600">This action cannot be undone. All your data will be permanently deleted.</p>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-red-200">
              <button onClick={() => setIsDangerOpen(false)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={() => setIsDangerOpen(false)} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-400">
        Click the buttons above to open modals. Esc key and overlay click dismiss by default.
      </p>
    </div>
  );
}
