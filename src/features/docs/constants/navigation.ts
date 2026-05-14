import { 
  Book, 
  Terminal, 
  Layers, 
  Cpu, 
  Key, 
  Shield, 
  Globe, 
  Users, 
  Bell, 
  Mail, 
  MessageSquare, 
  Webhook, 
  Cloud, 
  Zap, 
  Clock, 
  RotateCw,
  Box,
  Server
} from 'lucide-react';

export interface NavItem {
  title: string;
  path?: string;
  items?: NavItem[];
  icon?: any;
}

export const DOCS_NAV: NavItem[] = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', path: '/docs' },
      { title: 'Quickstart', path: '/docs/quickstart' },
      { title: 'Core concepts', path: '/docs/concepts' },
      { title: 'Architecture overview', path: '/docs/architecture' },
    ]
  },
  {
    title: 'Authentication',
    items: [
      { title: 'API keys', path: '/docs/auth/api-keys' },
      { title: 'OAuth (Google)', path: '/docs/auth/oauth' },
      { title: 'Token refresh', path: '/docs/auth/token-refresh' },
    ]
  },
  {
    title: 'Workspaces',
    items: [
      { title: 'Creating a workspace', path: '/docs/workspaces/create' },
      { title: 'Environments (live vs test)', path: '/docs/workspaces/environments' },
      { title: 'Member roles & RBAC', path: '/docs/workspaces/roles' },
      { title: 'Switching environments', path: '/docs/workspaces/switching' },
    ]
  },
  {
    title: 'Notifications',
    items: [
      { title: 'Sending your first notification', path: '/docs/notifications/send' },
      { title: 'Channels (email, SMS)', path: '/docs/notifications/channels' },
      { title: 'Templates', path: '/docs/notifications/templates' },
      { title: 'Idempotency', path: '/docs/notifications/idempotency' },
      { title: 'Delivery logs', path: '/docs/notifications/logs' },
    ]
  },
  {
    title: 'Providers',
    items: [
      { title: 'Overview', path: '/docs/providers/overview' },
      { title: 'SendGrid', path: '/docs/providers/sendgrid' },
      { title: 'Amazon SES', path: '/docs/providers/ses' },
      { title: 'Twilio', path: '/docs/providers/twilio' },
      { title: 'Adding a custom provider', path: '/docs/providers/custom' },
    ]
  },
  {
    title: 'API Keys',
    items: [
      { title: 'Creating keys', path: '/docs/api-keys/create' },
      { title: 'Key prefixes (live vs test)', path: '/docs/api-keys/prefixes' },
      { title: 'Revoking & rotating', path: '/docs/api-keys/rotation' },
    ]
  },
  {
    title: 'API Reference',
    items: [
      { title: 'Authentication', path: '/docs/reference/auth' },
      { title: 'Workspaces', path: '/docs/reference/workspaces' },
      { title: 'Notifications', path: '/docs/reference/notifications' },
      { title: 'Templates', path: '/docs/reference/templates' },
      { title: 'Providers', path: '/docs/reference/providers' },
      { title: 'API Keys', path: '/docs/reference/api-keys' },
    ]
  },
  {
    title: 'Self-hosting',
    items: [
      { title: 'Docker setup', path: '/docs/self-hosting/docker' },
      { title: 'Environment variables', path: '/docs/self-hosting/env-vars' },
      { title: 'Kafka configuration', path: '/docs/self-hosting/kafka' },
    ]
  }
];
