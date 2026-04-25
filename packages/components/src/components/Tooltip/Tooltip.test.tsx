import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Tooltip } from './index';

describe('Tooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders children', () => {
    render(
      <Tooltip content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('does not show tooltip by default', () => {
    render(
      <Tooltip content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows tooltip on mouse enter', () => {
    render(
      <Tooltip content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    );
    const container = screen.getByText('Hover me').parentElement!;
    fireEvent.mouseEnter(container);
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.getByRole('tooltip')).toHaveTextContent('Tooltip text');
  });

  it('hides tooltip on mouse leave', () => {
    render(
      <Tooltip content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    );
    const container = screen.getByText('Hover me').parentElement!;
    fireEvent.mouseEnter(container);
    act(() => vi.advanceTimersByTime(300));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    fireEvent.mouseLeave(container);
    act(() => vi.advanceTimersByTime(0));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows tooltip on focus', () => {
    render(
      <Tooltip content="Focus tooltip">
        <button>Focus me</button>
      </Tooltip>
    );
    const container = screen.getByText('Focus me').parentElement!;
    fireEvent.focus(container);
    act(() => vi.advanceTimersByTime(300));
    expect(screen.getByRole('tooltip')).toHaveTextContent('Focus tooltip');
  });

  it('hides tooltip on blur', () => {
    render(
      <Tooltip content="Blur tooltip">
        <button>Blur me</button>
      </Tooltip>
    );
    const container = screen.getByText('Blur me').parentElement!;
    fireEvent.focus(container);
    act(() => vi.advanceTimersByTime(300));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    fireEvent.blur(container);
    act(() => vi.advanceTimersByTime(0));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('respects custom delay', () => {
    render(
      <Tooltip content="Delayed" delay={1000}>
        <button>Hover</button>
      </Tooltip>
    );
    const container = screen.getByText('Hover').parentElement!;
    fireEvent.mouseEnter(container);
    act(() => vi.advanceTimersByTime(500));
    // Should still be hidden at 500ms with 1000ms delay
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    act(() => vi.advanceTimersByTime(500));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('renders tooltip at top position by default', () => {
    render(
      <Tooltip content="Top tooltip">
        <button>Hover</button>
      </Tooltip>
    );
    const container = screen.getByText('Hover').parentElement!;
    fireEvent.mouseEnter(container);
    act(() => vi.advanceTimersByTime(300));
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip.className).toContain('bottom-full');
    expect(tooltip.className).toContain('mb-2');
  });

  it('renders tooltip at bottom position', () => {
    render(
      <Tooltip content="Bottom tooltip" position="bottom">
        <button>Hover</button>
      </Tooltip>
    );
    const container = screen.getByText('Hover').parentElement!;
    fireEvent.mouseEnter(container);
    act(() => vi.advanceTimersByTime(300));
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip.className).toContain('top-full');
    expect(tooltip.className).toContain('mt-2');
  });

  it('renders tooltip at left position', () => {
    render(
      <Tooltip content="Left tooltip" position="left">
        <button>Hover</button>
      </Tooltip>
    );
    const container = screen.getByText('Hover').parentElement!;
    fireEvent.mouseEnter(container);
    act(() => vi.advanceTimersByTime(300));
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip.className).toContain('right-full');
    expect(tooltip.className).toContain('mr-2');
  });

  it('renders tooltip at right position', () => {
    render(
      <Tooltip content="Right tooltip" position="right">
        <button>Hover</button>
      </Tooltip>
    );
    const container = screen.getByText('Hover').parentElement!;
    fireEvent.mouseEnter(container);
    act(() => vi.advanceTimersByTime(300));
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip.className).toContain('left-full');
    expect(tooltip.className).toContain('ml-2');
  });

  it('prevents tooltip from showing if mouse leaves before delay', () => {
    render(
      <Tooltip content="Quick exit">
        <button>Hover</button>
      </Tooltip>
    );
    const container = screen.getByText('Hover').parentElement!;
    fireEvent.mouseEnter(container);
    fireEvent.mouseLeave(container);
    act(() => vi.advanceTimersByTime(300));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <Tooltip content="Tooltip" className="inline-block">
        <button>Hover</button>
      </Tooltip>
    );
    const container = screen.getByText('Hover').parentElement!;
    expect(container.className).toContain('inline-block');
  });

  it('renders arrow element', () => {
    render(
      <Tooltip content="With arrow">
        <button>Hover</button>
      </Tooltip>
    );
    const container = screen.getByText('Hover').parentElement!;
    fireEvent.mouseEnter(container);
    act(() => vi.advanceTimersByTime(300));
    // Arrow is a div with bg-gray-900 and rotate-45
    const arrow = document.querySelector('.rotate-45');
    expect(arrow).toBeInTheDocument();
  });
});
