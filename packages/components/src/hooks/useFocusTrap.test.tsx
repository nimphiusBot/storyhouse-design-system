import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React, { useRef } from 'react';
import { useFocusTrap } from './useFocusTrap';

/**
 * In JSDOM, requestAnimationFrame is NOT synchronous (it fires after
 * ~16ms). Tests that verify auto-focus must account for this delay.
 *
 * Tab/Shift+Tab event handling IS synchronous — tested directly.
 */

function TrapContainer({ enabled, initialFocusSelector, withFocusable = true }: {
  enabled: boolean;
  initialFocusSelector?: string;
  withFocusable?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useFocusTrap({
    enabled,
    containerRef,
    autoFocus: enabled,
    initialFocusSelector,
  });

  return (
    <div>
      <button data-testid="outside-before">Outside Before</button>
      <div ref={containerRef} data-testid="trap-container" tabIndex={-1}>
        {withFocusable ? (
          <>
            <button data-testid="first">First</button>
            <input data-testid="middle" placeholder="Middle" />
            <a href="#" data-testid="last">Last</a>
          </>
        ) : (
          <span>Static text</span>
        )}
        {initialFocusSelector && (
          <button data-testid="custom-initial" className="initial-target">
            Custom Initial
          </button>
        )}
      </div>
      <button data-testid="outside-after">Outside After</button>
    </div>
  );
}

describe('useFocusTrap', () => {
  it('focuses the first focusable element when enabled with autoFocus', async () => {
    render(<TrapContainer enabled={true} />);

    // JSDOM requestAnimationFrame: wait for the async RAF callback
    await new Promise((r) => requestAnimationFrame(r));

    expect(document.activeElement).toBe(screen.getByTestId('first'));
  });

  it('does not trap focus when disabled', () => {
    render(<TrapContainer enabled={false} />);

    document.body.focus();
    expect(document.activeElement).toBe(document.body);
  });

  it('focuses element matching initialFocusSelector when provided', async () => {
    render(<TrapContainer enabled={true} initialFocusSelector=".initial-target" />);

    await new Promise((r) => requestAnimationFrame(r));

    expect(document.activeElement).toBe(screen.getByTestId('custom-initial'));
  });

  it('wraps Tab forward from last to first element', () => {
    render(<TrapContainer enabled={true} />);

    const first = screen.getByTestId('first');
    const last = screen.getByTestId('last');

    last.focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(document.activeElement).toBe(first);
  });

  it('wraps Shift+Tab from first to last element', () => {
    render(<TrapContainer enabled={true} />);

    const first = screen.getByTestId('first');
    const last = screen.getByTestId('last');

    first.focus();
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(last);
  });

  it('wraps Tab to first element when focus is outside the trap', () => {
    render(<TrapContainer enabled={true} />);

    const first = screen.getByTestId('first');

    document.body.focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(document.activeElement).toBe(first);
  });

  it('does not wrap Tab forward from middle element', () => {
    render(<TrapContainer enabled={true} />);

    const first = screen.getByTestId('first');

    first.focus();
    // currentIndex=0, not at last boundary → no wrap
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(document.activeElement).toBe(first);
  });

  it('does not wrap Shift+Tab from last element', () => {
    render(<TrapContainer enabled={true} />);

    const last = screen.getByTestId('last');

    last.focus();
    // currentIndex=2, shiftKey=true, > 0 → no wrap
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(last);
  });

  it('focuses the container when no focusable elements exist', async () => {
    render(<TrapContainer enabled={true} withFocusable={false} />);

    await new Promise((r) => requestAnimationFrame(r));

    const container = screen.getByTestId('trap-container');
    expect(document.activeElement).toBe(container);
  });

  it('does not intercept non-Tab keys', () => {
    render(<TrapContainer enabled={true} />);

    const outsideAfter = screen.getByTestId('outside-after');
    outsideAfter.focus();

    const preventDefaultSpy = vi.fn();
    const listener = (e: KeyboardEvent) => {
      if (e.defaultPrevented) preventDefaultSpy();
    };
    document.addEventListener('keydown', listener);

    fireEvent.keyDown(document, { key: 'ArrowDown' });

    expect(preventDefaultSpy).not.toHaveBeenCalled();
    document.removeEventListener('keydown', listener);
  });
});
