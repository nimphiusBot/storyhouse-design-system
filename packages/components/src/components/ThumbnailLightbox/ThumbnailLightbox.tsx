import React, { useEffect, useRef, useState } from 'react';
import { X, Download, Loader2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

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
  // Track animation/mounting state so the body scroll lock is held
  // during the full lifecycle: entering, visible, and exit animation.
  // This prevents closing one overlay from releasing the lock when
  // another overlay is still open behind it.
  const [shouldRender, setShouldRender] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Manage render lifecycle with a short delay to allow exit animations
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      return;
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Close on Escape key — only active when lightbox is open
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseRef.current();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  // Stack-aware body scroll lock — coordinates with Modal, SlidePanel, etc.
  // Uses isOpen || shouldRender so the lock is held through the full lifecycle:
  // initial render, panel visible, and close animation.
  useBodyScrollLock(isOpen || shouldRender);

  // Reset download error when lightbox opens/closes or imageUrl changes
  // NOTE: Must be declared before any conditional return to avoid hook order violation
  useEffect(() => {
    setDownloadError(null);
    setIsDownloading(false);
  }, [imageUrl, isOpen]);

  if (!shouldRender) return null;

  /**
   * Downloads the image via a three-tier strategy:
   *
   * 1. **Direct `<a download>`** — Same-origin and CORS-approved images
   *    (works immediately, no Blob overhead)
   * 2. **Fetch + Blob** — CORS-enabled external resources
   * 3. **Open in new tab** — Universal fallback for CORS-restricted images
   */
  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    setDownloadError(null);

    const filename = `thumbnail-${orientation}`;

    const downloadBlob = (blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    };

    try {
      // Strategy 1: Direct <a download> — works for same-origin images
      const isSameOrigin =
        imageUrl.startsWith(window.location.origin) ||
        imageUrl.startsWith('/') ||
        !imageUrl.startsWith('http');

      if (isSameOrigin) {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setIsDownloading(false);
        return;
      }
    } catch {
      // Same-origin approach failed, move to next strategy
    }

    try {
      // Strategy 2: Fetch with CORS
      const response = await fetch(imageUrl, { mode: 'cors', credentials: 'omit' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();
      downloadBlob(blob);
      setIsDownloading(false);
      return;
    } catch (error) {
      console.warn('Fetch download failed (likely CORS), trying canvas approach:', error);
    }

    try {
      // Strategy 3: Canvas-based download with crossOrigin attribute
      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Image failed to load with crossOrigin'));
        img.src = imageUrl;
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');
      ctx.drawImage(img, 0, 0);

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob((b) => resolve(b))
      );
      if (blob) {
        downloadBlob(blob);
        setIsDownloading(false);
        return;
      }
    } catch (error) {
      console.warn('Canvas download failed (CORS taint), opening in new tab:', error);
    }

    // Strategy 4: Universal fallback — open image in new tab for manual saving
    window.open(imageUrl, '_blank');
    setDownloadError('Could not download directly. Image opened in new tab for manual saving.');
    setIsDownloading(false);
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
              disabled={isDownloading}
              className="bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDownloading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              {isDownloading ? 'Downloading…' : 'Download'}
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

        {/* Download error toast */}
        {downloadError && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20">
            <div className="px-4 py-2 bg-yellow-900/90 backdrop-blur-sm text-yellow-200 text-sm rounded-lg shadow-lg border border-yellow-700">
              {downloadError}
            </div>
          </div>
        )}

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
