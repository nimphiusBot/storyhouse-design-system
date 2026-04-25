import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Youtube, Music, Instagram, Facebook } from 'lucide-react';

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * SocialIcon Component
 *
 * A simple icon component for common social media platforms.
 * Supports YouTube, TikTok, Instagram, and Facebook.
 *
 * @example
 * ```tsx
 * <SocialIcon type="youtube" size={24} />
 * <SocialIcon type="instagram" href="https://instagram.com/..." />
 * ```
 */
export type SocialIconType = 'youtube' | 'tiktok' | 'instagram' | 'facebook';

export interface SocialIconProps {
  /** Social media platform type */
  type: SocialIconType;
  /** Optional link URL (wraps icon in an anchor tag) */
  href?: string;
  /** Icon size in pixels (passed as width/height to lucide icons) */
  size?: number;
  /** Additional CSS classes */
  className?: string;
  /** Accessible label (defaults to platform name) */
  label?: string;
  /** Open link in new tab */
  external?: boolean;
}

const iconMap: Record<SocialIconType, React.FC<{ size?: number; className?: string }>> = {
  youtube: Youtube,
  tiktok: Music,
  instagram: Instagram,
  facebook: Facebook,
};

const labelMap: Record<SocialIconType, string> = {
  youtube: 'YouTube',
  tiktok: 'TikTok',
  instagram: 'Instagram',
  facebook: 'Facebook',
};

/**
 * SocialIcon — render a social media platform icon.
 * Can optionally render as a link when `href` is provided.
 */
export const SocialIcon: React.FC<SocialIconProps> = ({
  type,
  href,
  size = 20,
  className,
  label,
  external = true,
}) => {
  const Icon = iconMap[type];
  const ariaLabel = label || labelMap[type];

  const iconElement = (
    <Icon
      size={size}
      className={cn('inline-block', className)}
      aria-hidden="true"
    />
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        aria-label={ariaLabel}
        className={cn('inline-flex items-center justify-center hover:opacity-80 dark:hover:opacity-60 transition-opacity', className)}
      >
        {iconElement}
      </a>
    );
  }

  return (
    <span
      aria-label={ariaLabel}
      role="img"
      className={cn('inline-flex items-center justify-center', className)}
    >
      {iconElement}
    </span>
  );
};

SocialIcon.displayName = 'SocialIcon';
