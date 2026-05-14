import { Mail, Phone, Bell, MessageSquare, Globe } from 'lucide-react';

export const SUPPORTED_CHANNELS = [
  { id: 'email', label: 'Email', icon: Mail, is_active: true },
  { id: 'sms', label: 'SMS', icon: Phone, is_active: true },
  // Future channels can be toggled by setting is_active: true
  { id: 'push', label: 'Push', icon: Bell, is_active: false },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare, is_active: false },
  { id: 'in_app', label: 'In-App', icon: Globe, is_active: false },
] as const;

export const ACTIVE_CHANNELS = SUPPORTED_CHANNELS.filter(ch => ch.is_active);

export type ChannelId = typeof SUPPORTED_CHANNELS[number]['id'];
