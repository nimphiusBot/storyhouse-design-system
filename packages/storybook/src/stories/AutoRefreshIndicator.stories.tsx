import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AutoRefreshIndicator } from './stubs';

const meta: Meta<typeof AutoRefreshIndicator> = {
  title: 'Components/AutoRefreshIndicator',
  component: AutoRefreshIndicator,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    enabled: { control: 'boolean' },
    isPolling: { control: 'boolean' },
    intervalLabel: { control: 'text' },
    tabHidden: { control: 'boolean' },
    lastPolledLabel: { control: 'text' },
    lastPollFailed: { control: 'boolean' },
    dataJustRefreshed: { control: 'boolean' },
    effectiveIntervalLabel: { control: 'text' },
    paused: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof AutoRefreshIndicator>;

export const Enabled: Story = {
  args: {
    enabled: true,
    isPolling: false,
    intervalLabel: '30s',
    lastPolledLabel: '2m ago',
    lastPolledAt: Date.now() - 120000,
  },
};

export const Polling: Story = {
  args: {
    enabled: true,
    isPolling: true,
    intervalLabel: '30s',
  },
};

export const Paused: Story = {
  args: {
    enabled: true,
    isPolling: false,
    intervalLabel: '30s',
    paused: true,
    lastPolledLabel: '1m ago',
  },
};

export const TabHidden: Story = {
  args: {
    enabled: true,
    isPolling: false,
    intervalLabel: '30s',
    tabHidden: true,
  },
};

export const LastPollFailed: Story = {
  args: {
    enabled: true,
    isPolling: false,
    intervalLabel: '30s',
    lastPollFailed: true,
    lastPolledLabel: '1m ago',
  },
};

export const Disabled: Story = {
  args: {
    enabled: false,
    isPolling: false,
    intervalLabel: '30s',
  },
};

export const DataJustRefreshed: Story = {
  args: {
    enabled: true,
    isPolling: false,
    intervalLabel: '30s',
    dataJustRefreshed: true,
    lastPolledLabel: 'just now',
  },
};

export const WithEffectiveInterval: Story = {
  args: {
    enabled: true,
    isPolling: false,
    intervalLabel: '30s',
    effectiveIntervalLabel: '60s (backoff)',
    lastPolledLabel: '3m ago',
  },
};

export const TabHiddenVsPaused: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="text-xs text-gray-500">Tab hidden (automatic):</div>
      <div><AutoRefreshIndicator enabled isPolling={false} intervalLabel="30s" tabHidden lastPolledLabel="2m ago" /></div>
      <div className="text-xs text-gray-500">Paused (programmatic):</div>
      <div><AutoRefreshIndicator enabled isPolling={false} intervalLabel="30s" paused lastPolledLabel="2m ago" /></div>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div><AutoRefreshIndicator enabled isPolling={false} intervalLabel="30s" lastPolledLabel="2m ago" /></div>
      <div><AutoRefreshIndicator enabled isPolling intervalLabel="30s" /></div>
      <div><AutoRefreshIndicator enabled={false} isPolling={false} intervalLabel="30s" lastPolledLabel="5m ago" /></div>
      <div><AutoRefreshIndicator enabled isPolling={false} intervalLabel="30s" tabHidden /></div>
      <div><AutoRefreshIndicator enabled isPolling={false} intervalLabel="30s" paused lastPolledLabel="1m ago" /></div>
      <div><AutoRefreshIndicator enabled isPolling={false} intervalLabel="30s" lastPollFailed lastPolledLabel="1m ago" /></div>
      <div><AutoRefreshIndicator enabled isPolling={false} intervalLabel="30s" dataJustRefreshed lastPolledLabel="just now" /></div>
    </div>
  ),
};
