import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { DataTable, Badge, Button } from './stubs';
import { Pencil, Trash2 } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
}

const sampleData: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'active' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'active' },
  { id: 3, name: 'Carol Williams', email: 'carol@example.com', role: 'Viewer', status: 'inactive' },
  { id: 4, name: 'Dave Brown', email: 'dave@example.com', role: 'Editor', status: 'pending' },
  { id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'active' },
];

const columns = [
  {
    key: 'name',
    label: 'Name',
    sortable: true,
    render: (user: User) => <span className="font-medium text-gray-900">{user.name}</span>,
  },
  {
    key: 'email',
    label: 'Email',
    sortable: true,
    render: (user: User) => <span className="text-gray-600">{user.email}</span>,
  },
  {
    key: 'role',
    label: 'Role',
    sortable: true,
    render: (user: User) => <span className="text-gray-500 capitalize">{user.role}</span>,
  },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    render: (user: User) => (
      <Badge
        variant={user.status === 'active' ? 'success' : user.status === 'pending' ? 'warning' : 'neutral'}
        size="sm"
      >
        {user.status}
      </Badge>
    ),
  },
  {
    key: 'actions',
    label: 'Actions',
    align: 'right' as const,
    render: () => (
      <div className="flex justify-end gap-2">
        <button className="text-gray-400 hover:text-orange-600 transition-colors">
          <Pencil className="w-4 h-4" />
        </button>
        <button className="text-gray-400 hover:text-red-600 transition-colors">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    ),
  },
];

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const Default: Story = {
  render: () => <DataTable data={sampleData} columns={columns} />,
};

export const Selectable: Story = {
  render: () => {
    const [selected, setSelected] = useState<Set<string | number>>(new Set());
    return (
      <DataTable
        data={sampleData}
        columns={columns}
        selectable
        selectedRows={selected}
        onSelectionChange={setSelected}
      />
    );
  },
};

export const Sortable: Story = {
  render: () => <DataTable data={sampleData} columns={columns} sortable />,
};

export const Striped: Story = {
  render: () => <DataTable data={sampleData} columns={columns} striped />,
};

export const Dense: Story = {
  render: () => <DataTable data={sampleData} columns={columns} dense />,
};

export const Loading: Story = {
  render: () => <DataTable data={[]} columns={columns} loading />,
};

export const Empty: Story = {
  render: () => (
    <DataTable
      data={[]}
      columns={columns}
      empty={{ title: 'No users found', description: 'There are no users matching your criteria.' }}
    />
  ),
};

export const Expandable: Story = {
  render: () => {
    const [expandedData] = useState(sampleData.slice(0, 2));
    return (
      <DataTable
        data={expandedData}
        columns={columns.slice(0, 3)}
        expandable
        renderExpandedRow={(user: User) => (
          <div className="p-4 space-y-2">
            <p className="text-sm font-medium">User Details</p>
            <p className="text-sm text-gray-600">Email: {user.email}</p>
            <p className="text-sm text-gray-600">Role: {user.role}</p>
          </div>
        )}
      />
    );
  },
};
