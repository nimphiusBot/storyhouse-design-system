import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Toast, useToast } from './Toast';

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // ─── Visibility ──────────────────────────────────────────────────────

  it('renders when show is true', () => {
    render(<Toast message="Hello" show={true} />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('does not render when show is false', () => {
    const { container } = render(<Toast message="Hello" show={false} />);
    expect(container.innerHTML).toBe('');
  });

  // ─── Auto-dismiss (the core bug) ──────────────────────────────────────

  it('auto-dismisses after default duration (3000ms)', () => {
    const onClose = vi.fn();
    render(<Toast message="Auto dismiss test" onClose={onClose} />);

    expect(onClose).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(2999);
    });
    expect(onClose).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('auto-dismisses after custom duration', () => {
    const onClose = vi.fn();
    render(<Toast message="Custom duration" duration={5000} onClose={onClose} />);

    act(() => {
      vi.advanceTimersByTime(4999);
    });
    expect(onClose).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not auto-dismiss when duration is 0', () => {
    const onClose = vi.fn();
    render(<Toast message="Persistent toast" duration={0} onClose={onClose} />);

    act(() => {
      vi.advanceTimersByTime(10000);
    });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('does not auto-dismiss when show is false', () => {
    const onClose = vi.fn();
    render(<Toast message="Hidden toast" show={false} duration={3000} onClose={onClose} />);

    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('clears timer on unmount', () => {
    const onClose = vi.fn();
    const { unmount } = render(<Toast message="Unmount test" onClose={onClose} />);

    unmount();

    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(onClose).not.toHaveBeenCalled();
  });

  // ─── Manual close ─────────────────────────────────────────────────────

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(<Toast message="Close me" onClose={onClose} />);

    const closeButton = screen.getByTitle('Close notification');
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not show close button when onClose is omitted', () => {
    render(<Toast message="No close" />);
    expect(screen.queryByTitle('Close notification')).not.toBeInTheDocument();
  });

  // ─── Variants ─────────────────────────────────────────────────────────

  it('renders success variant with check icon', () => {
    const { container } = render(<Toast message="Success!" type="success" />);
    expect(screen.getByText('Success!')).toBeInTheDocument();
    // CheckCircle icon renders as an SVG
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThanOrEqual(1);
    // No close button when onClose is not provided
    expect(screen.queryByTitle('Close notification')).not.toBeInTheDocument();
  });

  it('renders error variant', () => {
    render(<Toast message="Error!" type="error" />);
    expect(screen.getByText('Error!')).toBeInTheDocument();
  });

  it('renders warning variant', () => {
    render(<Toast message="Warning!" type="warning" />);
    expect(screen.getByText('Warning!')).toBeInTheDocument();
  });

  it('renders info variant', () => {
    render(<Toast message="Info" type="info" />);
    expect(screen.getByText('Info')).toBeInTheDocument();
  });

  it('defaults to success type', () => {
    render(<Toast message="Default" />);
    expect(screen.getByText('Default')).toBeInTheDocument();
  });

  // ─── Accessibility ────────────────────────────────────────────────────

  it('has accessible close button aria-label', () => {
    const onClose = vi.fn();
    render(<Toast message="Accessible" onClose={onClose} />);
    const button = screen.getByTitle('Close notification');
    expect(button).toBeInTheDocument();
    expect(button.getAttribute('aria-label')).toBe('Close notification');
  });
});

// ─── useToast Hook ────────────────────────────────────────────────────

describe('useToast', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows a toast via showToast', () => {
    function TestComponent() {
      const { showToast, ToastContainer } = useToast();
      return (
        <div>
          <button onClick={() => showToast('Test toast')}>Show</button>
          <ToastContainer />
        </div>
      );
    }

    render(<TestComponent />);
    expect(screen.queryByText('Test toast')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Show'));
    expect(screen.getByText('Test toast')).toBeInTheDocument();
  });

  it('shows a toast with custom type', () => {
    function TestComponent() {
      const { showToast, ToastContainer } = useToast();
      return (
        <div>
          <button onClick={() => showToast('Error toast', 'error')}>Show Error</button>
          <ToastContainer />
        </div>
      );
    }

    render(<TestComponent />);
    fireEvent.click(screen.getByText('Show Error'));
    expect(screen.getByText('Error toast')).toBeInTheDocument();
  });

  it('auto-dismisses a toast after default duration', () => {
    function TestComponent() {
      const { showToast, ToastContainer } = useToast();
      return (
        <div>
          <button onClick={() => showToast('Auto dismiss')}>Show</button>
          <ToastContainer />
        </div>
      );
    }

    render(<TestComponent />);
    fireEvent.click(screen.getByText('Show'));
    expect(screen.getByText('Auto dismiss')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(screen.queryByText('Auto dismiss')).not.toBeInTheDocument();
  });

  it('auto-dismisses a toast with custom duration', () => {
    function TestComponent() {
      const { showToast, ToastContainer } = useToast();
      return (
        <div>
          <button onClick={() => showToast('Long toast', 'success', 5000)}>Show</button>
          <ToastContainer />
        </div>
      );
    }

    render(<TestComponent />);
    fireEvent.click(screen.getByText('Show'));

    act(() => {
      vi.advanceTimersByTime(3000);
    });
    // Should still be visible at 3s for a 5s toast
    expect(screen.getByText('Long toast')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.queryByText('Long toast')).not.toBeInTheDocument();
  });

  it('hides a specific toast on close button click', () => {
    function TestComponent() {
      const { showToast, ToastContainer } = useToast();
      return (
        <div>
          <button onClick={() => showToast('Closable toast')}>Show</button>
          <ToastContainer />
        </div>
      );
    }

    render(<TestComponent />);
    fireEvent.click(screen.getByText('Show'));
    expect(screen.getByText('Closable toast')).toBeInTheDocument();

    fireEvent.click(screen.getByTitle('Close notification'));
    expect(screen.queryByText('Closable toast')).not.toBeInTheDocument();
  });

  it('supports multiple toasts simultaneously', () => {
    function TestComponent() {
      const { showToast, ToastContainer } = useToast();
      return (
        <div>
          <button onClick={() => showToast('Toast A')}>Show A</button>
          <button onClick={() => showToast('Toast B')}>Show B</button>
          <ToastContainer />
        </div>
      );
    }

    render(<TestComponent />);
    fireEvent.click(screen.getByText('Show A'));
    fireEvent.click(screen.getByText('Show B'));

    expect(screen.getByText('Toast A')).toBeInTheDocument();
    expect(screen.getByText('Toast B')).toBeInTheDocument();
  });
});
