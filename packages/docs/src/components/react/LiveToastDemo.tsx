import React, { useState, useEffect } from 'react';

function DemoToast({ message, type, onClose }: { message: string; type: 'success' | 'error' | 'warning' | 'info'; onClose: () => void }) {
  const configs: Record<string, { bg: string; text: string; border: string }> = {
    success: { bg: 'bg-green-50', text: 'text-green-800', border: 'border-green-200' },
    error: { bg: 'bg-red-50', text: 'text-red-800', border: 'border-red-200' },
    warning: { bg: 'bg-yellow-50', text: 'text-yellow-800', border: 'border-yellow-200' },
    info: { bg: 'bg-orange-50', text: 'text-orange-800', border: 'border-orange-200' },
  };
  const cfg = configs[type];

  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`rounded-lg shadow-lg p-4 border max-w-sm ${cfg.bg} ${cfg.text} ${cfg.border}`}>
      <div className="flex items-start gap-3">
        <span className="text-sm font-medium flex-1">{message}</span>
        <button onClick={onClose} className="flex-shrink-0 opacity-60 hover:opacity-100">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function LiveToastDemo(): React.ReactNode {
  const [toasts, setToasts] = useState<Array<{ id: number; message: string; type: 'success' | 'error' | 'warning' | 'info' }>>([]);

  const addToast = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500">Trigger Toasts</p>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => addToast('Successfully saved!', 'success')} className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">Success</button>
          <button onClick={() => addToast('An error occurred.', 'error')} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">Error</button>
          <button onClick={() => addToast('This action cannot be undone.', 'warning')} className="rounded-lg bg-yellow-600 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-700">Warning</button>
          <button onClick={() => addToast('New updates available.', 'info')} className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700">Info</button>
        </div>
      </div>

      {/* Toast container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((t) => (
          <DemoToast key={t.id} message={t.message} type={t.type} onClose={() => removeToast(t.id)} />
        ))}
      </div>

      <p className="text-xs text-gray-400">
        Toasts auto-dismiss after 3 seconds. Each type has a distinct color scheme.
      </p>
    </div>
  );
}
