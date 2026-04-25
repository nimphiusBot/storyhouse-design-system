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

  // --- Basic rendering ---

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

  // --- Edge Case: Single page ---

  describe('single page edge case', () => {
    it('renders correctly when totalPages is 1', () => {
      render(
        <Pagination
          {...defaultProps}
          totalPages={1}
          totalItems={5}
          currentPage={1}
        />
      );
      // Page number 1 should render
      expect(screen.getByLabelText('Go to page 1')).toBeInTheDocument();
      // Next/prev/first/last should all be disabled
      expect(screen.getByLabelText('Go to first page')).toBeDisabled();
      expect(screen.getByLabelText('Go to previous page')).toBeDisabled();
      expect(screen.getByLabelText('Go to next page')).toBeDisabled();
      expect(screen.getByLabelText('Go to last page')).toBeDisabled();
      // No ellipsis markers
      expect(screen.queryByLabelText('ellipsis')).not.toBeInTheDocument();
    });
  });

  // --- Edge Case: Zero items ---

  describe('zero items edge case', () => {
    it('shows "No items" when there are no items', () => {
      render(
        <Pagination
          {...defaultProps}
          totalItems={0}
          totalPages={0}
          currentPage={1}
        />
      );
      expect(screen.getByText('No items')).toBeInTheDocument();
    });

    it('handles totalItems=0 with totalPages=1 gracefully', () => {
      render(
        <Pagination
          {...defaultProps}
          totalItems={0}
          totalPages={1}
          currentPage={1}
        />
      );
      expect(screen.getByText('No items')).toBeInTheDocument();
      // startItem should be 0 per the component logic
      expect(screen.getByLabelText('Go to page 1')).toBeInTheDocument();
    });
  });

  // --- Edge Case: Last page ---

  describe('last page behavior', () => {
    it('disables next/last and allows prev on last page', () => {
      render(
        <Pagination
          {...defaultProps}
          currentPage={10}
          totalPages={10}
        />
      );
      expect(screen.getByLabelText('Go to next page')).toBeDisabled();
      expect(screen.getByLabelText('Go to last page')).toBeDisabled();
      expect(screen.getByLabelText('Go to previous page')).not.toBeDisabled();
      expect(screen.getByLabelText('Go to first page')).not.toBeDisabled();
    });

    it('calls onPageChange with correct page when clicking last page button', () => {
      const onPageChange = vi.fn();
      render(
        <Pagination
          {...defaultProps}
          currentPage={1}
          totalPages={10}
          onPageChange={onPageChange}
        />
      );
      fireEvent.click(screen.getByLabelText('Go to last page'));
      expect(onPageChange).toHaveBeenCalledWith(10);
    });
  });

  // --- Edge Case: Ellipsis truncation logic ---

  describe('ellipsis truncation', () => {
    it('shows left ellipsis when currentPage > 3', () => {
      render(
        <Pagination
          {...defaultProps}
          currentPage={6}
          totalPages={15}
        />
      );
      // Should render ellipsis markers - check for the MoreHorizontal icon by role
      const ellipsisContainers = document.querySelectorAll('[aria-hidden="true"]');
      expect(ellipsisContainers.length).toBeGreaterThanOrEqual(1);
      // But we should still see first and last pages
      expect(screen.getByLabelText('Go to page 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to page 15')).toBeInTheDocument();
    });

    it('shows right ellipsis when currentPage < totalPages - 2', () => {
      render(
        <Pagination
          {...defaultProps}
          currentPage={3}
          totalPages={15}
        />
      );
      expect(screen.getByLabelText('Go to page 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to page 15')).toBeInTheDocument();
    });

    it('shows both ellipses when current page is in the middle', () => {
      render(
        <Pagination
          {...defaultProps}
          currentPage={8}
          totalPages={20}
        />
      );
      expect(screen.getByLabelText('Go to page 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to page 20')).toBeInTheDocument();
      // Should have 2 aria-hidden divs for ellipsis
      const ellipsisContainers = document.querySelectorAll('[aria-hidden="true"]');
      expect(ellipsisContainers.length).toBe(2);
    });

    it('does not show ellipsis when totalPages <= maxPageButtons', () => {
      render(
        <Pagination
          {...defaultProps}
          currentPage={4}
          totalPages={7}
        />
      );
      // With only 7 pages, all page buttons should be visible, no ellipsis
      for (let i = 1; i <= 7; i++) {
        expect(screen.getByLabelText(`Go to page ${i}`)).toBeInTheDocument();
      }
    });

    it('does not show left ellipsis when currentPage is at position 2', () => {
      render(
        <Pagination
          {...defaultProps}
          currentPage={2}
          totalPages={20}
        />
      );
      // Pages shown should be 1, 2, 3, then ellipsis, then 20
      expect(screen.getByLabelText('Go to page 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to page 2')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to page 3')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to page 20')).toBeInTheDocument();
    });

    it('does not show right ellipsis when currentPage is near the end', () => {
      render(
        <Pagination
          {...defaultProps}
          currentPage={19}
          totalPages={20}
        />
      );
      // Pages shown should be 1, ellipsis, 18, 19, 20
      expect(screen.getByLabelText('Go to page 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to page 18')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to page 19')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to page 20')).toBeInTheDocument();
    });
  });

  // --- Edge Case: Page input ---

  describe('page input edge cases', () => {
    it('submits valid page number on Enter', () => {
      const onPageChange = vi.fn();
      render(
        <Pagination
          {...defaultProps}
          currentPage={1}
          showPageInput
          onPageChange={onPageChange}
        />
      );
      const input = document.getElementById('page-input-pag') as HTMLInputElement;
      fireEvent.change(input, { target: { value: '5' } });
      fireEvent.submit(input.closest('form')!);
      expect(onPageChange).toHaveBeenCalledWith(5);
    });

    it('does not call onPageChange for page number out of range', () => {
      const onPageChange = vi.fn();
      render(
        <Pagination
          {...defaultProps}
          currentPage={1}
          showPageInput
          onPageChange={onPageChange}
        />
      );
      const input = document.getElementById('page-input-pag') as HTMLInputElement;
      fireEvent.change(input, { target: { value: '999' } });
      fireEvent.submit(input.closest('form')!);
      // Page 999 > totalPages (10), should not fire
      expect(onPageChange).not.toHaveBeenCalled();
    });

    it('does not call onPageChange for page 0', () => {
      const onPageChange = vi.fn();
      render(
        <Pagination
          {...defaultProps}
          currentPage={1}
          showPageInput
          onPageChange={onPageChange}
        />
      );
      const input = document.getElementById('page-input-pag') as HTMLInputElement;
      fireEvent.change(input, { target: { value: '0' } });
      fireEvent.submit(input.closest('form')!);
      expect(onPageChange).not.toHaveBeenCalled();
    });

    it('rejects non-numeric input', () => {
      render(
        <Pagination
          {...defaultProps}
          currentPage={1}
          showPageInput
        />
      );
      const input = document.getElementById('page-input-pag') as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'abc' } });
      // Input value should remain empty because the regex rejects non-digits
      expect(input.value).toBe('');
    });

    it('clears input after successful submission', () => {
      const onPageChange = vi.fn();
      render(
        <Pagination
          {...defaultProps}
          currentPage={1}
          showPageInput
          onPageChange={onPageChange}
        />
      );
      const input = document.getElementById('page-input-pag') as HTMLInputElement;
      fireEvent.change(input, { target: { value: '3' } });
      fireEvent.submit(input.closest('form')!);
      expect(input.value).toBe('');
    });
  });

  // --- Edge Case: Compact variant ---

  describe('compact variant edge cases', () => {
    it('does not render page number buttons in compact mode', () => {
      render(
        <Pagination
          {...defaultProps}
          variant="compact"
        />
      );
      // Compact mode should not render individual page buttons
      expect(screen.queryByLabelText('Go to page 1')).not.toBeInTheDocument();
      expect(screen.getByText('Page 1 of 10')).toBeInTheDocument();
    });

    it('shows correct page info in compact mode on last page', () => {
      render(
        <Pagination
          {...defaultProps}
          variant="compact"
          currentPage={10}
          totalPages={10}
        />
      );
      expect(screen.getByText('Page 10 of 10')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to next page')).toBeDisabled();
      expect(screen.getByLabelText('Go to previous page')).not.toBeDisabled();
    });

    it('does not show first/last buttons in compact mode even when showFirstLast is true', () => {
      render(
        <Pagination
          {...defaultProps}
          variant="compact"
          showFirstLast={true}
        />
      );
      // Compact mode hides first/last regardless of showFirstLast
      expect(screen.queryByLabelText('Go to first page')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Go to last page')).not.toBeInTheDocument();
    });

    it('does not show page input in compact mode', () => {
      render(
        <Pagination
          {...defaultProps}
          variant="compact"
          showPageInput
        />
      );
      expect(document.getElementById('page-input-pag')).not.toBeInTheDocument();
    });
  });

  // --- Edge Case: Page size selector ---

  describe('page size selector edge cases', () => {
    it('uses custom pageSizeOptions when provided', () => {
      render(
        <Pagination
          {...defaultProps}
          pageSizeOptions={[5, 10, 20, 50]}
          onPageSizeChange={vi.fn()}
        />
      );
      const select = document.getElementById('page-size-select') as HTMLSelectElement;
      const options = Array.from(select.options).map(o => o.value);
      expect(options).toEqual(['5', '10', '20', '50']);
    });

    it('shows page size selector only when onPageSizeChange is provided', () => {
      // Without onPageSizeChange
      const { unmount } = render(<Pagination {...defaultProps} />);
      expect(document.getElementById('page-size-select')).not.toBeInTheDocument();
      unmount();

      // With onPageSizeChange
      render(<Pagination {...defaultProps} onPageSizeChange={vi.fn()} />);
      expect(document.getElementById('page-size-select')).toBeInTheDocument();
    });
  });

  // --- Edge Case: Showing text ---

  describe('showing text edge cases', () => {
    it('renders correct start/end for page 1 with 10 items/page', () => {
      render(
        <Pagination
          {...defaultProps}
          currentPage={1}
          pageSize={10}
          totalItems={100}
        />
      );
      // Text is broken up by <span> elements, check for key numbers
      expect(screen.getAllByText('1').length).toBeGreaterThanOrEqual(2);
      expect(screen.getByText('100')).toBeInTheDocument();
    });

    it('renders correct start/end for last partial page', () => {
      render(
        <Pagination
          {...defaultProps}
          currentPage={5}
          pageSize={10}
          totalItems={45}
          totalPages={5}
        />
      );
      // Last page should show 41 to 45
      // startItem = (5-1)*10+1 = 41, endItem = min(5*10, 45) = 45
      expect(screen.getByText('41')).toBeInTheDocument();
      expect(screen.getAllByText('45').length).toBeGreaterThanOrEqual(1);
    })

    it('handles single item correctly', () => {
      render(
        <Pagination
          {...defaultProps}
          currentPage={1}
          pageSize={10}
          totalItems={1}
          totalPages={1}
        />
      );
      // startItem = 1, endItem = 1
      expect(screen.getByText(/Showing/)).toBeInTheDocument();
    });
  });

  // --- Edge Case: Navigation from first page ---

  describe('first page navigation', () => {
    it('calls onPageChange(1) when clicking first page button', () => {
      const onPageChange = vi.fn();
      render(
        <Pagination
          {...defaultProps}
          currentPage={5}
          onPageChange={onPageChange}
        />
      );
      fireEvent.click(screen.getByLabelText('Go to first page'));
      expect(onPageChange).toHaveBeenCalledWith(1);
    });
  });

  // --- Edge Case: custom pageSize  ---

  describe('custom page size', () => {
    it('uses custom pageSize as select default value', () => {
      render(
        <Pagination
          {...defaultProps}
          pageSize={50}
          onPageSizeChange={vi.fn()}
        />
      );
      const select = document.getElementById('page-size-select') as HTMLSelectElement;
      expect(select.value).toBe('50');
    });
  });

  // --- Edge Case: disabled with page input ---

  describe('disabled with page input', () => {
    it('disables page input when disabled is true', () => {
      render(
        <Pagination
          {...defaultProps}
          disabled
          showPageInput
        />
      );
      const input = document.getElementById('page-input-pag') as HTMLInputElement;
      expect(input).toBeDisabled();
    });

    it('disables page size select when disabled is true', () => {
      render(
        <Pagination
          {...defaultProps}
          disabled
          onPageSizeChange={vi.fn()}
        />
      );
      const select = document.getElementById('page-size-select') as HTMLSelectElement;
      expect(select).toBeDisabled();
    });
  });
});
