import { 
  LayoutDashboard, 
  Send, 
  Layout,
  Plug2, 
  Users, 
  Key, 
  Settings,
  CreditCard,
  Activity,
} from 'lucide-react';

export const DASHBOARD_NAV_ITEMS = [
  {
    group: 'Main Menu',
    items: [
      { label: 'Overview', to: '/dashboard', icon: LayoutDashboard },
      { label: 'Activity Logs', to: '/dashboard/logs', icon: Activity },
      { label: 'Workflows', to: '/dashboard/templates', icon: Send },
      { label: 'Layouts', to: '/dashboard/layouts', icon: Layout },
      { label: 'Integrations', to: '/dashboard/channels', icon: Plug2 },
      { label: 'Subscribers', to: '/dashboard/subscribers', icon: Users },
      { label: 'Billing', to: '/dashboard/billing', icon: CreditCard },
    ]
  },
  {
    group: 'Developer',
    items: [
      { label: 'API Keys', to: '/dashboard/api-keys', icon: Key },
      { label: 'Settings', to: '/dashboard/settings', icon: Settings },
    ]
  }
];

export const BRAND_CONFIG = {
  name: 'ENVOY',
  workspace_default: 'My Workspace'
};
