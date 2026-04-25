import React, { useEffect, useRef } from 'react';
import { X, Download } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export interface ThumbnailLightboxProps {
  /** Whether the lightbox is open */
  isOpen: boolean;
  /** Callback when lightbox should close */
  onClose: () => void;
  /** Thumbnail image URL */
  imageUrl: string;
  /** Orientation of the thumbnail */
  orientation: 'landscape' | 'portrait';
  /** Aspect ratio label */
  aspectRatio: '16:9' | '9:16';
  /** Image dimensions */
  dimensions?: {
    width: number;
    height: number;
  };
  /** Generation metadata */
  metadata?: {
    generatedAt?: string;
    model?: string;
    processingTime?: number;
  };
  /** Additional CSS classes */
  className?: string;
}

/**
 * ThumbnailLightbox - Full-screen thumbnail preview
 *
 * A modal-style component for viewing thumbnails at full resolution.
 * Supports keyboard navigation (ESC to close) and click-outside-to-close.
 *
 * Features:
 * - Full-screen overlay with backdrop blur
 * - Keyboard navigation (Escape to close)
 * - Click outside to close
 * - Download button for saving image
 * - Image metadata display
 * - Body scroll lock when open
 * - Accessible with ARIA attributes
 *
 * @example
 * ```tsx
 * <ThumbnailLightbox
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   imageUrl="https://example.com/thumbnail.jpg"
 *   orientation="landscape"
 *   aspectRatio="16:9"
 * />
 * ```
 */
export const ThumbnailLightbox: React.FC<ThumbnailLightboxProps> = ({
  isOpen,
  onClose,
  imageUrl,
  orientation,
  aspectRatio,
  dimensions,
  metadata,
  className,
}) => {
  // Use a ref to hold the latest onClose to prevent stale closures
  // and avoid re-registering the listener when onClose reference changes.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Close on Escape key — only active when lightbox is open
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseRef.current();
      }
    };

    document.addEventListener('keydown', handleEscape);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Don't render if not open
  if (!isOpen) return null;

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `thumbnail-${orientation}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Failed to download thumbnail:', error);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const formatProcessingTime = (ms?: number) => {
    if (!ms) return '';
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200',
        className,
      )}
      role="dialog"
      aria-modal="true"
      aria-label={`${orientation} thumbnail preview (${aspectRatio})`}
      onClick={onClose}
    >
      <div
        className="relative max-w-7xl max-h-[95vh] w-full flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-3">
            {/* Orientation Badge */}
            <Badge
              variant="primary"
              size="md"
              className="shadow-lg"
            >
              {orientation === 'landscape' ? 'Landscape' : 'Portrait'}
            </Badge>

            {/* Aspect Ratio Badge */}
            <Badge variant="neutral" size="md" className="shadow-lg">
              {aspectRatio}
            </Badge>

            {/* Dimensions */}
            {dimensions && (
              <Badge variant="neutral" size="md" className="bg-black/60 backdrop-blur-sm text-white border-white/20 shadow-lg">
                {dimensions.width} &times; {dimensions.height}
              </Badge>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Download Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              className="bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm shadow-lg"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-black/60 hover:bg-black/80 text-white transition-colors shadow-lg backdrop-blur-sm"
              aria-label="Close"
              type="button"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="flex items-center justify-center flex-1 min-h-0">
          <img
            src={imageUrl}
            alt={`${orientation} thumbnail (${aspectRatio})`}
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
          />
        </div>

        {/* Footer with Metadata */}
        {metadata && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center justify-center gap-6 text-white dark:text-gray-200 text-sm">
              {metadata.generatedAt && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Generated:</span>
                  <span className="font-medium">{formatDate(metadata.generatedAt)}</span>
                </div>
              )}

              {metadata.model && (
                <>
                  <span className="text-gray-500">&bull;</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Model:</span>
                    <Badge variant="neutral" size="sm" className="bg-white/10 text-white border-white/20">
                      {metadata.model}
                    </Badge>
                  </div>
                </>
              )}

              {metadata.processingTime && (
                <>
                  <span className="text-gray-500">&bull;</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Processing Time:</span>
                    <span className="font-medium">{formatProcessingTime(metadata.processingTime)}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Keyboard Hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-400 dark:text-gray-500 text-xs opacity-60">
          Press <kbd className="px-1.5 py-0.5 bg-white/10 dark:bg-white/20 rounded text-white dark:text-gray-200">ESC</kbd> to close
        </div>
      </div>
    </div>
  );
};

ThumbnailLightbox.displayName = 'ThumbnailLightbox';

export default ThumbnailLightbox;
