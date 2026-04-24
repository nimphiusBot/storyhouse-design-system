import type { Meta, StoryObj } from '@storybook/react';
import { SocialIcon } from './stubs';

const meta: Meta<typeof SocialIcon> = {
  title: 'Components/SocialIcon',
  component: SocialIcon,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['youtube', 'tiktok', 'instagram', 'facebook'] },
    size: { control: 'number', min: 12, max: 64, step: 4 },
  },
};

export default meta;
type Story = StoryObj<typeof SocialIcon>;

export const YouTube: Story = {
  args: { type: 'youtube', size: 24 },
};

export const TikTok: Story = {
  args: { type: 'tiktok', size: 24 },
};

export const Instagram: Story = {
  args: { type: 'instagram', size: 24 },
};

export const Facebook: Story = {
  args: { type: 'facebook', size: 24 },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs text-gray-500">16px</p>
        <SocialIcon type="youtube" size={16} />
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs text-gray-500">24px</p>
        <SocialIcon type="youtube" size={24} />
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs text-gray-500">32px</p>
        <SocialIcon type="youtube" size={32} />
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs text-gray-500">48px</p>
        <SocialIcon type="youtube" size={48} />
      </div>
    </div>
  ),
};

export const WithLink: Story = {
  args: {
    type: 'instagram',
    size: 24,
    href: 'https://instagram.com/example',
  },
};

export const AllPlatforms: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <SocialIcon type="youtube" size={24} />
      <SocialIcon type="tiktok" size={24} />
      <SocialIcon type="instagram" size={24} />
      <SocialIcon type="facebook" size={24} />
    </div>
  ),
};
