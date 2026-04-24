import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Pagination } from './stubs';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'compact'] },
    showFirstLast: { control: 'boolean' },
    showPageSize: { control: 'boolean' },
    showTotal: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: (args) => {
    const [page, setPage] = useState(1);
    return <Pagination {...args} currentPage={page} onPageChange={setPage} />;
  },
  args: {
    totalPages: 20,
    pageSize: 10,
    totalItems: 200,
    onPageSizeChange: () => {},
  },
};

export const FewPages: Story = {
  render: (args) => {
    const [page, setPage] = useState(1);
    return <Pagination {...args} currentPage={page} onPageChange={setPage} />;
  },
  args: {
    totalPages: 3,
    pageSize: 10,
    totalItems: 25,
  },
};

export const ManyPages: Story = {
  render: (args) => {
    const [page, setPage] = useState(50);
    return <Pagination {...args} currentPage={page} onPageChange={setPage} />;
  },
  args: {
    totalPages: 100,
    pageSize: 25,
    totalItems: 2500,
  },
};

export const Compact: Story = {
  render: (args) => {
    const [page, setPage] = useState(3);
    return <Pagination {...args} currentPage={page} onPageChange={setPage} />;
  },
  args: {
    variant: 'compact',
    totalPages: 15,
    pageSize: 10,
    totalItems: 150,
    showFirstLast: false,
    showPageSize: false,
    showTotal: true,
  },
};

export const WithoutPageSize: Story = {
  render: (args) => {
    const [page, setPage] = useState(1);
    return <Pagination {...args} currentPage={page} onPageChange={setPage} />;
  },
  args: {
    totalPages: 10,
    pageSize: 20,
    totalItems: 200,
    showPageSize: false,
    showPageInput: true,
  },
};

export const Empty: Story = {
  render: (args) => {
    const [page, setPage] = useState(1);
    return <Pagination {...args} currentPage={page} onPageChange={setPage} />;
  },
  args: {
    totalPages: 0,
    pageSize: 10,
    totalItems: 0,
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [page, setPage] = useState(1);
    return <Pagination {...args} currentPage={page} onPageChange={setPage} />;
  },
  args: {
    totalPages: 10,
    pageSize: 10,
    totalItems: 100,
    disabled: true,
  },
};
