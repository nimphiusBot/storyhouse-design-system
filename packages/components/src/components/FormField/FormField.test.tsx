import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormField, FormGroup } from './index';

describe('FormField', () => {
  it('renders children', () => {
    render(
      <FormField>
        <input type="text" />
      </FormField>
    );
    const input = document.querySelector('input');
    expect(input).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<FormField label="Email">{input}</FormField>);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders error message when provided', () => {
    render(<FormField label="Email" error="Invalid email">{input}</FormField>);
    const error = screen.getByRole('alert');
    expect(error).toHaveTextContent('Invalid email');
  });

  it('renders help text when provided', () => {
    render(<FormField label="Email" helpText="Enter your email address">{input}</FormField>);
    expect(screen.getByText('Enter your email address')).toBeInTheDocument();
  });

  it('does not render help text when error is present', () => {
    render(
      <FormField label="Email" helpText="Enter your email" error="Required">
        {input}
      </FormField>
    );
    expect(screen.queryByText('Enter your email')).not.toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
  });

  it('shows required indicator', () => {
    render(<FormField label="Email" required>{input}</FormField>);
    const indicator = screen.getByLabelText('required');
    expect(indicator).toHaveTextContent('*');
  });

  it('shows optional text when showOptional is true and not required', () => {
    render(<FormField label="Email" showOptional>{input}</FormField>);
    expect(screen.getByText('(optional)')).toBeInTheDocument();
  });

  it('does not show optional text when field is required', () => {
    render(<FormField label="Email" required showOptional>{input}</FormField>);
    expect(screen.queryByText('(optional)')).not.toBeInTheDocument();
  });

  it('uses custom htmlFor on label', () => {
    render(<FormField label="Email" htmlFor="my-email">{input}</FormField>);
    const label = screen.getByText('Email').closest('label');
    expect(label).toHaveAttribute('for', 'my-email');
  });

  it('applies disabled class to label when disabled', () => {
    render(<FormField label="Email" disabled>{input}</FormField>);
    const label = screen.getByText('Email').closest('label');
    expect(label?.className).toContain('opacity-50');
    expect(label?.className).toContain('cursor-not-allowed');
  });

  it('applies custom className', () => {
    const { container } = render(
      <FormField className="my-class">{input}</FormField>
    );
    expect(container.firstChild).toHaveClass('my-class');
  });

  it('applies custom labelClassName', () => {
    render(<FormField label="Name" labelClassName="red-label">{input}</FormField>);
    const label = screen.getByText('Name').closest('label');
    expect(label?.className).toContain('red-label');
  });
});

const input = <input type="text" data-testid="input" />;

describe('FormGroup', () => {
  it('renders children', () => {
    render(<FormGroup><input /></FormGroup>);
    expect(document.querySelector('input')).toBeInTheDocument();
  });

  it('renders title', () => {
    render(<FormGroup title="Personal Info"><input /></FormGroup>);
    expect(screen.getByText('Personal Info')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(
      <FormGroup title="Info" description="Fill in your details">
        <input />
      </FormGroup>
    );
    expect(screen.getByText('Fill in your details')).toBeInTheDocument();
  });

  it('renders title as h3', () => {
    render(<FormGroup title="Profile"><input /></FormGroup>);
    const heading = screen.getByText('Profile');
    expect(heading.tagName).toBe('H3');
  });

  it('applies divider class when divider prop is true', () => {
    const { container } = render(
      <FormGroup title="Info" divider><input /></FormGroup>
    );
    expect(container.firstChild).toHaveClass('border-b');
  });

  it('renders without title or description', () => {
    const { container } = render(<FormGroup><input /></FormGroup>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <FormGroup className="group-class"><input /></FormGroup>
    );
    expect(container.firstChild).toHaveClass('group-class');
  });
});
