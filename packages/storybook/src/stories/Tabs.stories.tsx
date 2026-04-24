import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Tabs, TabsContent } from './stubs';
import { Mail, Settings, Bell, User } from 'lucide-react';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'pills'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const sampleTabs = [
  { label: 'Account', value: 'account' },
  { label: 'Notifications', value: 'notifications' },
  { label: 'Settings', value: 'settings' },
];

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState('account');
    return (
      <div className="w-96">
        <Tabs tabs={sampleTabs} activeTab={active} onTabChange={setActive}>
          <TabsContent value="account" activeTab={active}>
            <p className="text-sm text-gray-600">Account settings content.</p>
          </TabsContent>
          <TabsContent value="notifications" activeTab={active}>
            <p className="text-sm text-gray-600">Notification preferences.</p>
          </TabsContent>
          <TabsContent value="settings" activeTab={active}>
            <p className="text-sm text-gray-600">General settings.</p>
          </TabsContent>
        </Tabs>
      </div>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const [active, setActive] = useState('inbox');
    const tabs = [
      { label: 'Inbox', value: 'inbox', icon: <Mail className="w-4 h-4" /> },
      { label: 'Updates', value: 'updates', icon: <Bell className="w-4 h-4" /> },
      { label: 'Profile', value: 'profile', icon: <User className="w-4 h-4" /> },
    ];
    return (
      <div className="w-96">
        <Tabs tabs={tabs} activeTab={active} onTabChange={setActive}>
          <TabsContent value="inbox" activeTab={active}>
            <p className="text-sm text-gray-600">Your inbox messages.</p>
          </TabsContent>
          <TabsContent value="updates" activeTab={active}>
            <p className="text-sm text-gray-600">Latest updates.</p>
          </TabsContent>
          <TabsContent value="profile" activeTab={active}>
            <p className="text-sm text-gray-600">Profile settings.</p>
          </TabsContent>
        </Tabs>
      </div>
    );
  },
};

export const WithBadges: Story = {
  render: () => {
    const [active, setActive] = useState('inbox');
    const tabs = [
      { label: 'Inbox', value: 'inbox', badge: 12 },
      { label: 'Drafts', value: 'drafts', badge: 3 },
      { label: 'Sent', value: 'sent', badge: 0 },
    ];
    return (
      <div className="w-96">
        <Tabs tabs={tabs} activeTab={active} onTabChange={setActive}>
          <TabsContent value="inbox" activeTab={active}>
            <p className="text-sm text-gray-600">12 unread messages.</p>
          </TabsContent>
          <TabsContent value="drafts" activeTab={active}>
            <p className="text-sm text-gray-600">3 draft messages.</p>
          </TabsContent>
          <TabsContent value="sent" activeTab={active}>
            <p className="text-sm text-gray-600">Sent messages.</p>
          </TabsContent>
        </Tabs>
      </div>
    );
  },
};

export const Pills: Story = {
  render: () => {
    const [active, setActive] = useState('general');
    const tabs = [
      { label: 'General', value: 'general' },
      { label: 'Security', value: 'security' },
      { label: 'Privacy', value: 'privacy' },
    ];
    return (
      <div className="w-96">
        <Tabs variant="pills" tabs={tabs} activeTab={active} onTabChange={setActive}>
          <TabsContent value="general" activeTab={active}>
            <p className="text-sm text-gray-600">General settings.</p>
          </TabsContent>
          <TabsContent value="security" activeTab={active}>
            <p className="text-sm text-gray-600">Security settings.</p>
          </TabsContent>
          <TabsContent value="privacy" activeTab={active}>
            <p className="text-sm text-gray-600">Privacy settings.</p>
          </TabsContent>
        </Tabs>
      </div>
    );
  },
};

export const DisabledTab: Story = {
  render: () => {
    const [active, setActive] = useState('available');
    const tabs = [
      { label: 'Available', value: 'available' },
      { label: 'Pending', value: 'pending', disabled: true },
      { label: 'Archived', value: 'archived' },
    ];
    return (
      <div className="w-96">
        <Tabs tabs={tabs} activeTab={active} onTabChange={setActive}>
          <TabsContent value="available" activeTab={active}>
            <p className="text-sm text-gray-600">Available items.</p>
          </TabsContent>
          <TabsContent value="archived" activeTab={active}>
            <p className="text-sm text-gray-600">Archived items.</p>
          </TabsContent>
        </Tabs>
      </div>
    );
  },
};
