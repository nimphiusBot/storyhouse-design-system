import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AutoRefreshIndicator } from './index';

describe('AutoRefreshIndicator', () => {
  it('renders when enabled', () => {
    render(
      <AutoRefreshIndicator enabled={true} isPolling={false} intervalLabel="30s" />
    );
    expect(screen.getByText('Every 30s')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders with last polled label', () => {
    render(
      <AutoRefreshIndicator
        enabled={true}
        isPolling={false}
        intervalLabel="30s"
        lastPolledLabel="2m ago"
      />
    );
    expect(screen.getByText('Every 30s')).toBeInTheDocument();
    expect(screen.getByText(/2m ago/)).toBeInTheDocument();
  });

  it('renders polling state', () => {
    render(
      <AutoRefreshIndicator enabled={true} isPolling={true} intervalLabel="30s" />
    );
    expect(screen.getByText('Refreshing…')).toBeInTheDocument();
  });

  it('renders tab-hidden state', () => {
    render(
      <AutoRefreshIndicator
        enabled={true}
        isPolling={false}
        intervalLabel="30s"
        tabHidden={true}
      />
    );
    expect(screen.getByText('Paused')).toBeInTheDocument();
  });

  it('renders disabled state without lastPolledLabel', () => {
    const { container } = render(
      <AutoRefreshIndicator
        enabled={false}
        isPolling={false}
        intervalLabel="30s"
      />
    );
    expect(container.innerHTML).toBe('');
  });

  it('renders disabled state with lastPolledLabel', () => {
    render(
      <AutoRefreshIndicator
        enabled={false}
        isPolling={false}
        intervalLabel="30s"
        lastPolledLabel="5m ago"
      />
    );
    expect(screen.getByText('Auto-refresh off')).toBeInTheDocument();
  });

  it('renders last poll failed state', () => {
    render(
      <AutoRefreshIndicator
        enabled={true}
        isPolling={false}
        intervalLabel="30s"
        lastPollFailed={true}
      />
    );
    expect(screen.getByText('Retrying…')).toBeInTheDocument();
  });

  it('renders dataJustRefreshed state', () => {
    const { container } = render(
      <AutoRefreshIndicator
        enabled={true}
        isPolling={false}
        intervalLabel="30s"
        dataJustRefreshed={true}
      />
    );
    expect(screen.getByText('Every 30s')).toBeInTheDocument();
    // Should have an orange animated indicator
    const orangeDot = container.querySelector('.bg-orange-400');
    expect(orangeDot).toBeInTheDocument();
  });

  it('has accessible role and aria-live', () => {
    render(
      <AutoRefreshIndicator enabled={true} isPolling={false} intervalLabel="30s" />
    );
    const status = screen.getByRole('status');
    expect(status).toHaveAttribute('aria-live', 'polite');
  });

  it('has aria-label describing status', () => {
    render(
      <AutoRefreshIndicator enabled={true} isPolling={false} intervalLabel="30s" />
    );
    const status = screen.getByRole('status');
    expect(status).toHaveAttribute('aria-label');
    expect(status.getAttribute('aria-label')).toContain('every');
  });

  it('applies custom className', () => {
    render(
      <AutoRefreshIndicator
        enabled={true}
        isPolling={false}
        intervalLabel="30s"
        className="custom-class"
      />
    );
    const status = screen.getByRole('status');
    expect(status.className).toContain('custom-class');
  });

  it('renders tooltip with timestamp when lastPolledAt is provided', () => {
    render(
      <AutoRefreshIndicator
        enabled={true}
        isPolling={false}
        intervalLabel="30s"
        lastPolledAt={Date.now()}
      />
    );
    const status = screen.getByRole('status');
    expect(status.getAttribute('title')).toContain('Last updated');
  });

  it('renders effectiveIntervalLabel when different from intervalLabel', () => {
    render(
      <AutoRefreshIndicator
        enabled={true}
        isPolling={false}
        intervalLabel="30s"
        effectiveIntervalLabel="60s (backoff)"
      />
    );
    expect(screen.getByText('Every 60s (backoff)')).toBeInTheDocument();
  });
});
