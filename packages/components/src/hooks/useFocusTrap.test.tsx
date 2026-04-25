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

/**
 * A portal-based trap to test aria-hidden management.
 * Simulates how SlidePanel/SlideOutPanel render into a portal.
 */
function PortalTrapContainer({ enabled, children }: { enabled: boolean; children?: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useFocusTrap({
    enabled,
    containerRef,
    autoFocus: enabled,
  });

  // Use React portal to simulate actual panel portal rendering
  if (!enabled) return null;

  return (
    <div className="fixed inset-0 z-50" data-testid="portal-wrapper">
      <div
        ref={containerRef}
        data-testid="trap-in-portal"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
      >
        {children || (
          <>
            <button data-testid="portal-btn">Inside</button>
          </>
        )}
      </div>
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

  // ── New: focusout redirection ─────────────────────────────

  it('redirects focus back into the trap when focus escapes via focusout', async () => {
    render(<TrapContainer enabled={true} />);

    await new Promise((r) => requestAnimationFrame(r));

    const container = screen.getByTestId('trap-container');
    const first = screen.getByTestId('first');

    // Simulate focus leaving the container to an element outside
    const outsideEl = document.createElement('button');
    document.body.appendChild(outsideEl);

    fireEvent.focusOut(container, { relatedTarget: outsideEl });

    // Focus should be redirected back to the first focusable element
    expect(document.activeElement).toBe(first);

    document.body.removeChild(outsideEl);
  });

  it('does not redirect focus when relatedTarget is null (browser chrome)', async () => {
    render(<TrapContainer enabled={true} />);

    await new Promise((r) => requestAnimationFrame(r));

    const container = screen.getByTestId('trap-container');
    const first = screen.getByTestId('first');

    // null relatedTarget means focus left the document (browser chrome)
    first.focus();
    fireEvent.focusOut(container, { relatedTarget: null });

    // Focus should NOT be redirected — stays on the first element
    expect(document.activeElement).toBe(first);
  });

  it('does not redirect focus when focus moves within the container', async () => {
    render(<TrapContainer enabled={true} />);

    await new Promise((r) => requestAnimationFrame(r));

    const container = screen.getByTestId('trap-container');
    const first = screen.getByTestId('first');
    const middle = screen.getByTestId('middle');

    // Focus moves from first to middle within the container
    fireEvent.focusOut(first, { relatedTarget: middle });

    // Should NOT redirect since both are inside
    expect(document.activeElement).toBe(middle);
  });

  // ── New: mousedown trap ────────────────────────────────────

  it('prevents mousedown on elements outside the trap', async () => {
    render(<TrapContainer enabled={true} />);

    await new Promise((r) => requestAnimationFrame(r));

    const outsideAfter = screen.getByTestId('outside-after');

    const preventDefaultSpy = vi.fn();
    outsideAfter.addEventListener('mousedown', (e) => {
      if (e.defaultPrevented) preventDefaultSpy();
    });

    // Fire mousedown on the outside element. The trap's capture-phase
    // handler should call preventDefault on it.
    fireEvent.mouseDown(outsideAfter);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('allows mousedown on elements inside the trap', () => {
    render(<TrapContainer enabled={true} />);

    const inside = screen.getByTestId('first');

    const preventDefaultSpy = vi.fn();
    inside.addEventListener('mousedown', (e) => {
      if (e.defaultPrevented) preventDefaultSpy();
    });

    fireEvent.mouseDown(inside);

    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });

  // ── New: aria-hidden sibling management ────────────────────

  it('sets aria-hidden on body siblings outside the portal wrapper', () => {
    const { unmount } = render(<PortalTrapContainer enabled={true} />);

    const portal = screen.getByTestId('portal-wrapper');

    // All other direct children of body should have aria-hidden="true"
    for (const child of document.body.children) {
      if (child !== portal && child !== document.documentElement) {
        // The React root div and other test elements
        const el = child as HTMLElement;
        if (!el.hasAttribute('data-testid') || el.dataset.testid !== 'portal-wrapper') {
          expect(el.getAttribute('aria-hidden')).toBe('true');
        }
      }
    }

    unmount();
  });

  it('removes aria-hidden from siblings when unmounting', () => {
    // First, render some siblings
    const existing = document.createElement('div');
    existing.setAttribute('data-testid', 'existing-sibling');
    document.body.appendChild(existing);

    const { unmount } = render(<PortalTrapContainer enabled={true} />);

    // When mounted, aria-hidden is added
    expect(existing.getAttribute('aria-hidden')).toBe('true');

    unmount();

    // When unmounted, aria-hidden is removed
    expect(existing.hasAttribute('aria-hidden')).toBe(false);

    document.body.removeChild(existing);
  });

  // ── New: onEscapeTrap callback ─────────────────────────────

  it('calls onEscapeTrap when trap is disabled', () => {
    const onEscapeTrap = vi.fn();
    const { rerender } = render(
      <TrapContainerWrapper onEscapeTrap={onEscapeTrap} enabled={true} />,
    );

    rerender(
      <TrapContainerWrapper onEscapeTrap={onEscapeTrap} enabled={false} />,
    );

    // The cleanup effect runs after the render, so onEscapeTrap should fire
    expect(onEscapeTrap).toHaveBeenCalledOnce();
  });
});

/**
 * Helper component for testing onEscapeTrap callback.
 */
function TrapContainerWrapper({ enabled, onEscapeTrap }: { enabled: boolean; onEscapeTrap: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useFocusTrap({
    enabled,
    containerRef,
    autoFocus: false,
    onEscapeTrap,
  });

  return (
    <div>
      <div ref={containerRef} data-testid="ctnr" tabIndex={-1}>
        <button data-testid="btn">Click</button>
      </div>
    </div>
  );
}
