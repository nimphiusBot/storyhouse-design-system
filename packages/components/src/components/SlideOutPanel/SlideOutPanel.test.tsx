import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SlideOutPanel } from './index';

describe('SlideOutPanel', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    title: 'Settings Panel',
  };

  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <SlideOutPanel {...defaultProps} isOpen={false}>
        Content
      </SlideOutPanel>
    );
    expect(container.innerHTML).toBe('');
  });

  it('renders content when isOpen is true', () => {
    render(<SlideOutPanel {...defaultProps}>Content</SlideOutPanel>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders title', () => {
    render(<SlideOutPanel title="Settings" isOpen onClose={vi.fn()}>Content</SlideOutPanel>);
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('renders subtitle', () => {
    render(
      <SlideOutPanel title="Settings" subtitle="Manage your preferences" isOpen onClose={vi.fn()}>
        Content
      </SlideOutPanel>
    );
    expect(screen.getByText('Manage your preferences')).toBeInTheDocument();
  });

  it('renders with aria-modal dialog role', () => {
    render(<SlideOutPanel {...defaultProps}>Content</SlideOutPanel>);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('has accessible title reference via aria-labelledby', () => {
    render(<SlideOutPanel {...defaultProps}>Content</SlideOutPanel>);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-labelledby', 'slide-out-panel-title');
  });

  it('renders close button', () => {
    render(<SlideOutPanel {...defaultProps}>Content</SlideOutPanel>);
    expect(screen.getByLabelText('Close panel')).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', () => {
    const onClose = vi.fn();
    render(
      <SlideOutPanel title="Settings" isOpen onClose={onClose}>
        Content
      </SlideOutPanel>
    );
    fireEvent.click(screen.getByLabelText('Close panel'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop is clicked', () => {
    const onClose = vi.fn();
    render(
      <SlideOutPanel title="Settings" isOpen onClose={onClose}>
        Content
      </SlideOutPanel>
    );
    // Backdrop is the first absolute inset-0 div
    const backdrop = document.querySelector('.fixed.inset-0 > .absolute.inset-0');
    expect(backdrop).toBeInTheDocument();
    fireEvent.click(backdrop!);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('applies size class', () => {
    const { rerender } = render(
      <SlideOutPanel {...defaultProps} size="sm">Content</SlideOutPanel>
    );
    let dialog = screen.getByRole('dialog');
    expect(dialog.className).toContain('max-w-md');

    rerender(
      <SlideOutPanel {...defaultProps} size="xl">Content</SlideOutPanel>
    );
    dialog = screen.getByRole('dialog');
    expect(dialog.className).toContain('max-w-4xl');
  });

  it('renders with custom z-index via fixed inset-0 z-50', () => {
    const { container } = render(<SlideOutPanel {...defaultProps}>Content</SlideOutPanel>);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('z-50');
  });

  it('renders children in content area', () => {
    render(
      <SlideOutPanel {...defaultProps}>
        <div data-testid="child">Child content</div>
      </SlideOutPanel>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('has tabIndex on panel for focus management', () => {
    render(<SlideOutPanel {...defaultProps}>Content</SlideOutPanel>);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('tabindex', '-1');
  });
});
