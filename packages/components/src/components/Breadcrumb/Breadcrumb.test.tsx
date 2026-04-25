import React from 'react';
import { render, screen } from '@testing-library/react';
import { Breadcrumb } from './Breadcrumb';

describe('Breadcrumb', () => {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Widget' },
  ];

  it('renders all items', () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Widget')).toBeInTheDocument();
  });

  it('renders links for items with href', () => {
    render(<Breadcrumb items={items} />);
    const homeLink = screen.getByText('Home').closest('a');
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('marks last item as current page', () => {
    render(<Breadcrumb items={items} />);
    const lastItem = screen.getByText('Widget');
    expect(lastItem).toHaveAttribute('aria-current', 'page');
  });

  it('has accessible nav label', () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByLabelText('Breadcrumb')).toBeInTheDocument();
  });

  it('collapses items with maxItems', () => {
    const longItems = [
      { label: 'A', href: '/a' },
      { label: 'B', href: '/b' },
      { label: 'C', href: '/c' },
      { label: 'D', href: '/d' },
      { label: 'E' },
    ];
    render(<Breadcrumb items={longItems} maxItems={3} />);
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByText('E')).toBeInTheDocument();
  });
});
