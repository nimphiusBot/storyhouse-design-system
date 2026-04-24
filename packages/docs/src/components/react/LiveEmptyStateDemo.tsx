import React from 'react';

export default function LiveEmptyStateDemo(): React.ReactNode {
  const [variant, setVariant] = React.useState(0);
  const variants = [
    { title: 'No data available', desc: 'There are no items to display right now.', icon: '📊' },
    { title: 'No results found', desc: 'Try adjusting your search or filter criteria.', icon: '🔍' },
    { title: 'Something went wrong', desc: 'An error occurred. Please try again.', icon: '⚠️' },
    { title: 'Access denied', desc: 'You don\'t have permission to view this.', icon: '🔒' },
  ];
  const v = variants[variant];

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500">Cycle Through Variants</p>
        <div className="flex gap-2 mb-4">
          {variants.map((_, i) => (
            <button
              key={i}
              onClick={() => setVariant(i)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium ${variant === i ? 'bg-orange-600 text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            >
              {variants[i].icon} {variants[i].title.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="border-2 border-dashed border-gray-200 rounded-lg p-8">
        <div className="flex flex-col items-center justify-center text-center py-8">
          <span className="text-5xl mb-4">{v.icon}</span>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{v.title}</h3>
          <p className="text-sm text-gray-500 mb-6 max-w-sm">{v.desc}</p>
          <button className="inline-flex items-center justify-center rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700">
            {variant === 0 ? 'Create Item' : variant === 2 ? 'Retry' : 'Go Back'}
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-400">
        EmptyState provides consistent empty, error, and no-results displays with optional actions.
      </p>
    </div>
  );
}
