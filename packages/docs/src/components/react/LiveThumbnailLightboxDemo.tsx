import React, { useState } from 'react';
import { ThumbnailLightbox, Button } from '@storyhouse/components';

const ThumbnailLightboxDemo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Click the button to open the thumbnail lightbox.
      </p>
      <Button onClick={() => setIsOpen(true)}>
        Open Lightbox
      </Button>
      <ThumbnailLightbox
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        imageUrl="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800"
        orientation="landscape"
        aspectRatio="16:9"
        dimensions={{ width: 1920, height: 1080 }}
        metadata={{
          generatedAt: new Date().toISOString(),
          model: 'DALL-E 3',
          processingTime: 2450,
        }}
      />
    </div>
  );
};

export default ThumbnailLightboxDemo;
