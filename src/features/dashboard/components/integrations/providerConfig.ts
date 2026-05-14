import { Mail, MessageSquare, Bell, Globe, type LucideIcon } from 'lucide-react';

export type ChannelType = 'email' | 'sms' | 'push' | 'in_app' | 'webhook';

export interface ProviderMetadata {
  id: string;
  name: string;
  channel: ChannelType;
  description: string;
  icon: LucideIcon;
  color: string;
  fields: {
    key: string;
    label: string;
    type: 'text' | 'password';
    placeholder?: string;
    description?: string;
    required?: boolean;
  }[];
}

export const PROVIDERS: ProviderMetadata[] = [
  {
    id: 'ses',
    name: 'Amazon SES',
    channel: 'email',
    description: 'Scalable and reliable email sending using Amazon Web Services.',
    icon: Mail,
    color: 'bg-orange-100 text-orange-600 border-orange-200',
    fields: [
      { key: 'access_key_id', label: 'Access Key ID', type: 'text', required: true },
      { key: 'secret_access_key', label: 'Secret Access Key', type: 'password', required: true },
      { key: 'region', label: 'AWS Region', type: 'text', required: true, placeholder: 'us-east-1' },
      { key: 'from_email', label: 'From Email', type: 'text', required: true, placeholder: 'sender@yourdomain.com' },
    ],
  },
  {
    id: 'sendgrid',
    name: 'SendGrid',
    channel: 'email',
    description: 'Industry-leading deliverability and email analytics platform.',
    icon: Mail,
    color: 'bg-blue-100 text-blue-600 border-blue-200',
    fields: [
      { key: 'api_key', label: 'API Key', type: 'password', required: true },
      { key: 'from_email', label: 'From Email', type: 'text', required: true, placeholder: 'sender@yourdomain.com' },
    ],
  },
  {
    id: 'resend',
    name: 'Resend',
    channel: 'email',
    description: 'Email for developers. Build, test, and deliver transactional emails at scale.',
    icon: Mail,
    color: 'bg-slate-100 text-slate-800 border-slate-200',
    fields: [
      { key: 'api_key', label: 'API Key', type: 'password', required: true },
      { key: 'from_email', label: 'From Email', type: 'text', required: true, placeholder: 'sender@yourdomain.com' },
    ],
  },
  {
    id: 'twilio',
    name: 'Twilio',
    channel: 'sms',
    description: 'The global standard for reliable SMS and messaging.',
    icon: MessageSquare,
    color: 'bg-red-100 text-red-600 border-red-200',
    fields: [
      { key: 'account_sid', label: 'Account SID', type: 'text', required: true },
      { key: 'auth_token', label: 'Auth Token', type: 'password', required: true },
      { key: 'from_number', label: 'From Number', type: 'text', required: true, placeholder: '+1234567890' },
    ],
  },
];

export const getProvider = (id: string) => PROVIDERS.find((p) => p.id === id);
export const getProvidersByChannel = (channel: ChannelType) => PROVIDERS.filter((p) => p.channel === channel);
