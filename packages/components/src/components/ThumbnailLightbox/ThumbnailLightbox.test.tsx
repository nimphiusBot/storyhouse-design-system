import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThumbnailLightbox } from './index';

describe('ThumbnailLightbox', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    imageUrl: 'https://example.com/image.jpg',
    orientation: 'landscape' as const,
    aspectRatio: '16:9' as const,
  };

  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <ThumbnailLightbox {...defaultProps} isOpen={false} />
    );
    expect(container.innerHTML).toBe('');
  });

  it('renders image when isOpen is true', () => {
    render(<ThumbnailLightbox {...defaultProps} />);
    const img = document.querySelector('img')!;
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('renders with dialog role and aria-modal', () => {
    render(<ThumbnailLightbox {...defaultProps} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('renders orientation badge', () => {
    render(<ThumbnailLightbox {...defaultProps} />);
    expect(screen.getByText('Landscape')).toBeInTheDocument();
  });

  it('renders portrait orientation badge', () => {
    render(
      <ThumbnailLightbox
        {...defaultProps}
        orientation="portrait"
        aspectRatio="9:16"
      />
    );
    expect(screen.getByText('Portrait')).toBeInTheDocument();
  });

  it('renders aspect ratio badge', () => {
    render(<ThumbnailLightbox {...defaultProps} />);
    expect(screen.getByText('16:9')).toBeInTheDocument();
  });

  it('renders close button', () => {
    render(<ThumbnailLightbox {...defaultProps} />);
    expect(screen.getByLabelText('Close')).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', () => {
    const onClose = vi.fn();
    render(<ThumbnailLightbox {...defaultProps} onClose={onClose} />);
    fireEvent.click(screen.getByLabelText('Close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop is clicked', () => {
    const onClose = vi.fn();
    render(<ThumbnailLightbox {...defaultProps} onClose={onClose} />);
    const dialog = screen.getByRole('dialog');
    fireEvent.click(dialog);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when content area is clicked', () => {
    const onClose = vi.fn();
    render(<ThumbnailLightbox {...defaultProps} onClose={onClose} />);
    // Click on the inner content wrapper (stops propagation)
    const innerWrapper = document.querySelector('.relative.max-w-7xl')!;
    fireEvent.click(innerWrapper);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('renders dimensions when provided', () => {
    render(
      <ThumbnailLightbox
        {...defaultProps}
        dimensions={{ width: 1920, height: 1080 }}
      />
    );
    expect(screen.getByText(/1920/)).toBeInTheDocument();
    expect(screen.getByText(/1080/)).toBeInTheDocument();
  });

  it('renders download button', () => {
    render(<ThumbnailLightbox {...defaultProps} />);
    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  it('renders metadata when provided', () => {
    render(
      <ThumbnailLightbox
        {...defaultProps}
        metadata={{
          generatedAt: '2025-01-15T10:00:00Z',
          model: 'GPT-4o',
          processingTime: 1500,
        }}
      />
    );
    expect(screen.getByText(/GPT-4o/)).toBeInTheDocument();
  });

  it('has aria-label describing the preview', () => {
    render(<ThumbnailLightbox {...defaultProps} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-label', 'landscape thumbnail preview (16:9)');
  });

  it('renders ESC keyboard hint', () => {
    render(<ThumbnailLightbox {...defaultProps} />);
    expect(screen.getByText('ESC')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <ThumbnailLightbox {...defaultProps} className="custom-overlay" />
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog.className).toContain('custom-overlay');
  });

  it('renders with backdrop blur effect', () => {
    render(<ThumbnailLightbox {...defaultProps} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog.className).toContain('backdrop-blur-sm');
  });
});
