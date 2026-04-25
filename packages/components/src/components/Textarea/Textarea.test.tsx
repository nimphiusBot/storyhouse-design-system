import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Textarea } from './index';

describe('Textarea', () => {
  it('renders a textarea element', () => {
    render(<Textarea />);
    const textarea = document.querySelector('textarea')!;
    expect(textarea).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<Textarea label="Description" />);
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('associates label with textarea via htmlFor/id', () => {
    render(<Textarea label="Bio" />);
    const textarea = document.querySelector('textarea')!;
    const label = screen.getByText('Bio').closest('label');
    expect(label).toHaveAttribute('for', textarea.id);
  });

  it('renders placeholder', () => {
    render(<Textarea placeholder="Enter text..." />);
    const textarea = document.querySelector('textarea')!;
    expect(textarea).toHaveAttribute('placeholder', 'Enter text...');
  });

  it('renders error message', () => {
    render(<Textarea error="Required field" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Required field');
  });

  it('renders help text', () => {
    render(<Textarea helpText="Tell us about yourself" />);
    expect(screen.getByText('Tell us about yourself')).toBeInTheDocument();
  });

  it('hides help text when error is present', () => {
    render(<Textarea helpText="Help text" error="Error" />);
    expect(screen.queryByText('Help text')).not.toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Error');
  });

  it('sets aria-invalid when error is present', () => {
    render(<Textarea error="Error" />);
    const textarea = document.querySelector('textarea')!;
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
  });

  it('calls onChange when text changes', () => {
    const onChange = vi.fn();
    render(<Textarea onChange={onChange} />);
    const textarea = document.querySelector('textarea')!;
    fireEvent.change(textarea, { target: { value: 'hello' } });
    expect(onChange).toHaveBeenCalled();
  });

  it('renders disabled state', () => {
    render(<Textarea disabled />);
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    expect(textarea.disabled).toBe(true);
  });

  it('applies disabled class to label', () => {
    render(<Textarea label="Bio" disabled />);
    const label = screen.getByText('Bio').closest('label');
    expect(label?.className).toContain('opacity-50');
  });

  it('handles value prop', () => {
    render(<Textarea value="Initial text" onChange={vi.fn()} />);
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    expect(textarea.value).toBe('Initial text');
  });

  it('renders with default 3 rows (minRows)', () => {
    render(<Textarea />);
    const textarea = document.querySelector('textarea')!;
    expect(textarea).toHaveAttribute('rows', '3');
  });

  it('renders with custom minRows', () => {
    render(<Textarea minRows={5} />);
    const textarea = document.querySelector('textarea')!;
    expect(textarea).toHaveAttribute('rows', '5');
  });

  it('applies variant classes', () => {
    const { rerender } = render(<Textarea variant="error" />);
    let textarea = document.querySelector('textarea')!;
    expect(textarea.className).toContain('border-red-300');

    rerender(<Textarea variant="success" />);
    textarea = document.querySelector('textarea')!;
    expect(textarea.className).toContain('border-green-300');
  });

  it('applies size classes', () => {
    const { rerender } = render(<Textarea size="sm" />);
    let textarea = document.querySelector('textarea')!;
    expect(textarea.className).toContain('rounded-md');

    rerender(<Textarea size="lg" />);
    textarea = document.querySelector('textarea')!;
    expect(textarea.className).toContain('rounded-xl');
  });

  it('renders resize-y when resize prop true', () => {
    render(<Textarea resize />);
    const textarea = document.querySelector('textarea')!;
    expect(textarea.className).toContain('resize-y');
  });

  it('does not render resize class by default', () => {
    render(<Textarea />);
    const textarea = document.querySelector('textarea')!;
    expect(textarea.className).not.toContain('resize-y');
  });

  it('shows character count when showCharCount is true', () => {
    render(<Textarea showCharCount value="hello" onChange={vi.fn()} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('shows character count with maxLength', () => {
    render(<Textarea showCharCount maxLength={100} value="hello" onChange={vi.fn()} />);
    expect(screen.getByText('5/100')).toBeInTheDocument();
  });

  it('applies warning style when near maxLength', () => {
    render(<Textarea showCharCount maxLength={10} value="hellohello" onChange={vi.fn()} />);
    const counter = screen.getByText('10/10');
    expect(counter.className).toContain('font-medium');
  });

  it('applies fullWidth by default', () => {
    const { container } = render(<Textarea />);
    expect(container.firstChild).toHaveClass('w-full');
  });

  it('renders without fullWidth when false', () => {
    const { container } = render(<Textarea fullWidth={false} />);
    expect(container.firstChild).toHaveClass('w-auto');
  });

  it('applies custom className', () => {
    render(<Textarea className="custom-textarea" />);
    const textarea = document.querySelector('textarea')!;
    expect(textarea.className).toContain('custom-textarea');
  });

  it('uses provided id', () => {
    render(<Textarea id="my-textarea" />);
    const textarea = document.querySelector('textarea')!;
    expect(textarea.id).toBe('my-textarea');
  });
});
