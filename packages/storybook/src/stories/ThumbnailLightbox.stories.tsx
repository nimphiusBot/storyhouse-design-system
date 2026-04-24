import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThumbnailLightbox, Button } from '@storyhouse/components';

const meta: Meta<typeof ThumbnailLightbox> = {
  title: 'Components/ThumbnailLightbox',
  component: ThumbnailLightbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ThumbnailLightbox>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Lightbox</Button>
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
      </>
    );
  },
};

export const Portrait: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Portrait</Button>
        <ThumbnailLightbox
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          imageUrl="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400"
          orientation="portrait"
          aspectRatio="9:16"
        />
      </>
    );
  },
};

export const NoMetadata: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Lightbox</Button>
        <ThumbnailLightbox
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          imageUrl="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800"
          orientation="landscape"
          aspectRatio="16:9"
        />
      </>
    );
  },
};
