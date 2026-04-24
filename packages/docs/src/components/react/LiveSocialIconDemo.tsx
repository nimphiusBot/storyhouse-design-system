import React from 'react';
import { SocialIcon } from '@storyhouse/components';

export default function LiveSocialIconDemo(): React.ReactNode {
  return (
    <div className="space-y-8">
      {/* All Platforms */}
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">All Platforms (24px)</p>
        <div className="flex items-center gap-4">
          <SocialIcon type="youtube" size={24} />
          <SocialIcon type="tiktok" size={24} />
          <SocialIcon type="instagram" size={24} />
          <SocialIcon type="facebook" size={24} />
        </div>
      </div>

      {/* Size Comparison */}
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Size Comparison</p>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs text-gray-400">16px</p>
            <SocialIcon type="instagram" size={16} />
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs text-gray-400">24px</p>
            <SocialIcon type="instagram" size={24} />
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs text-gray-400">32px</p>
            <SocialIcon type="instagram" size={32} />
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs text-gray-400">48px</p>
            <SocialIcon type="instagram" size={48} />
          </div>
        </div>
      </div>

      {/* As Links */}
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">As Links (clickable)</p>
        <div className="flex items-center gap-4">
          <SocialIcon type="youtube" size={24} href="https://youtube.com" />
          <SocialIcon type="tiktok" size={24} href="https://tiktok.com" />
          <SocialIcon type="instagram" size={24} href="https://instagram.com" />
          <SocialIcon type="facebook" size={24} href="https://facebook.com" />
        </div>
        <p className="mt-2 text-xs text-gray-400">Icons above are clickable links (open in new tab).</p>
      </div>
    </div>
  );
}
