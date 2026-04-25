import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './index';

describe('Pagination', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 10,
    pageSize: 10,
    totalItems: 100,
    onPageChange: vi.fn(),
  };

  it('renders showing text', () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByText(/Showing/)).toBeInTheDocument();
  });

  it('renders first page button', () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByLabelText('Go to first page')).toBeInTheDocument();
  });

  it('renders previous page button', () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByLabelText('Go to previous page')).toBeInTheDocument();
  });

  it('renders next page button', () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByLabelText('Go to next page')).toBeInTheDocument();
  });

  it('renders last page button', () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByLabelText('Go to last page')).toBeInTheDocument();
  });

  it('disables first and previous buttons on page 1', () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByLabelText('Go to first page')).toBeDisabled();
    expect(screen.getByLabelText('Go to previous page')).toBeDisabled();
  });

  it('disables next and last buttons on last page', () => {
    render(
      <Pagination {...defaultProps} currentPage={10} />
    );
    expect(screen.getByLabelText('Go to next page')).toBeDisabled();
    expect(screen.getByLabelText('Go to last page')).toBeDisabled();
  });

  it('calls onPageChange with next page number', () => {
    const onPageChange = vi.fn();
    render(<Pagination {...defaultProps} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByLabelText('Go to next page'));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange with previous page number', () => {
    const onPageChange = vi.fn();
    render(
      <Pagination {...defaultProps} currentPage={5} onPageChange={onPageChange} />
    );
    fireEvent.click(screen.getByLabelText('Go to previous page'));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it('calls onPageChange with page number when clicking page button', () => {
    const onPageChange = vi.fn();
    render(
      <Pagination {...defaultProps} currentPage={1} onPageChange={onPageChange} />
    );
    const page2Btn = screen.getByLabelText('Go to page 2');
    fireEvent.click(page2Btn);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('renders page size selector when showPageSize is true and onPageSizeChange provided', () => {
    const onPageSizeChange = vi.fn();
    render(
      <Pagination
        {...defaultProps}
        onPageSizeChange={onPageSizeChange}
      />
    );
    const select = document.getElementById('page-size-select');
    expect(select).toBeInTheDocument();
  });

  it('hides page size selector when showPageSize is false', () => {
    render(<Pagination {...defaultProps} showPageSize={false} />);
    expect(document.getElementById('page-size-select')).not.toBeInTheDocument();
  });

  it('calls onPageSizeChange when page size is changed', () => {
    const onPageSizeChange = vi.fn();
    render(
      <Pagination
        {...defaultProps}
        onPageSizeChange={onPageSizeChange}
      />
    );
    const select = document.getElementById('page-size-select') as HTMLSelectElement;
    fireEvent.change(select, { target: { value: '25' } });
    expect(onPageSizeChange).toHaveBeenCalledWith(25);
  });

  it('hides total when showTotal is false', () => {
    render(<Pagination {...defaultProps} showTotal={false} />);
    expect(screen.queryByText(/Showing/)).not.toBeInTheDocument();
  });

  it('shows "No items" when totalItems is 0', () => {
    render(
      <Pagination
        {...defaultProps}
        totalItems={0}
        currentPage={1}
        totalPages={1}
      />
    );
    expect(screen.getByText('No items')).toBeInTheDocument();
  });

  it('renders page input when showPageInput is true', () => {
    render(<Pagination {...defaultProps} showPageInput />);
    const input = document.getElementById('page-input-pag');
    expect(input).toBeInTheDocument();
  });

  it('hides first/last buttons when showFirstLast is false', () => {
    render(<Pagination {...defaultProps} showFirstLast={false} />);
    expect(screen.queryByLabelText('Go to first page')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Go to last page')).not.toBeInTheDocument();
  });

  it('renders compact variant', () => {
    render(<Pagination {...defaultProps} variant="compact" />);
    // Compact mode shows "Page X of Y" text
    expect(screen.getByText(/Page 1 of 10/)).toBeInTheDocument();
  });

  it('renders disabled state', () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        {...defaultProps}
        disabled
        currentPage={5}
        onPageChange={onPageChange}
      />
    );
    fireEvent.click(screen.getByLabelText('Go to next page'));
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it('renders page number buttons', () => {
    render(<Pagination {...defaultProps} currentPage={5} />);
    expect(screen.getByLabelText('Go to page 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to page 4')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to page 5')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to page 6')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to page 10')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Pagination {...defaultProps} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('marks current page as aria-current="page"', () => {
    render(<Pagination {...defaultProps} currentPage={3} />);
    const page3Btn = screen.getByLabelText('Go to page 3');
    expect(page3Btn).toHaveAttribute('aria-current', 'page');
  });
});
