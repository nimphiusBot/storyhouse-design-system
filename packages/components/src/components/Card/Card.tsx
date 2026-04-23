import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'bordered' | 'flat';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const variantStyles = {
  default: 'bg-white shadow-sm border border-gray-200',
  elevated: 'bg-white shadow-md border border-gray-100',
  bordered: 'bg-white border-2 border-gray-200',
  flat: 'bg-gray-50',
};

const paddingStyles = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-6',
  lg: 'p-8',
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, variant = 'default', padding = 'md' }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl',
          variantStyles[variant],
          paddingStyles[padding],
          className
        )}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={cn('mb-4 flex items-center justify-between', className)}>
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

export interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, className, as: Tag = 'h3' }, ref) => {
    return (
      <Tag ref={ref} className={cn('text-lg font-semibold text-gray-900', className)}>
        {children}
      </Tag>
    );
  }
);

CardTitle.displayName = 'CardTitle';

export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={cn('text-gray-700', className)}>
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('mt-4 flex items-center gap-2 border-t border-gray-100 pt-4', className)}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';