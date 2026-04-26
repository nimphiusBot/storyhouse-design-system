import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import { SlidePanel } from './SlidePanel';

describe('SlidePanel', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <SlidePanel isOpen={false} onClose={() => {}} title="Test Panel">
        <p>Content</p>
      </SlidePanel>,
    );
    expect(container.innerHTML).toBe('');
  });

  it('renders content when isOpen is true', () => {
    render(
      <SlidePanel isOpen={true} onClose={() => {}} title="Test Panel">
        <p>Content</p>
      </SlidePanel>,
    );
    expect(screen.getByText('Test Panel')).toBeTruthy();
    expect(screen.getByText('Content')).toBeTruthy();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(
      <SlidePanel isOpen={true} onClose={onClose} title="Test Panel">
        <p>Content</p>
      </SlidePanel>,
    );
    const closeButton = screen.getByLabelText('Close panel');
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose when overlay is clicked and closeOnOverlayClick is true', () => {
    const onClose = vi.fn();
    render(
      <SlidePanel isOpen={true} onClose={onClose} title="Test Panel">
        <p>Content</p>
      </SlidePanel>,
    );
    // Find the overlay (backdrop) — it's the first element inside the portal wrapper
    // with the transition-opacity class (not siblings modified by body-scroll-lock).
    const portal = document.querySelector('.fixed.inset-0.z-50');
    expect(portal).toBeTruthy();
    const overlay = portal?.querySelector('[aria-hidden="true"]');
    expect(overlay).toBeTruthy();
    if (overlay) fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('does not call onClose when overlay is clicked and closeOnOverlayClick is false', () => {
    const onClose = vi.fn();
    render(
      <SlidePanel isOpen={true} onClose={onClose} closeOnOverlayClick={false} title="Test Panel">
        <p>Content</p>
      </SlidePanel>,
    );
    const portal = document.querySelector('.fixed.inset-0.z-50');
    const overlay = portal?.querySelector('[aria-hidden="true"]');
    if (overlay) fireEvent.click(overlay);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose on Escape key when closeOnEscape is true', () => {
    const onClose = vi.fn();
    render(
      <SlidePanel isOpen={true} onClose={onClose} title="Test Panel">
        <p>Content</p>
      </SlidePanel>,
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('does not call onClose on Escape key when closeOnEscape is false', () => {
    const onClose = vi.fn();
    render(
      <SlidePanel isOpen={true} onClose={onClose} closeOnEscape={false} title="Test Panel">
        <p>Content</p>
      </SlidePanel>,
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('sets aria-modal to true on the dialog', () => {
    render(
      <SlidePanel isOpen={true} onClose={() => {}} title="Test Panel">
        <p>Content</p>
      </SlidePanel>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog.getAttribute('aria-modal')).toBe('true');
  });

  it('renders subtitle when provided', () => {
    render(
      <SlidePanel isOpen={true} onClose={() => {}} title="Test" subtitle="Sub">
        <p>Content</p>
      </SlidePanel>,
    );
    expect(screen.getByText('Sub')).toBeTruthy();
  });

  it('renders footer when provided', () => {
    render(
      <SlidePanel isOpen={true} onClose={() => {}} title="Test" footer={<button>Save</button>}>
        <p>Content</p>
      </SlidePanel>,
    );
    expect(screen.getByText('Save')).toBeTruthy();
  });

  it('applies custom className to the panel', () => {
    render(
      <SlidePanel isOpen={true} onClose={() => {}} title="Test" className="custom-panel">
        <p>Content</p>
      </SlidePanel>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog.className).toContain('custom-panel');
  });

  it('renders custom header when provided', () => {
    render(
      <SlidePanel
        isOpen={true}
        onClose={() => {}}
        header={<div data-testid="custom-header">Custom Header</div>}
      >
        <p>Content</p>
      </SlidePanel>,
    );
    expect(screen.getByTestId('custom-header')).toBeTruthy();
  });

  it('calls onCloseComplete after close animation completes', () => {
    vi.useFakeTimers();
    const onCloseComplete = vi.fn();
    const { rerender } = render(
      <SlidePanel isOpen={true} onClose={() => {}} onCloseComplete={onCloseComplete} title="Test">
        <p>Content</p>
      </SlidePanel>,
    );

    rerender(
      <SlidePanel isOpen={false} onClose={() => {}} onCloseComplete={onCloseComplete} title="Test">
        <p>Content</p>
      </SlidePanel>,
    );

    vi.advanceTimersByTime(350);
    expect(onCloseComplete).toHaveBeenCalledOnce();
    vi.useRealTimers();
  });

  it('focuses the close button (first focusable) when opened', async () => {
    render(
      <SlidePanel isOpen={true} onClose={() => {}} title="Test Panel">
        <p>Just text content</p>
      </SlidePanel>,
    );

    // Wait for RAF-driven auto-focus in JSDOM
    await new Promise((r) => requestAnimationFrame(r));

    expect(document.activeElement).toBe(screen.getByLabelText('Close panel'));
  });

  it('wraps Tab from last element to first', () => {
    render(
      <SlidePanel isOpen={true} onClose={() => {}} title="Test Panel">
        <button data-testid="btn1">Button 1</button>
        <button data-testid="btn2">Button 2</button>
      </SlidePanel>,
    );

    const closeBtn = screen.getByLabelText('Close panel');
    const btn2 = screen.getByTestId('btn2');

    btn2.focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(document.activeElement).toBe(closeBtn);
  });

  it('wraps Shift+Tab from first element to last', () => {
    render(
      <SlidePanel isOpen={true} onClose={() => {}} title="Test Panel">
        <button data-testid="btn1">Button 1</button>
        <button data-testid="btn2">Button 2</button>
      </SlidePanel>,
    );

    const closeBtn = screen.getByLabelText('Close panel');
    const btn2 = screen.getByTestId('btn2');

    closeBtn.focus();
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(btn2);
  });

  it('wraps Tab from outside the trap to first focusable element', () => {
    render(
      <SlidePanel isOpen={true} onClose={() => {}} title="Test Panel">
        <button data-testid="btn1">Button 1</button>
      </SlidePanel>,
    );

    const closeBtn = screen.getByLabelText('Close panel');

    document.body.focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(document.activeElement).toBe(closeBtn);
  });

  it('does not intercept Tab when focus is inside the trap not at boundary', () => {
    render(
      <SlidePanel isOpen={true} onClose={() => {}} title="Test Panel">
        <button data-testid="btn1">Button 1</button>
        <button data-testid="btn2">Button 2</button>
      </SlidePanel>,
    );

    const btn2 = screen.getByTestId('btn2');

    // btn2 is not the last element in the trap (closeBtn is last)
    btn2.focus();

    const preventDefaultSpy = vi.fn();
    const stopper = (e: KeyboardEvent) => {
      if (e.defaultPrevented) preventDefaultSpy();
    };
    document.addEventListener('keydown', stopper);

    fireEvent.keyDown(document, { key: 'Tab' });

    // Handler should not have intercepted (btn2 is not last)
    expect(preventDefaultSpy).not.toHaveBeenCalled();
    document.removeEventListener('keydown', stopper);
  });

  it('renders with role="dialog"', () => {
    render(
      <SlidePanel isOpen={true} onClose={() => {}} title="Test Panel">
        <p>Content</p>
      </SlidePanel>,
    );
    expect(screen.getByRole('dialog')).toBeTruthy();
  });

  it('renders with correct aria-labelledby when title is provided', () => {
    render(
      <SlidePanel isOpen={true} onClose={() => {}} title="Test Title">
        <p>Content</p>
      </SlidePanel>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog.getAttribute('aria-labelledby')).toBe('slide-panel-title');
  });
});
