import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader, PageHeaderTop, PageHeaderMiddle, PageHeaderTabs, PageHeaderBottom } from './stubs';
import {
  Settings, Users, BarChart3, FileText, Plus, Download, Filter,
  Camera, Clock, CheckCircle2, AlertCircle, Loader2,
  Copy, Activity, Calendar,
  Upload, Share2, Sparkles, Zap, PlayCircle, Box, Webhook, Terminal,
  Globe, Film, Eye, Wand2
} from 'lucide-react';

const meta: Meta<typeof PageHeader> = {
  title: 'Design System/Page Components/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

// =============================================================================
// COMPACT SIZE
// =============================================================================

export const CompactSize: Story = {
  args: {
    size: 'sm',
    icon: <BarChart3 className="w-5 h-5 text-orange-600" />,
    title: 'Compact Analytics',
    description: 'Space-efficient header for dense layouts',
    actions: (
      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md bg-orange-500 text-white hover:bg-orange-600 transition-colors">
        <Plus className="w-3 h-3" />
        Add
      </button>
    ),
  },
};

// =============================================================================
// DASHBOARD PATTERN
// =============================================================================

export const Dashboard: Story = {
  args: {
    greeting: {
      text: 'Welcome back',
      name: 'Alex',
    },
    title: 'Dashboard',
    description: "Here's what's happening with your stories today",
    tabs: [
      { label: 'Overview', value: 'overview', icon: <BarChart3 className="w-4 h-4" /> },
      { label: 'Analytics', value: 'analytics', icon: <Activity className="w-4 h-4" /> },
      { label: 'Reports', value: 'reports', icon: <FileText className="w-4 h-4" /> },
    ],
    activeTab: 'overview',
    actions: (
      <>
        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <Download className="w-4 h-4" />
          Export Data
        </button>
        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md bg-orange-500 text-white hover:bg-orange-600 transition-colors">
          <Plus className="w-4 h-4" />
          Create Story
        </button>
      </>
    ),
    pageInfo: {
      right: (
        <div className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="font-medium">All Systems Operational</span>
        </div>
      ),
    },
  },
};

// =============================================================================
// STORY ENGINE PATTERN
// =============================================================================

export const StoryEngine: Story = {
  args: {
    icon: <Sparkles className="w-6 h-6 text-orange-600" />,
    title: 'Story Engine',
    description: 'Create and manage AI-generated stories',
    selector: {
      currentItem: {
        id: 'proj-1',
        label: 'Tech News Daily',
        icon: <FileText className="w-5 h-5 text-orange-600" />,
        metadata: '12 active stories',
      },
      items: [
        { id: 'proj-1', label: 'Tech News Daily', icon: <FileText className="w-5 h-5 text-orange-600" />, metadata: '12 active stories' },
        { id: 'proj-2', label: 'Sports Highlights', icon: <BarChart3 className="w-5 h-5 text-green-600" />, metadata: '8 active stories' },
        { id: 'proj-3', label: 'Finance Brief', icon: <Activity className="w-5 h-5 text-orange-600" />, metadata: '5 active stories' },
        { id: 'proj-4', label: 'Entertainment Weekly', icon: <Film className="w-5 h-5 text-purple-600" />, metadata: '15 active stories' },
      ],
      onSelect: (item) => console.log('Selected:', item),
      searchable: true,
      placeholder: 'Search projects...',
    },
    actions: (
      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md bg-orange-500 text-white hover:bg-orange-600 transition-colors">
        <Wand2 className="w-4 h-4" />
        Generate Story
      </button>
    ),
    tabs: [
      { label: 'All Stories', value: 'all', badge: 12 },
      { label: 'In Progress', value: 'progress', icon: <Loader2 className="w-4 h-4" />, badge: 3 },
      { label: 'Published', value: 'published', icon: <CheckCircle2 className="w-4 h-4" />, badge: 8 },
      { label: 'Scheduled', value: 'scheduled', icon: <Calendar className="w-4 h-4" />, badge: 1 },
    ],
    activeTab: 'all',
    pageInfo: {
      left: (
        <>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-800">
            <Sparkles className="w-3 h-3" />
            AI-Powered
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
            <FileText className="w-3.5 h-3.5" />
            12 stories this month
          </span>
        </>
      ),
      right: (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="font-semibold">8</span> Published
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-400">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span className="font-semibold">3</span> Generating
          </div>
        </div>
      ),
    },
  },
};

// =============================================================================
// DISTRIBUTION PATTERN
// =============================================================================

export const Distribution: Story = {
  args: {
    icon: <Share2 className="w-6 h-6 text-orange-600" />,
    title: 'Distribution',
    description: 'Manage content distribution across platforms',
    selector: {
      currentItem: {
        id: 'proj-1',
        label: 'Tech News Daily',
        icon: <Globe className="w-5 h-5 text-orange-600" />,
        metadata: '8 platforms connected',
      },
      items: [
        { id: 'proj-1', label: 'Tech News Daily', icon: <Globe className="w-5 h-5 text-orange-600" />, metadata: '8 platforms connected' },
        { id: 'proj-2', label: 'Sports Highlights', icon: <Globe className="w-5 h-5 text-green-600" />, metadata: '5 platforms connected' },
        { id: 'proj-3', label: 'Finance Brief', icon: <Globe className="w-5 h-5 text-purple-600" />, metadata: '3 platforms connected' },
      ],
      onSelect: (item) => console.log('Selected:', item),
      searchable: true,
    },
    actions: (
      <>
        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <Settings className="w-4 h-4" />
          Configure
        </button>
        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md bg-orange-500 text-white hover:bg-orange-600 transition-colors">
          <Upload className="w-4 h-4" />
          Publish
        </button>
      </>
    ),
    tabs: [
      { label: 'All Platforms', value: 'all', badge: 8 },
      { label: 'YouTube', value: 'youtube', icon: <PlayCircle className="w-4 h-4" />, badge: 12 },
      { label: 'Social Media', value: 'social', icon: <Share2 className="w-4 h-4" />, badge: 45 },
      { label: 'Scheduled', value: 'scheduled', icon: <Clock className="w-4 h-4" />, badge: 6 },
    ],
    activeTab: 'all',
    pageInfo: {
      left: (
        <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
          8 platforms connected
        </span>
      ),
      right: (
        <div className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="font-medium">Synced</span>
        </div>
      ),
    },
  },
};

// =============================================================================
// INTEGRATIONS PATTERN
// =============================================================================

export const Integrations: Story = {
  args: {
    icon: <Zap className="w-6 h-6 text-orange-600" />,
    title: 'Integrations',
    description: 'Manage your platform connections and data sources',
    tabs: [
      { label: 'Platforms', value: 'platforms', icon: <Globe className="w-4 h-4" /> },
      { label: 'Webhooks', value: 'webhooks', icon: <Webhook className="w-4 h-4" /> },
      { label: 'Testing', value: 'test', icon: <Terminal className="w-4 h-4" /> },
    ],
    activeTab: 'platforms',
  },
};

// =============================================================================
// USER ACCESS PATTERN
// =============================================================================

export const UserAccess: Story = {
  args: {
    icon: <Users className="w-6 h-6 text-orange-600" />,
    title: 'User Access',
    description: 'Manage team members and permissions',
    actions: (
      <>
        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <Download className="w-4 h-4" />
          Export
        </button>
        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md bg-orange-500 text-white hover:bg-orange-600 transition-colors">
          <Plus className="w-4 h-4" />
          Invite User
        </button>
      </>
    ),
    tabs: [
      { label: 'Active Users', value: 'active', icon: <Users className="w-4 h-4" />, badge: 24 },
      { label: 'Pending', value: 'pending', icon: <Clock className="w-4 h-4" />, badge: 3 },
      { label: 'Roles', value: 'roles', icon: <Settings className="w-4 h-4" /> },
    ],
    activeTab: 'active',
  },
};

// =============================================================================
// VIDEO GALLERY PATTERN
// =============================================================================

export const VideoGallery: Story = {
  args: {
    icon: <Film className="w-6 h-6 text-orange-600" />,
    title: 'Video Gallery',
    description: 'Browse and manage your video content',
    actions: (
      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md bg-orange-500 text-white hover:bg-orange-600 transition-colors">
        <Upload className="w-4 h-4" />
        Upload Video
      </button>
    ),
    toolbar: (
      <div className="flex items-center gap-3 flex-wrap">
        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Filter className="w-4 h-4" />
          All Formats
        </button>
        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Calendar className="w-4 h-4" />
          All Dates
        </button>
        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Users className="w-4 h-4" />
          All Creators
        </button>
      </div>
    ),
    pageInfo: {
      left: (
        <div className="flex items-center gap-3 flex-wrap text-sm text-gray-600 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <Film className="w-3.5 h-3.5" />
            248 videos
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            12h 34m total
          </span>
        </div>
      ),
      right: (
        <div className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          <span className="font-medium">5 Processing</span>
        </div>
      ),
    },
  },
};

// =============================================================================
// MINIMAL
// =============================================================================

export const Minimal: Story = {
  args: {
    title: 'Simple Page',
  },
};

// =============================================================================
// WITH ICON
// =============================================================================

export const WithIcon: Story = {
  args: {
    icon: <Zap className="w-6 h-6 text-orange-500" />,
    title: 'Quick Actions',
    description: 'Fast access to your most-used features',
  },
};

// =============================================================================
// LARGE SIZE
// =============================================================================

export const LargeSize: Story = {
  args: {
    size: 'lg',
    icon: <Sparkles className="w-10 h-10 text-orange-600" />,
    title: 'Premium Features',
    description: 'Large, prominent header for key pages',
    actions: (
      <button className="inline-flex items-center gap-2 px-4 py-2 text-base font-medium rounded-md bg-orange-500 text-white hover:bg-orange-600 transition-colors">
        <Plus className="w-5 h-5" />
        Create Project
      </button>
    ),
    pageInfo: {
      left: (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800">
          <Zap className="w-3.5 h-3.5" />
          Pro Plan
        </span>
      ),
    },
  },
};

// =============================================================================
// BREADCRUMBS
// =============================================================================

export const WithBreadcrumbs: Story = {
  args: {
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Projects', href: '/projects' },
      { label: 'Current Project' },
    ],
    title: 'Project Settings',
    description: 'Configure project preferences and team access',
  },
};
