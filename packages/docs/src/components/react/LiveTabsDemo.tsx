import React, { useState } from 'react';

interface TabItem {
  label: string;
  value: string;
  badge?: number;
}

const demoTabs: TabItem[] = [
  { label: 'Account', value: 'account', badge: 2 },
  { label: 'Notifications', value: 'notifications' },
  { label: 'Settings', value: 'settings' },
];

export default function LiveTabsDemo(): React.ReactNode {
  const [activeTab, setActiveTab] = useState('account');

  return (
    <div className="space-y-8">
      <div>
        <p className="mb-3 text-sm font-medium text-gray-500">Default Variant</p>
        <div className="border-b border-gray-200">
          <div className="flex gap-1" role="tablist">
            {demoTabs.map((tab) => (
              <button
                key={tab.value}
                role="tab"
                aria-selected={activeTab === tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap border-b-2 -mb-px ${
                  activeTab === tab.value
                    ? 'border-orange-600 text-orange-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                {tab.label}
                {tab.badge !== undefined && (
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                    activeTab === tab.value
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          {activeTab === 'account' && 'Manage your account settings and preferences.'}
          {activeTab === 'notifications' && 'Configure notification preferences.'}
          {activeTab === 'settings' && 'General application settings.'}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-gray-500">Pills Variant</p>
        <div className="bg-gray-100 rounded-lg p-1 inline-flex">
          {demoTabs.slice(0, 3).map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === tab.value
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="mt-4 text-sm text-gray-600">
          {activeTab === 'account' && 'Account settings content.'}
          {activeTab === 'notifications' && 'Notification preferences.'}
          {activeTab === 'settings' && 'Application settings.'}
        </div>
      </div>

      <p className="text-xs text-gray-400">
        Tabs support default (underlined) and pills layouts, with optional badges.
      </p>
    </div>
  );
}
