import { Mail, MessageSquare, Bell, Zap,Hash, Globe } from 'lucide-react';
import type { ChannelType } from '../../api/templateChannels';

export type FieldDef = { key: string; label: string; multiline?: boolean; json?: boolean };

export const CHANNEL_OPTIONS = [
  { value: 'email'   as ChannelType, label: 'Email',   icon: Mail,          color: 'bg-blue-500/10 text-blue-600 border-blue-200',          description: 'HTML / text email via your SMTP provider' },
  { value: 'sms'     as ChannelType, label: 'SMS',     icon: MessageSquare, color: 'bg-violet-500/10 text-violet-600 border-violet-200',    description: 'Short text message via Twilio, Bird, etc.' },
  { value: 'push'    as ChannelType, label: 'Push',    icon: Bell,          color: 'bg-orange-500/10 text-orange-600 border-orange-200',    description: 'Mobile / Web push notifications' },
  { value: 'slack'   as ChannelType, label: 'Slack',   icon: Hash,         color: 'bg-emerald-500/10 text-emerald-600 border-emerald-200', description: 'Direct messages or channel alerts' },
  { value: 'in_app'  as ChannelType, label: 'In-App',  icon: Zap,           color: 'bg-amber-500/10 text-amber-600 border-amber-200',       description: 'Real-time alerts inside your application' },
  { value: 'webhook' as ChannelType, label: 'Webhook', icon: Globe,         color: 'bg-slate-500/10 text-slate-600 border-slate-200',      description: 'Send custom JSON payloads to external URLs' },
];

export const CHANNEL_FIELDS: Record<ChannelType, FieldDef[]> = {
  email:   [{ key: 'subject', label: 'Subject' }, { key: 'body', label: 'Body', multiline: true }],
  sms:     [{ key: 'body', label: 'Message', multiline: true }],
  push:    [{ key: 'title', label: 'Title' }, { key: 'body', label: 'Body', multiline: true }],
  slack:   [{ key: 'channel_id', label: 'Slack Channel ID' }, { key: 'message', label: 'Message', multiline: true }],
  in_app:  [{ key: 'title', label: 'Title' }, { key: 'body', label: 'Body', multiline: true }, { key: 'cta_label', label: 'CTA Label' }, { key: 'cta_url', label: 'CTA URL' }],
  webhook: [{ key: 'payload', label: 'Payload (JSON)', multiline: true, json: true }],
};

export const DEFAULT_CONTENT: Record<ChannelType, Record<string, string>> = {
  email:   { subject: '', body: '' },
  sms:     { body: '' },
  push:    { title: '', body: '' },
  slack:   { channel_id: '', message: '' },
  in_app:  { title: '', body: '', cta_label: '', cta_url: '' },
  webhook: { payload: '{}' },
};
