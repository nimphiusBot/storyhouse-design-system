import React, { useState, useRef, useCallback } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  Upload,
  File,
  X,
  Image,
  FileText,
  Film,
  Music,
  Archive,
  AlertCircle,
} from 'lucide-react';

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const fileUploadVariants = cva(
  'w-full border-2 border-dashed rounded-lg transition-all duration-200',
  {
    variants: {
      variant: {
        default:
          'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 hover:border-gray-400 dark:hover:border-gray-500',
        primary:
          'border-orange-300 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/20 hover:border-orange-400 dark:hover:border-orange-600',
        error:
          'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 hover:border-red-400 dark:hover:border-red-600',
        success:
          'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 hover:border-green-400 dark:hover:border-green-600',
      },
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
      isDragging: {
        true: 'border-orange-500 bg-orange-50 dark:bg-orange-900/30 scale-[1.02]',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      isDragging: false,
    },
  }
);

/**
 * Maps a MIME type or pattern (e.g. "image/*", ".pdf", "application/pdf")
 * to a human-readable label for display in the UI.
 */
function mimeTypeToLabel(pattern: string): string {
  const lower = pattern.trim().toLowerCase();

  const knownLabels: Record<string, string> = {
    'image/*': 'Images',
    'image/jpeg': 'JPEG Images',
    'image/png': 'PNG Images',
    'image/gif': 'GIF Images',
    'image/webp': 'WebP Images',
    'image/svg+xml': 'SVG Images',
    'video/*': 'Videos',
    'video/mp4': 'MP4 Videos',
    'video/webm': 'WebM Videos',
    'video/ogg': 'OGG Videos',
    'audio/*': 'Audio',
    'audio/mpeg': 'MP3 Audio',
    'audio/wav': 'WAV Audio',
    'audio/ogg': 'OGG Audio',
    'application/pdf': 'PDF Documents',
    'application/msword': 'Word Documents',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Word Documents',
    'application/vnd.ms-excel': 'Excel Spreadsheets',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Excel Spreadsheets',
    'text/*': 'Text Files',
    'text/plain': 'Plain Text',
    'text/csv': 'CSV Files',
    'text/html': 'HTML Files',
    'application/zip': 'ZIP Archives',
    'application/x-rar-compressed': 'RAR Archives',
    'application/x-7z-compressed': '7z Archives',
    '.pdf': 'PDF Files',
    '.doc': 'Word Documents',
    '.docx': 'Word Documents',
    '.xls': 'Excel Spreadsheets',
    '.xlsx': 'Excel Spreadsheets',
    '.csv': 'CSV Files',
    '.json': 'JSON Files',
    '.xml': 'XML Files',
    '.zip': 'ZIP Archives',
    '.rar': 'RAR Archives',
    '.png': 'PNG Images',
    '.jpg': 'JPEG Images',
    '.jpeg': 'JPEG Images',
    '.gif': 'GIF Images',
    '.webp': 'WebP Images',
    '.svg': 'SVG Images',
    '.mp4': 'MP4 Videos',
    '.mp3': 'MP3 Audio',
    '.txt': 'Text Files',
    // Catch-all extension patterns
    '.js': 'JavaScript Files',
    '.ts': 'TypeScript Files',
    '.tsx': 'TypeScript Files',
    '.css': 'CSS Files',
    '.scss': 'SCSS Files',
    '.md': 'Markdown Files',
  };

  if (knownLabels[lower]) return knownLabels[lower];

  // Extract extension from patterns like "image/*"
  if (lower.endsWith('/*')) {
    const category = lower.replace('/*', '');
    return category.charAt(0).toUpperCase() + category.slice(1);
  }
  // For MIME types like "application/vnd.ms-powerpoint"
  if (lower.startsWith('application/')) {
    const name = lower.replace('application/', '').replace(/^vnd\./, '').replace(/\./g, ' ');
    return name.charAt(0).toUpperCase() + name.slice(1) + ' Files';
  }
  // For extensions like ".cfg" — show as-is
  if (lower.startsWith('.')) {
    return lower.slice(1).toUpperCase() + ' Files';
  }

  // Default: return the value as a label
  return pattern;
}

/**
 * Parses an accept string into an array of individual MIME/extension patterns.
 */
function parseAcceptPatterns(accept: string): string[] {
  return accept
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export interface FileUploadProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'onChange'>,
    VariantProps<typeof fileUploadVariants> {
  /** Label displayed above the dropzone */
  label?: string;
  /** Error message displayed below the dropzone */
  error?: string;
  /** Help text displayed below the dropzone */
  helpText?: string;
  /** Callback fired when the selected files change */
  onFilesChange?: (files: File[]) => void;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Maximum number of files allowed */
  maxFiles?: number;
  /** Whether to show image previews for uploaded files */
  showPreview?: boolean;
  /** Whether to show the file list after upload */
  showFileList?: boolean;
  /** Custom icon to display in the dropzone */
  icon?: React.ReactNode;
  /** Custom drag-and-drop text */
  dragText?: string;
  /** Custom browse button text */
  browseText?: string;
  /**
   * Accepted file types — passed directly to the native `<input type="file">` element.
   *
   * Supports:
   * - MIME type patterns: `"image/*"`, `"video/*"`, `"application/pdf"`
   * - Specific MIME types: `"image/jpeg,image/png"`
   * - File extensions: `".pdf,.doc,.docx"`
   * - Combinations: `"image/*,.pdf"`
   *
   * @example "image/*"
   * @example ".pdf,.doc,.docx"
   * @example "image/jpeg,image/png"
   * @example "image/*,video/*"
   */
  accept?: string;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (
    Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  );
};

const getFileIcon = (file: File) => {
  const type = file.type;
  if (type.startsWith('image/')) return <Image className="h-5 w-5" />;
  if (type.startsWith('video/')) return <Film className="h-5 w-5" />;
  if (type.startsWith('audio/')) return <Music className="h-5 w-5" />;
  if (
    type.includes('zip') ||
    type.includes('rar') ||
    type.includes('7z')
  )
    return <Archive className="h-5 w-5" />;
  if (
    type.includes('pdf') ||
    type.includes('document') ||
    type.includes('text')
  )
    return <FileText className="h-5 w-5" />;
  return <File className="h-5 w-5" />;
};

/**
 * Checks whether a File matches a single accept pattern.
 */
function matchAcceptPattern(file: File, pattern: string): boolean {
  if (pattern.startsWith('.')) {
    // Extension-based matching
    const fileExtension = '.' + (file.name.split('.').pop()?.toLowerCase() ?? '');
    return fileExtension === pattern.toLowerCase();
  }

  if (pattern.endsWith('/*')) {
    // Wildcard MIME type (e.g., "image/*")
    return file.type.startsWith(pattern.replace('/*', ''));
  }

  // Exact MIME type matching
  return file.type === pattern;
}

/**
 * Checks whether a File matches any of the given accept patterns.
 */
function isFileAccepted(file: File, acceptPatterns: string[]): boolean {
  return acceptPatterns.some((pattern) => matchAcceptPattern(file, pattern));
}

export const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      label,
      error,
      helpText,
      onFilesChange,
      maxSize,
      maxFiles = 1,
      multiple = false,
      accept,
      showPreview = true,
      showFileList = true,
      icon,
      dragText = 'Drag and drop files here',
      browseText = 'or click to browse',
      variant = 'default',
      size = 'md',
      className,
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [fileErrors, setFileErrors] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const acceptPatterns = accept ? parseAcceptPatterns(accept) : [];
    const acceptedLabels = acceptPatterns.map(mimeTypeToLabel);

    const validateFiles = useCallback(
      (fileList: FileList | File[]): { valid: File[]; errors: string[] } => {
        const newFiles = Array.from(fileList);
        const errors: string[] = [];
        const valid: File[] = [];

        const totalFiles = multiple ? files.length + newFiles.length : newFiles.length;

        if (multiple && maxFiles != null && totalFiles > maxFiles) {
          errors.push(
            `Maximum ${maxFiles} file${maxFiles > 1 ? 's' : ''} allowed`
          );
          return { valid: [], errors };
        }

        for (const file of newFiles) {
          if (maxSize != null && file.size > maxSize) {
            errors.push(
              `${file.name} exceeds the maximum size of ${formatFileSize(maxSize)}`
            );
            continue;
          }

          if (acceptPatterns.length > 0 && !isFileAccepted(file, acceptPatterns)) {
            errors.push(
              `${file.name} is not an accepted file type. Accepted: ${acceptedLabels.join(', ')}`
            );
            continue;
          }

          valid.push(file);
        }

        return { valid, errors };
      },
      [files.length, multiple, maxFiles, maxSize, acceptPatterns, acceptedLabels]
    );

    const handleFiles = useCallback(
      (fileList: FileList | File[]) => {
        const { valid, errors } = validateFiles(fileList);
        setFileErrors((prev) => [...prev, ...errors]);

        if (valid.length > 0) {
          const newFiles = multiple ? [...files, ...valid] : valid;
          setFiles(newFiles);
          onFilesChange?.(newFiles);
        }
      },
      [files, multiple, onFilesChange, validateFiles]
    );

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (!disabled && e.dataTransfer.files) {
        handleFiles(e.dataTransfer.files);
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) handleFiles(e.target.files);
    };

    const handleRemoveFile = (index: number) => {
      const newFiles = files.filter((_, i) => i !== index);
      setFiles(newFiles);
      onFilesChange?.(newFiles);
      setFileErrors([]);
    };

    const clearErrors = () => {
      setFileErrors([]);
    };

    const handleClick = () => {
      if (!disabled) {
        clearErrors();
        inputRef.current?.click();
      }
    };

    const effectiveVariant =
      error || fileErrors.length > 0 ? 'error' : variant;

    return (
      <div className="w-full">
        {label && (
          <label
            className={cn(
              'block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300',
              disabled && 'opacity-50 cursor-not-allowed',
              required && 'after:content-["_*"] after:text-red-500'
            )}
          >
            {label}
          </label>
        )}

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
          onKeyDown={(e) => {
            if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              handleClick();
            }
          }}
          className={cn(
            fileUploadVariants({
              variant: effectiveVariant,
              size,
              isDragging,
            }),
            disabled && 'opacity-50 cursor-not-allowed',
            !disabled && 'cursor-pointer',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2',
            className
          )}
        >
          <input
            ref={(el) => {
              (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
              if (typeof ref === 'function') ref(el);
              else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
            }}
            type="file"
            multiple={multiple}
            accept={accept}
            onChange={handleInputChange}
            disabled={disabled}
            required={required}
            className="hidden"
            {...props}
          />

          <div className="flex flex-col items-center justify-center text-center">
            {icon || (
              <Upload
                className={cn(
                  'mb-3 text-gray-400 dark:text-gray-500',
                  size === 'sm' && 'h-8 w-8',
                  size === 'md' && 'h-10 w-10',
                  size === 'lg' && 'h-12 w-12'
                )}
              />
            )}

            <p
              className={cn(
                'font-medium',
                size === 'sm' && 'text-sm',
                size === 'md' && 'text-base',
                size === 'lg' && 'text-lg',
                isDragging
                  ? 'text-orange-600 dark:text-orange-400'
                  : 'text-gray-700 dark:text-gray-300'
              )}
            >
              {isDragging ? 'Drop files here' : dragText}
            </p>

            <p
              className={cn(
                'mt-1 text-gray-500 dark:text-gray-400',
                size === 'sm' && 'text-xs',
                size === 'md' && 'text-sm',
                size === 'lg' && 'text-base'
              )}
            >
              {browseText}
            </p>

            {(accept || maxSize != null || maxFiles > 1) && (
              <div
                className={cn(
                  'mt-2 flex flex-wrap items-center justify-center gap-x-1 text-gray-400 dark:text-gray-500',
                  size === 'sm' && 'text-xs',
                  size === 'md' && 'text-xs',
                  size === 'lg' && 'text-sm'
                )}
              >
                {accept && (
                  <span>
                    Accepts: {acceptedLabels.join(', ')}
                  </span>
                )}
                {accept && maxSize != null && <span aria-hidden="true">·</span>}
                {maxSize != null && (
                  <span>Max: {formatFileSize(maxSize)}</span>
                )}
                {maxFiles > 1 && (
                  <>
                    {accept && maxSize == null && maxFiles > 1 && (
                      <span aria-hidden="true">·</span>
                    )}
                    <span>Up to {maxFiles} files</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {showFileList && files.length > 0 && (
          <ul className="mt-3 space-y-2" aria-label="Uploaded files">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${file.size}-${file.lastModified}-${index}`}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {showPreview && file.type.startsWith('image/') ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="h-10 w-10 object-cover rounded shrink-0"
                    />
                  ) : (
                    <div className="shrink-0 text-gray-400 dark:text-gray-500">
                      {getFileIcon(file)}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>

                {!disabled && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile(index);
                    }}
                    className="shrink-0 ml-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    aria-label={`Remove ${file.name}`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}

        {helpText && !error && fileErrors.length === 0 && (
          <p
            className={cn(
              'mt-2 text-sm text-gray-500 dark:text-gray-400',
              disabled && 'opacity-50'
            )}
          >
            {helpText}
          </p>
        )}

        {(error || fileErrors.length > 0) && (
          <div className="mt-2 space-y-1">
            {error && (
              <p className="flex items-center gap-1 text-sm text-red-600 dark:text-red-400" role="alert">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                {error}
              </p>
            )}
            {fileErrors.map((err, index) => (
              <p
                key={index}
                className="flex items-center gap-1 text-sm text-red-600 dark:text-red-400"
                role="alert"
              >
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                {err}
              </p>
            ))}
          </div>
        )}
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';
