import React, { useState } from 'react';

export default function LivePaginationDemo(): React.ReactNode {
  const [page, setPage] = useState(1);
  const totalPages = 20;

  const getPageNumbers = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | string)[] = [1];
    if (page > 3) pages.push('...');
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (page < totalPages - 2) pages.push('...');
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500">Paginated Navigation</p>
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="text-sm text-gray-600 mb-4">
            Showing page <span className="font-medium">{page}</span> of <span className="font-medium">{totalPages}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(1)}
              disabled={page === 1}
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none h-8 min-w-[2rem]"
              aria-label="First page"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="inline-flex items-center justify-center gap-1 rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none h-8"
              aria-label="Previous page"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline text-xs">Previous</span>
            </button>

            {pageNumbers.map((p, i) =>
              p === '...' ? (
                <div key={`e${i}`} className="flex items-center justify-center w-10 h-10 text-gray-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01" />
                  </svg>
                </div>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p as number)}
                  className={`inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium h-10 min-w-[2.5rem] ${
                    page === p
                      ? 'bg-orange-600 text-white pointer-events-none'
                      : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  aria-label={`Page ${p}`}
                  aria-current={page === p ? 'page' : undefined}
                >
                  {p}
                </button>
              )
            )}

            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="inline-flex items-center justify-center gap-1 rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none h-8"
              aria-label="Next page"
            >
              <span className="hidden sm:inline text-xs">Next</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none h-8 min-w-[2rem]"
              aria-label="Last page"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-400">
        Click page numbers to navigate. Supports intelligent ellipsis for large page counts.
      </p>
    </div>
  );
}
