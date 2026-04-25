import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Alert } from './Alert';

describe('Alert', () => {
  it('renders the message', () => {
    render(<Alert>Test message</Alert>);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('renders with title', () => {
    render(<Alert title="Warning">Something happened</Alert>);
    expect(screen.getByText('Warning')).toBeInTheDocument();
  });

  it('has role="alert"', () => {
    render(<Alert>Alert!</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('dismisses when dismiss button is clicked', () => {
    render(<Alert dismissible>Dismiss me</Alert>);
    fireEvent.click(screen.getByLabelText('Dismiss info alert'));
    expect(screen.queryByText('Dismiss me')).not.toBeInTheDocument();
  });

  it('calls onDismiss when dismissed', () => {
    const fn = vi.fn();
    render(<Alert dismissible onDismiss={fn}>Dismiss me</Alert>);
    fireEvent.click(screen.getByLabelText('Dismiss info alert'));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('renders different variants', () => {
    const { rerender } = render(<Alert variant="success">Success</Alert>);
    expect(screen.getByText('Success')).toBeInTheDocument();

    rerender(<Alert variant="error">Error</Alert>);
    expect(screen.getByText('Error')).toBeInTheDocument();

    rerender(<Alert variant="warning">Warning</Alert>);
    expect(screen.getByText('Warning')).toBeInTheDocument();
  });
});
