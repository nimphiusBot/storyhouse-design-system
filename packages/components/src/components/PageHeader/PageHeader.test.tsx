import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PageHeader } from './index';

describe('PageHeader', () => {
  it('renders title', () => {
    render(<PageHeader title="Dashboard" />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Dashboard');
  });

  it('renders description', () => {
    render(<PageHeader title="Dashboard" description="Welcome back!" />);
    expect(screen.getByText('Welcome back!')).toBeInTheDocument();
  });

  it('renders actions', () => {
    render(
      <PageHeader
        title="Dashboard"
        actions={<button>Create</button>}
      />
    );
    expect(screen.getByText('Create')).toBeInTheDocument();
  });

  it('renders breadcrumbs', () => {
    const breadcrumbs = [
      { label: 'Home', href: '/' },
      { label: 'Dashboard' },
    ];
    render(<PageHeader title="Dashboard" breadcrumbs={breadcrumbs} />);
    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
    // Breadcrumb spans for the current page
    const spans = document.querySelectorAll('nav span');
    const currentBreadcrumb = Array.from(spans).find(s => s.textContent === 'Dashboard');
    expect(currentBreadcrumb).toBeInTheDocument();
  });

  it('renders breadcrumb navigation with aria-label', () => {
    const breadcrumbs = [{ label: 'Home', href: '/' }];
    render(<PageHeader title="Dashboard" breadcrumbs={breadcrumbs} />);
    const nav = screen.getByLabelText('Breadcrumb');
    expect(nav).toBeInTheDocument();
  });

  it('renders tabs', () => {
    const tabs = [
      { label: 'Overview', value: 'overview' },
      { label: 'Analytics', value: 'analytics' },
    ];
    render(
      <PageHeader
        title="Dashboard"
        tabs={tabs}
        activeTab="overview"
        onTabChange={vi.fn()}
      />
    );
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
  });

  it('calls onTabChange when tab is clicked', () => {
    const onTabChange = vi.fn();
    const tabs = [
      { label: 'Overview', value: 'overview' },
      { label: 'Analytics', value: 'analytics' },
    ];
    render(
      <PageHeader
        title="Dashboard"
        tabs={tabs}
        activeTab="overview"
        onTabChange={onTabChange}
      />
    );
    fireEvent.click(screen.getByText('Analytics'));
    expect(onTabChange).toHaveBeenCalledWith('analytics');
  });

  it('highlights active tab', () => {
    const tabs = [
      { label: 'Overview', value: 'overview' },
      { label: 'Analytics', value: 'analytics' },
    ];
    render(
      <PageHeader
        title="Dashboard"
        tabs={tabs}
        activeTab="analytics"
        onTabChange={vi.fn()}
      />
    );
    const activeBtn = screen.getByText('Analytics').closest('button');
    expect(activeBtn).toHaveAttribute('aria-selected', 'true');
    expect(activeBtn).toHaveAttribute('aria-current', 'page');
  });

  it('renders icon', () => {
    render(<PageHeader title="Dashboard" icon={<span data-testid="icon">🔍</span>} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders toolbar', () => {
    render(
      <PageHeader
        title="Dashboard"
        toolbar={<div>Toolbar Content</div>}
      />
    );
    expect(screen.getByText('Toolbar Content')).toBeInTheDocument();
  });

  it('renders pageInfo left and right', () => {
    render(
      <PageHeader
        title="Dashboard"
        pageInfo={{
          left: <span>Left Info</span>,
          right: <span>Right Info</span>,
        }}
      />
    );
    expect(screen.getByText('Left Info')).toBeInTheDocument();
    expect(screen.getByText('Right Info')).toBeInTheDocument();
  });

  it('renders with greeting', () => {
    render(
      <PageHeader
        title="Dashboard"
        greeting={{ text: 'Good morning', name: 'Alice' }}
      />
    );
    expect(screen.getByText(/Good morning/)).toBeInTheDocument();
    expect(screen.getByText(/Alice/)).toBeInTheDocument();
  });

  it('renders with size variant', () => {
    const { container, rerender } = render(
      <PageHeader title="Dashboard" size="sm" />
    );
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.className).toContain('text-xl');

    rerender(<PageHeader title="Dashboard" size="lg" />);
    const heading2 = screen.getByRole('heading', { level: 1 });
    expect(heading2.className).toContain('text-3xl');
  });

  it('applies custom className', () => {
    const { container } = render(
      <PageHeader title="Dashboard" className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders selector when provided', () => {
    const items = [
      { id: '1', label: 'Project A' },
      { id: '2', label: 'Project B' },
    ];
    render(
      <PageHeader
        title="Dashboard"
        selector={{
          currentItem: items[0],
          items,
          onSelect: vi.fn(),
        }}
      />
    );
    expect(screen.getByText('Project A')).toBeInTheDocument();
  });

  it('opens selector dropdown on click', () => {
    const items = [
      { id: '1', label: 'Project A' },
      { id: '2', label: 'Project B' },
    ];
    render(
      <PageHeader
        title="Dashboard"
        selector={{
          currentItem: items[0],
          items,
          onSelect: vi.fn(),
        }}
      />
    );
    const selectorBtn = screen.getByText('Project A').closest('button');
    fireEvent.click(selectorBtn!);
    expect(screen.getByText('Project B')).toBeInTheDocument();
  });

  it('calls onSelect when selector item is clicked', () => {
    const onSelect = vi.fn();
    const items = [
      { id: '1', label: 'Project A' },
      { id: '2', label: 'Project B' },
    ];
    render(
      <PageHeader
        title="Dashboard"
        selector={{
          currentItem: items[0],
          items,
          onSelect,
        }}
      />
    );
    const selectorBtn = screen.getByText('Project A').closest('button');
    fireEvent.click(selectorBtn!);
    fireEvent.click(screen.getByText('Project B'));
    expect(onSelect).toHaveBeenCalledWith(items[1]);
  });

  it('renders selector with search when searchable', () => {
    const items = [
      { id: '1', label: 'Project A' },
      { id: '2', label: 'Project B' },
    ];
    render(
      <PageHeader
        title="Dashboard"
        selector={{
          currentItem: items[0],
          items,
          onSelect: vi.fn(),
          searchable: true,
        }}
      />
    );
    const selectorBtn = screen.getByText('Project A').closest('button');
    fireEvent.click(selectorBtn!);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('renders tab badges', () => {
    const tabs = [
      { label: 'Inbox', value: 'inbox', badge: 5 },
      { label: 'Sent', value: 'sent' },
    ];
    render(
      <PageHeader
        title="Mail"
        tabs={tabs}
        activeTab="inbox"
        onTabChange={vi.fn()}
      />
    );
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});
