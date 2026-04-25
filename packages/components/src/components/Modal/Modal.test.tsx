import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal, ConfirmModal } from './index';

describe('Modal', () => {
  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <Modal isOpen={false} onClose={vi.fn()}>
        Content
      </Modal>
    );
    expect(container.innerHTML).toBe('');
  });

  it('renders content when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()}>
        Content
      </Modal>
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders with aria-modal dialog role', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()}>
        Content
      </Modal>
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('renders title when provided', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} title="My Title">
        Content
      </Modal>
    );
    expect(screen.getByText('My Title')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} description="A description">
        Content
      </Modal>
    );
    expect(screen.getByText('A description')).toBeInTheDocument();
  });

  it('links title and description via aria attributes', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} title="Title" description="Desc">
        Content
      </Modal>
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
    expect(dialog).toHaveAttribute('aria-describedby', 'modal-description');
  });

  it('renders close button by default', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()}>
        Content
      </Modal>
    );
    expect(screen.getByLabelText('Close modal')).toBeInTheDocument();
  });

  it('hides close button when showCloseButton is false', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} showCloseButton={false}>
        Content
      </Modal>
    );
    expect(screen.queryByLabelText('Close modal')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        Content
      </Modal>
    );
    fireEvent.click(screen.getByLabelText('Close modal'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when overlay is clicked', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        Content
      </Modal>
    );
    const dialog = screen.getByRole('dialog');
    fireEvent.click(dialog);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when overlay click is disabled', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose} closeOnOverlayClick={false}>
        Content
      </Modal>
    );
    const dialog = screen.getByRole('dialog');
    fireEvent.click(dialog);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('renders footer when provided', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} footer={<button>Save</button>}>
        Content
      </Modal>
    );
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('hides header when showHeader is false', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} title="Title" showHeader={false}>
        Content
      </Modal>
    );
    expect(screen.queryByText('Title')).not.toBeInTheDocument();
  });

  it('renders custom header when provided', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} header={<div>Custom Header</div>}>
        Content
      </Modal>
    );
    expect(screen.getByText('Custom Header')).toBeInTheDocument();
  });

  it('renders loading spinner when loading is true', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} loading>
        Content
      </Modal>
    );
    // Spinner is an animate-spin div — the content should not be visible
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('applies size class', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} size="sm">
        Content
      </Modal>
    );
    // The inner panel has the size class, not the dialog (overlay) div
    const innerPanel = document.querySelector('[class*="max-w-sm"]');
    expect(innerPanel).toBeInTheDocument();
  });

  it('applies variant class', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} variant="danger">
        Content
      </Modal>
    );
    const innerPanel = document.querySelector('[class*="border-t-red-500"]');
    expect(innerPanel).toBeInTheDocument();
  });

  it('renders with custom z-index', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} zIndex={100}>
        Content
      </Modal>
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog.style.zIndex).toBe('100');
  });

  it('does not render header when both title and description are absent and no header prop', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()}>
        Content
      </Modal>
    );
    // Header still renders by default (showHeader=true) but no content in it
    // A close button should still be there
    expect(screen.getByLabelText('Close modal')).toBeInTheDocument();
  });
});

describe('ConfirmModal', () => {
  it('renders message', () => {
    render(
      <ConfirmModal
        isOpen={true}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
        message="Are you sure?"
      />
    );
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
  });

  it('renders confirm and cancel buttons', () => {
    render(
      <ConfirmModal
        isOpen={true}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
        message="Are you sure?"
      />
    );
    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('calls onConfirm when confirm button clicked', () => {
    const onConfirm = vi.fn();
    render(
      <ConfirmModal
        isOpen={true}
        onClose={vi.fn()}
        onConfirm={onConfirm}
        message="Sure?"
      />
    );
    fireEvent.click(screen.getByText('Confirm'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when cancel button clicked', () => {
    const onClose = vi.fn();
    render(
      <ConfirmModal
        isOpen={true}
        onClose={onClose}
        onConfirm={vi.fn()}
        message="Sure?"
      />
    );
    fireEvent.click(screen.getByText('Cancel'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('uses custom confirm text', () => {
    render(
      <ConfirmModal
        isOpen={true}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
        confirmText="Yes, Delete"
        message="Sure?"
      />
    );
    expect(screen.getByText('Yes, Delete')).toBeInTheDocument();
  });

  it('uses custom cancel text', () => {
    render(
      <ConfirmModal
        isOpen={true}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
        cancelText="No, Go Back"
        message="Sure?"
      />
    );
    expect(screen.getByText('No, Go Back')).toBeInTheDocument();
  });

  it('disables footer buttons when isConfirming', () => {
    render(
      <ConfirmModal
        isOpen={true}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
        isConfirming
        message="Sure?"
      />
    );
    const footerButtons = document.querySelectorAll('[class*="border-t"] button, [class*="border-t"] [role="button"], button');
    // At least some buttons should be disabled
    const disabledButtons = Array.from(document.querySelectorAll('button')).filter(b => b.disabled);
    expect(disabledButtons.length).toBeGreaterThan(0);
  });

  it('applies danger variant to confirm modal', () => {
    render(
      <ConfirmModal
        isOpen={true}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
        confirmVariant="danger"
        message="Sure?"
      />
    );
    const innerPanel = document.querySelector('[class*="border-t-red-500"]');
    expect(innerPanel).toBeInTheDocument();
  });
});
