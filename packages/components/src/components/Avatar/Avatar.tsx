import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'circle' | 'square';
  fallback?: React.ReactNode;
}

const sizeDimensions = {
  xs: { size: 24, text: 'text-xs', iconSize: 12 },
  sm: { size: 32, text: 'text-sm', iconSize: 16 },
  md: { size: 40, text: 'text-base', iconSize: 20 },
  lg: { size: 56, text: 'text-lg', iconSize: 28 },
  xl: { size: 72, text: 'text-xl', iconSize: 36 },
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

// Deterministic color from name
function getNameColor(name: string): string {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-indigo-500',
    'bg-teal-500',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length] ?? 'bg-blue-500';
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt = '', name, className, size = 'md', variant = 'circle', fallback }, ref) => {
    const dimensions = sizeDimensions[size]!;
    const [imgError, setImgError] = React.useState(false);

    const shapeStyles = variant === 'circle' ? 'rounded-full' : 'rounded-lg';

    const containerStyles = cn(
      'relative inline-flex items-center justify-center overflow-hidden',
      shapeStyles,
      className
    );

    // Image avatar
    if (src && !imgError) {
      return (
        <div
          ref={ref}
          className={containerStyles}
          style={{ width: dimensions.size, height: dimensions.size }}
        >
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        </div>
      );
    }

    // Name-based initial fallback
    if (name) {
      const initials = getInitials(name);
      const colorClass = getNameColor(name);
      return (
        <div
          ref={ref}
          className={cn(
            containerStyles,
            colorClass,
            'text-white font-medium'
          )}
          style={{ width: dimensions.size, height: dimensions.size }}
          title={name}
          role="img"
          aria-label={alt || name}
        >
          <span className={dimensions.text}>{initials}</span>
        </div>
      );
    }

    // Default fallback icon
    return (
      <div
        ref={ref}
        className={cn(
          containerStyles,
          'bg-gray-200 text-gray-500',
          className
        )}
        style={{ width: dimensions.size, height: dimensions.size }}
        role="img"
        aria-label={alt || 'User avatar'}
      >
        {fallback || (
          <svg
            className={dimensions.text}
            fill="currentColor"
            viewBox="0 0 24 24"
            width={dimensions.iconSize}
            height={dimensions.iconSize}
          >
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v1.2c0 .66.54 1.2 1.2 1.2h16.8c.66 0 1.2-.54 1.2-1.2v-1.2c0-3.2-6.4-4.8-9.6-4.8z" />
          </svg>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';