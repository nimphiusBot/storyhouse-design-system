import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Toast, useToast } from './index';

describe('Toast', () => {
  it('renders message', () => {
    render(<Toast message="Operation successful!" />);
    expect(screen.getByText('Operation successful!')).toBeInTheDocument();
  });

  it('renders success type by default', () => {
    const { container } = render(<Toast message="Success!" />);
    // In newer lucide-react, CheckCircle renders as lucide-circle-check-big
    const icon = container.querySelector('.lucide-circle-check-big');
    expect(icon).toBeInTheDocument();
  });

  it('renders error type', () => {
    const { container } = render(<Toast message="Error!" type="error" />);
    // In newer lucide-react, XCircle renders as lucide-circle-x
    const icon = container.querySelector('.lucide-circle-x');
    expect(icon).toBeInTheDocument();
  });

  it('renders warning type', () => {
    const { container } = render(<Toast message="Warning!" type="warning" />);
    // In newer lucide-react, AlertCircle renders as lucide-circle-alert
    const icon = container.querySelector('.lucide-circle-alert');
    expect(icon).toBeInTheDocument();
  });

  it('renders info type', () => {
    const { container } = render(<Toast message="Info" type="info" />);
    const icon = container.querySelector('.lucide-info');
    expect(icon).toBeInTheDocument();
  });

  it('shows nothing when show is false', () => {
    const { container } = render(<Toast message="Hidden" show={false} />);
    expect(container.innerHTML).toBe('');
  });

  it('calls onClose when close button clicked', () => {
    const onClose = vi.fn();
    render(<Toast message="Close me" onClose={onClose} />);
    const closeBtn = screen.getByTitle('Close notification');
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('auto-dismisses after duration', () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(<Toast message="Auto close" duration={3000} onClose={onClose} />);
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(onClose).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it('does not auto-dismiss when duration is 0', () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(<Toast message="Persistent" duration={0} onClose={onClose} />);
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(onClose).not.toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('cleans up timer on unmount', () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    const { unmount } = render(
      <Toast message="Unmount" duration={3000} onClose={onClose} />
    );
    unmount();
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(onClose).not.toHaveBeenCalled();
    vi.useRealTimers();
  });
});

describe('useToast', () => {
  it('provides showToast and ToastContainer', () => {
    function TestComponent() {
      const toast = useToast();
      return (
        <div>
          <button onClick={() => toast.showToast('Hello!')}>Show</button>
          <toast.ToastContainer />
        </div>
      );
    }
    render(<TestComponent />);
    expect(screen.getByText('Show')).toBeInTheDocument();
  });

  it('renders toast when showToast is called', () => {
    function TestComponent() {
      const toast = useToast();
      return (
        <div>
          <button onClick={() => toast.showToast('Hello!')}>Show</button>
          <toast.ToastContainer />
        </div>
      );
    }
    render(<TestComponent />);
    fireEvent.click(screen.getByText('Show'));
    expect(screen.getByText('Hello!')).toBeInTheDocument();
  });

  it('renders with type when specified', () => {
    function TestComponent() {
      const toast = useToast();
      return (
        <div>
          <button onClick={() => toast.showToast('Error!', 'error')}>Show</button>
          <toast.ToastContainer />
        </div>
      );
    }
    render(<TestComponent />);
    fireEvent.click(screen.getByText('Show'));
    expect(screen.getByText('Error!')).toBeInTheDocument();
    // In newer lucide-react, XCircle renders as lucide-circle-x
    const icon = document.querySelector('.lucide-circle-x');
    expect(icon).toBeInTheDocument();
  });

  it('renders multiple toasts', () => {
    function TestComponent() {
      const toast = useToast();
      return (
        <div>
          <button onClick={() => { toast.showToast('Toast 1'); toast.showToast('Toast 2'); }}>
            Show Two
          </button>
          <toast.ToastContainer />
        </div>
      );
    }
    render(<TestComponent />);
    fireEvent.click(screen.getByText('Show Two'));
    expect(screen.getByText('Toast 1')).toBeInTheDocument();
    expect(screen.getByText('Toast 2')).toBeInTheDocument();
  });

  it('dismisses toast on close', () => {
    function TestComponent() {
      const toast = useToast();
      return (
        <div>
          <button onClick={() => toast.showToast('Dismiss me')}>Show</button>
          <toast.ToastContainer />
        </div>
      );
    }
    render(<TestComponent />);
    fireEvent.click(screen.getByText('Show'));
    expect(screen.getByText('Dismiss me')).toBeInTheDocument();

    const closeBtn = screen.getByTitle('Close notification');
    fireEvent.click(closeBtn);
    expect(screen.queryByText('Dismiss me')).not.toBeInTheDocument();
  });
});
