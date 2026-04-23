import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Content</Card>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    const { rerender } = render(<Card variant="elevated">Content</Card>);
    const card = screen.getByText('Content');
    expect(card).toHaveClass('shadow-md');

    rerender(<Card variant="flat">Content</Card>);
    expect(card).toHaveClass('bg-gray-50');
  });

  it('applies padding classes', () => {
    const { rerender } = render(<Card padding="none">Content</Card>);
    expect(screen.getByText('Content')).toHaveClass('p-0');

    rerender(<Card padding="lg">Content</Card>);
    expect(screen.getByText('Content')).toHaveClass('p-8');
  });

  it('renders with default props', () => {
    render(<Card>Default</Card>);
    const card = screen.getByText('Default');
    expect(card).toHaveClass('rounded-xl');
    expect(card).toHaveClass('bg-white');
  });
});

describe('CardHeader', () => {
  it('renders children', () => {
    render(<CardHeader>Header</CardHeader>);
    expect(screen.getByText('Header')).toBeInTheDocument();
  });
});

describe('CardTitle', () => {
  it('renders as h3 by default', () => {
    render(<CardTitle>Title</CardTitle>);
    const title = screen.getByText('Title');
    expect(title.tagName).toBe('H3');
  });

  it('renders as custom element', () => {
    render(<CardTitle as="h1">Title</CardTitle>);
    expect(screen.getByText('Title').tagName).toBe('H1');
  });
});

describe('CardContent', () => {
  it('renders children', () => {
    render(<CardContent>Content text</CardContent>);
    expect(screen.getByText('Content text')).toBeInTheDocument();
  });
});

describe('CardFooter', () => {
  it('renders children', () => {
    render(<CardFooter>Footer</CardFooter>);
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('has border top', () => {
    render(<CardFooter>Footer</CardFooter>);
    expect(screen.getByText('Footer')).toHaveClass('border-t');
  });
});