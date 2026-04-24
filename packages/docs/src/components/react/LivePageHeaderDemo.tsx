import React, { useState } from 'react';
import { PageHeader } from '@storyhouse/components';
import { BarChart3, Plus, Activity, FileText } from 'lucide-react';

const LivePageHeaderDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { label: 'Overview', value: 'overview', icon: <BarChart3 className="w-4 h-4" /> },
    { label: 'Analytics', value: 'analytics', icon: <Activity className="w-4 h-4" /> },
    { label: 'Reports', value: 'reports', icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <PageHeader
        title="Dashboard"
        description="Welcome to your project dashboard"
        icon={<BarChart3 className="w-6 h-6 text-orange-500" />}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        actions={
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md bg-orange-500 text-white hover:bg-orange-600 transition-colors">
            <Plus className="w-4 h-4" />
            Create
          </button>
        }
      />
      <div className="p-6 bg-gray-50 dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-400">
        Content for <strong>{activeTab}</strong> tab
      </div>
    </div>
  );
};

export default LivePageHeaderDemo;
