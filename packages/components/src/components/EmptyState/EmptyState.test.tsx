import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EmptyState } from './index';

describe('EmptyState', () => {
  // ─── Basic Rendering ─────────────────────────────────────────
  it('renders title', () => {
    render(<EmptyState title="No data" />);
    expect(screen.getByText('No data')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<EmptyState title="No data" description="Nothing to see here" />);
    expect(screen.getByText('Nothing to see here')).toBeInTheDocument();
  });

  it('renders without description', () => {
    const { container } = render(<EmptyState title="No data" />);
    expect(screen.getByText('No data')).toBeInTheDocument();
    // No <p> element when description is omitted
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs.length).toBe(0);
  });

  it('renders accessible heading', () => {
    render(<EmptyState title="Nothing here" />);
    const heading = screen.getByRole('heading', { name: 'Nothing here' });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H3');
  });

  // ─── Icon & Illustration ─────────────────────────────────────
  it('renders with custom icon', () => {
    render(
      <EmptyState title="No data" icon={<span data-testid="custom-icon">🔍</span>} />
    );
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('renders with illustration', () => {
    render(
      <EmptyState title="No data" illustration={<div data-testid="illustration">🖼️</div>} />
    );
    expect(screen.getByTestId('illustration')).toBeInTheDocument();
  });

  it('prioritizes illustration over icon', () => {
    render(
      <EmptyState
        title="No data"
        icon={<span data-testid="icon">🔍</span>}
        illustration={<div data-testid="illustration">🖼️</div>}
      />
    );
    expect(screen.getByTestId('illustration')).toBeInTheDocument();
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
  });

  // ─── primaryAction / secondaryAction ─────────────────────────
  it('renders primary action button', () => {
    const onClick = vi.fn();
    render(
      <EmptyState
        title="No data"
        primaryAction={{ label: 'Create', onClick }}
      />
    );
    const btn = screen.getByText('Create');
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders primary action with icon', () => {
    render(
      <EmptyState
        title="No data"
        primaryAction={{ label: 'Create', onClick: () => {}, icon: <span data-testid="action-icon">+</span> }}
      />
    );
    expect(screen.getByTestId('action-icon')).toBeInTheDocument();
    expect(screen.getByText('Create')).toBeInTheDocument();
  });

  it('renders secondary action', () => {
    const onClick = vi.fn();
    render(
      <EmptyState
        title="No data"
        primaryAction={{ label: 'Create', onClick: () => {} }}
        secondaryAction={{ label: 'Learn more', onClick }}
      />
    );
    const btn = screen.getByText('Learn more');
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders multiple legacy actions together', () => {
    render(
      <EmptyState
        title="No data"
        primaryAction={{ label: 'Primary', onClick: () => {} }}
        secondaryAction={{ label: 'Secondary', onClick: () => {} }}
      />
    );
    expect(screen.getByText('Primary')).toBeInTheDocument();
    expect(screen.getByText('Secondary')).toBeInTheDocument();
  });

  // ─── action prop (ReactNode) ─────────────────────────────────
  it('renders action prop (ReactNode) taking precedence over primaryAction', () => {
    render(
      <EmptyState
        title="No data"
        action={<button data-testid="action-slot">Custom CTA</button>}
        primaryAction={{ label: 'Create', onClick: () => {} }}
      />
    );
    expect(screen.getByTestId('action-slot')).toBeInTheDocument();
    expect(screen.getByText('Custom CTA')).toBeInTheDocument();
    expect(screen.queryByText('Create')).not.toBeInTheDocument();
  });

  it('renders custom action element as Link', () => {
    render(
      <EmptyState
        title="No data"
        action={<a href="/create" data-testid="link-action">Create item</a>}
      />
    );
    const link = screen.getByTestId('link-action');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/create');
  });

  it('hides actions when no action/primaryAction/secondaryAction', () => {
    const { container } = render(<EmptyState title="No data" />);
    const actionContainer = container.querySelector('.flex.items-center.gap-3');
    expect(actionContainer).toBeNull();
  });

  // ─── Variants ────────────────────────────────────────────────
  it('renders loading variant showing spinner', () => {
    const { container } = render(
      <EmptyState variant="loading" title="Loading..." />
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('applies variant color to icon wrapper', () => {
    const { rerender } = render(
      <EmptyState title="Test" variant="error" icon={<span>!</span>} />
    );
    const wrapper = screen.getByText('!').parentElement!;
    expect(wrapper.className).toContain('bg-red-50');

    rerender(
      <EmptyState title="Test" variant="no-results" icon={<span>?</span>} />
    );
    const wrapper2 = screen.getByText('?').parentElement!;
    expect(wrapper2.className).toContain('bg-orange-50');
  });

  // ─── Sizing ──────────────────────────────────────────────────
  it('applies size classes', () => {
    const { container, rerender } = render(<EmptyState title="Test" size="sm" />);
    let root = container.firstChild as HTMLElement;
    expect(root.className).toContain('py-8');

    rerender(<EmptyState title="Test" size="lg" />);
    root = container.firstChild as HTMLElement;
    expect(root.className).toContain('py-16');
  });

  // ─── Misc ────────────────────────────────────────────────────
  it('renders with no icon or illustration', () => {
    render(<EmptyState title="Title only" />);
    expect(screen.getByText('Title only')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<EmptyState title="Test" className="custom-class" />);
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain('custom-class');
  });
});
