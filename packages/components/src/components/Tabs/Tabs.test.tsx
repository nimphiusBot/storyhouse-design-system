import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './index';

describe('Tabs', () => {
  const defaultTabs = [
    { label: 'Overview', value: 'overview' },
    { label: 'Details', value: 'details' },
    { label: 'Settings', value: 'settings' },
  ];

  it('renders all tab labels', () => {
    render(
      <Tabs
        tabs={defaultTabs}
        activeTab="overview"
        onTabChange={vi.fn()}
      />
    );
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('calls onTabChange when tab clicked', () => {
    const onTabChange = vi.fn();
    render(
      <Tabs
        tabs={defaultTabs}
        activeTab="overview"
        onTabChange={onTabChange}
      />
    );
    fireEvent.click(screen.getByText('Details'));
    expect(onTabChange).toHaveBeenCalledWith('details');
  });

  it('sets aria-selected on active tab', () => {
    render(
      <Tabs
        tabs={defaultTabs}
        activeTab="overview"
        onTabChange={vi.fn()}
      />
    );
    const overviewBtn = screen.getByText('Overview').closest('button')!;
    expect(overviewBtn).toHaveAttribute('aria-selected', 'true');
    expect(overviewBtn).toHaveAttribute('data-state', 'active');
  });

  it('sets aria-selected false on inactive tab', () => {
    render(
      <Tabs
        tabs={defaultTabs}
        activeTab="overview"
        onTabChange={vi.fn()}
      />
    );
    const detailsBtn = screen.getByText('Details').closest('button')!;
    expect(detailsBtn).toHaveAttribute('aria-selected', 'false');
    expect(detailsBtn).toHaveAttribute('data-state', 'inactive');
  });

  it('renders tablist role', () => {
    render(
      <Tabs
        tabs={defaultTabs}
        activeTab="overview"
        onTabChange={vi.fn()}
      />
    );
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('renders tabs with role tab', () => {
    render(
      <Tabs
        tabs={defaultTabs}
        activeTab="overview"
        onTabChange={vi.fn()}
      />
    );
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(3);
  });

  it('renders pills variant', () => {
    const { container } = render(
      <Tabs
        tabs={defaultTabs}
        activeTab="overview"
        onTabChange={vi.fn()}
        variant="pills"
      />
    );
    const tablist = screen.getByRole('tablist');
    expect(tablist.className).toContain('rounded-lg');
    expect(tablist.className).toContain('bg-gray-100');
  });

  it('renders tabs with icons', () => {
    const tabsWithIcons = [
      { label: 'Home', value: 'home', icon: <span data-testid="home-icon">🏠</span> },
      { label: 'Profile', value: 'profile', icon: <span data-testid="profile-icon">👤</span> },
    ];
    render(
      <Tabs
        tabs={tabsWithIcons}
        activeTab="home"
        onTabChange={vi.fn()}
      />
    );
    expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    expect(screen.getByTestId('profile-icon')).toBeInTheDocument();
  });

  it('renders tabs with badges', () => {
    const tabsWithBadges = [
      { label: 'Inbox', value: 'inbox', badge: 5 },
      { label: 'Sent', value: 'sent', badge: 0 },
    ];
    render(
      <Tabs
        tabs={tabsWithBadges}
        activeTab="inbox"
        onTabChange={vi.fn()}
      />
    );
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('renders disabled tab', () => {
    const tabs = [
      { label: 'Active', value: 'active' },
      { label: 'Disabled', value: 'disabled', disabled: true },
    ];
    const onTabChange = vi.fn();
    render(
      <Tabs
        tabs={tabs}
        activeTab="active"
        onTabChange={onTabChange}
      />
    );
    const disabledBtn = screen.getByText('Disabled').closest('button')!;
    expect(disabledBtn).toBeDisabled();
    fireEvent.click(disabledBtn);
    expect(onTabChange).not.toHaveBeenCalled();
  });

  it('applies size variant', () => {
    const { container, rerender } = render(
      <Tabs
        tabs={defaultTabs}
        activeTab="overview"
        onTabChange={vi.fn()}
        size="sm"
      />
    );
    const buttons = screen.getAllByRole('tab');
    expect(buttons[0].className).toContain('text-xs');

    rerender(
      <Tabs
        tabs={defaultTabs}
        activeTab="overview"
        onTabChange={vi.fn()}
        size="lg"
      />
    );
    const buttons2 = screen.getAllByRole('tab');
    expect(buttons2[0].className).toContain('text-base');
  });

  it('renders children (TabsContent)', () => {
    render(
      <Tabs
        tabs={defaultTabs}
        activeTab="overview"
        onTabChange={vi.fn()}
      >
        <div>Child content</div>
      </Tabs>
    );
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Tabs
        tabs={defaultTabs}
        activeTab="overview"
        onTabChange={vi.fn()}
        className="custom-class"
      />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('handles single tab gracefully', () => {
    render(
      <Tabs
        tabs={[{ label: 'Only', value: 'only' }]}
        activeTab="only"
        onTabChange={vi.fn()}
      />
    );
    expect(screen.getByText('Only')).toBeInTheDocument();
  });
});

describe('TabsList', () => {
  it('renders with tablist role', () => {
    render(<TabsList><div>child</div></TabsList>);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <TabsList>
        <button>Tab 1</button>
      </TabsList>
    );
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    const { rerender } = render(<TabsList variant="pills"><div>child</div></TabsList>);
    let tablist = screen.getByRole('tablist');
    expect(tablist.className).toContain('rounded-lg');

    rerender(<TabsList variant="default"><div>child</div></TabsList>);
    tablist = screen.getByRole('tablist');
    expect(tablist.className).toContain('border-b');
  });
});

describe('TabsTrigger', () => {
  it('renders with role tab', () => {
    render(
      <TabsTrigger value="a" activeTab="a" onTabChange={vi.fn()}>
        Tab A
      </TabsTrigger>
    );
    expect(screen.getByRole('tab')).toHaveTextContent('Tab A');
  });

  it('calls onTabChange when clicked', () => {
    const onTabChange = vi.fn();
    render(
      <TabsTrigger value="b" activeTab="a" onTabChange={onTabChange}>
        Tab B
      </TabsTrigger>
    );
    fireEvent.click(screen.getByRole('tab'));
    expect(onTabChange).toHaveBeenCalledWith('b');
  });

  it('sets aria-controls', () => {
    render(
      <TabsTrigger value="a" activeTab="a" onTabChange={vi.fn()}>
        Tab A
      </TabsTrigger>
    );
    expect(screen.getByRole('tab')).toHaveAttribute('aria-controls', 'tabpanel-a');
  });

  it('does not call onTabChange when disabled', () => {
    const onTabChange = vi.fn();
    render(
      <TabsTrigger value="b" activeTab="a" onTabChange={onTabChange} disabled>
        Tab B
      </TabsTrigger>
    );
    fireEvent.click(screen.getByRole('tab'));
    expect(onTabChange).not.toHaveBeenCalled();
  });
});

describe('TabsContent', () => {
  it('renders children when active', () => {
    render(
      <TabsContent value="a" activeTab="a">
        Content A
      </TabsContent>
    );
    expect(screen.getByText('Content A')).toBeInTheDocument();
  });

  it('shows nothing when not active', () => {
    render(
      <TabsContent value="b" activeTab="a">
        Content B
      </TabsContent>
    );
    expect(screen.queryByText('Content B')).not.toBeInTheDocument();
  });

  it('has role tabpanel', () => {
    render(
      <TabsContent value="a" activeTab="a">
        Content
      </TabsContent>
    );
    expect(screen.getByRole('tabpanel')).toBeInTheDocument();
  });

  it('has aria-labelledby attribute', () => {
    render(
      <TabsContent value="a" activeTab="a">
        Content
      </TabsContent>
    );
    const panel = screen.getByRole('tabpanel');
    expect(panel).toHaveAttribute('aria-labelledby', 'tab-a');
  });
});
