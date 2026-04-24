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

export interface FileUploadProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'>,
    VariantProps<typeof fileUploadVariants> {
  label?: string;
  error?: string;
  helpText?: string;
  onFilesChange?: (files: File[]) => void;
  maxSize?: number;
  maxFiles?: number;
  showPreview?: boolean;
  showFileList?: boolean;
  icon?: React.ReactNode;
  dragText?: string;
  browseText?: string;
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

    const validateFiles = (
      fileList: FileList | File[]
    ): { valid: File[]; errors: string[] } => {
      const newFiles = Array.from(fileList);
      const errors: string[] = [];
      const valid: File[] = [];

      if (maxFiles && files.length + newFiles.length > maxFiles) {
        errors.push(
          `Maximum ${maxFiles} file${maxFiles > 1 ? 's' : ''} allowed`
        );
        return { valid: [], errors };
      }

      newFiles.forEach((file) => {
        if (maxSize && file.size > maxSize) {
          errors.push(
            `${file.name} exceeds maximum size of ${formatFileSize(maxSize)}`
          );
          return;
        }

        if (accept) {
          const acceptedTypes = accept.split(',').map((t) => t.trim());
          const fileExtension =
            '.' + file.name.split('.').pop()?.toLowerCase();
          const isAccepted = acceptedTypes.some((type) => {
            if (type.startsWith('.')) {
              return fileExtension === type.toLowerCase();
            }
            if (type.endsWith('/*')) {
              return file.type.startsWith(type.replace('/*', ''));
            }
            return file.type === type;
          });

          if (!isAccepted) {
            errors.push(`${file.name} is not an accepted file type`);
            return;
          }
        }

        valid.push(file);
      });

      return { valid, errors };
    };

    const handleFiles = useCallback(
      (fileList: FileList | File[]) => {
        const { valid, errors } = validateFiles(fileList);
        setFileErrors(errors);

        if (valid.length > 0) {
          const newFiles = multiple ? [...files, ...valid] : valid;
          setFiles(newFiles);
          onFilesChange?.(newFiles);
        }
      },
      [files, multiple, maxSize, maxFiles, accept, onFilesChange]
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

    const handleClick = () => {
      if (!disabled) inputRef.current?.click();
    };

    const effectiveVariant =
      error || fileErrors.length > 0 ? 'error' : variant;

    return (
      <div className="w-full">
        {label && (
          <label
            className={cn(
              'block text-sm font-medium mb-2',
              error || fileErrors.length > 0
                ? 'text-red-700 dark:text-red-400'
                : 'text-gray-700 dark:text-gray-300',
              disabled && 'opacity-50'
            )}
          >
            {label}
            {required && (
              <span className="text-red-500 ml-1">*</span>
            )}
          </label>
        )}

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
          className={cn(
            fileUploadVariants({
              variant: effectiveVariant,
              size,
              isDragging,
            }),
            disabled && 'opacity-50 cursor-not-allowed',
            !disabled && 'cursor-pointer',
            className
          )}
        >
          <input
            ref={ref || inputRef}
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
                  'text-gray-400 dark:text-gray-500 mb-3',
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
                'text-gray-500 dark:text-gray-400 mt-1',
                size === 'sm' && 'text-xs',
                size === 'md' && 'text-sm',
                size === 'lg' && 'text-base'
              )}
            >
              {browseText}
            </p>

            {(accept || maxSize || maxFiles > 1) && (
              <div
                className={cn(
                  'mt-2 text-gray-400 dark:text-gray-500',
                  size === 'sm' && 'text-xs',
                  size === 'md' && 'text-xs',
                  size === 'lg' && 'text-sm'
                )}
              >
                {accept && <div>Accepted: {accept}</div>}
                {maxSize && <div>Max size: {formatFileSize(maxSize)}</div>}
                {maxFiles > 1 && <div>Max files: {maxFiles}</div>}
              </div>
            )}
          </div>
        </div>

        {showFileList && files.length > 0 && (
          <div className="mt-3 space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {showPreview && file.type.startsWith('image/') ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="h-10 w-10 object-cover rounded"
                    />
                  ) : (
                    <div className="text-gray-400 dark:text-gray-500">
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
                    className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors ml-2"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
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
              <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                {error}
              </p>
            )}
            {fileErrors.map((err, index) => (
              <p
                key={index}
                className="text-sm text-red-600 dark:text-red-400"
                role="alert"
              >
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
