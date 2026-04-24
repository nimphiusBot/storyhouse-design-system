import React from 'react';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
}

const sampleData = [
  { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active' },
  { name: 'Carol Williams', email: 'carol@example.com', role: 'Viewer', status: 'Inactive' },
  { name: 'Dave Brown', email: 'dave@example.com', role: 'Editor', status: 'Pending' },
  { name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'Active' },
];

const columns: Column[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'status', label: 'Status', align: 'center' },
];

function StatusBadge({ status }: { status: string }) {
  const colorMap: Record<string, string> = {
    Active: 'bg-green-100 text-green-800 border-green-200',
    Inactive: 'bg-gray-100 text-gray-800 border-gray-200',
    Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  };
  return (
    <span className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full border ${colorMap[status] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
      {status}
    </span>
  );
}

export default function LiveDataTableDemo(): React.ReactNode {
  const [sortKey, setSortKey] = React.useState<string>('');
  const [sortAsc, setSortAsc] = React.useState(true);
  const [selected, setSelected] = React.useState<Set<number>>(new Set());

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortKey) return sampleData;
    return [...sampleData].sort((a: Record<string, string>, b: Record<string, string>) => {
      const val = a[sortKey].localeCompare(b[sortKey]);
      return sortAsc ? val : -val;
    });
  }, [sortKey, sortAsc]);

  const allSelected = sortedData.length > 0 && selected.size === sortedData.length;

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500">Users Table</p>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={() => {
                      if (allSelected) setSelected(new Set());
                      else setSelected(new Set(sortedData.map((_, i) => i)));
                    }}
                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 h-4 w-4"
                  />
                </th>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`px-4 py-3 text-${col.align || 'left'} text-xs font-semibold text-gray-600 uppercase tracking-wider ${col.sortable ? 'cursor-pointer hover:text-gray-900 select-none' : ''}`}
                    onClick={() => col.sortable && handleSort(col.key)}
                  >
                    <div className="flex items-center gap-1">
                      {col.label}
                      {sortKey === col.key && (
                        <span className="text-orange-600">{sortAsc ? '\u2191' : '\u2193'}</span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedData.map((row, idx) => (
                <tr key={idx} className={`hover:bg-gray-50 transition-colors ${selected.has(idx) ? 'bg-orange-50' : ''}`}>
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selected.has(idx)}
                      onChange={() => {
                        const s = new Set(selected);
                        s.has(idx) ? s.delete(idx) : s.add(idx);
                        setSelected(s);
                      }}
                      className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 h-4 w-4"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">{row.name}</td>
                  <td className="px-4 py-3 text-gray-600">{row.email}</td>
                  <td className="px-4 py-3 text-gray-500 capitalize">{row.role}</td>
                  <td className="px-4 py-3 text-center"><StatusBadge status={row.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-gray-400">
        DataTable supports sorting, row selection, custom cell rendering, and responsive layout.
      </p>
    </div>
  );
}
