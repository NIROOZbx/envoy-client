import { lazy, type ComponentType } from 'react';

// Lazy load all doc pages to prevent circular dependencies and improve performance
// Using explicit .tsx extensions to ensure module resolution in all environments
const IntroductionPage = lazy(() => import('../pages/Introduction.tsx').then(m => ({ default: m.IntroductionPage })));
const QuickstartPage = lazy(() => import('../pages/Quickstart.tsx').then(m => ({ default: m.QuickstartPage })));
const CoreConceptsPage = lazy(() => import('../pages/CoreConcepts.tsx').then(m => ({ default: m.CoreConceptsPage })));
const ApiReferencePage = lazy(() => import('../pages/ApiReference.tsx').then(m => ({ default: m.ApiReferencePage })));
const AuthenticationPage = lazy(() => import('../pages/Authentication.tsx').then(m => ({ default: m.AuthenticationPage })));
const SendingNotificationsPage = lazy(() => import('../pages/SendingNotifications.tsx').then(m => ({ default: m.SendingNotificationsPage })));
const TemplatesPage = lazy(() => import('../pages/Templates.tsx').then(m => ({ default: m.TemplatesPage })));
const ProvidersPage = lazy(() => import('../pages/Providers.tsx').then(m => ({ default: m.ProvidersPage })));
const ApiKeysPage = lazy(() => import('../pages/ApiKeys.tsx').then(m => ({ default: m.ApiKeysPage })));
const WorkspacesPage = lazy(() => import('../pages/Workspaces.tsx').then(m => ({ default: m.WorkspacesPage })));
const DeliveryLogsPage = lazy(() => import('../pages/DeliveryLogs.tsx').then(m => ({ default: m.DeliveryLogsPage })));
const SelfHostingPage = lazy(() => import('../pages/SelfHosting.tsx').then(m => ({ default: m.SelfHostingPage })));
const ErrorReferencePage = lazy(() => import('../pages/ErrorReference.tsx').then(m => ({ default: m.ErrorReferencePage })));
const GoSDKPage = lazy(() => import('../pages/GoSDK.tsx').then(m => ({ default: m.GoSDKPage })));

export interface DocPageConfig {
  slug: string;
  title: string;
  section: string;
  component: ComponentType<any>;
}

export const DOCS_REGISTRY: DocPageConfig[] = [
  // Getting Started
  { slug: 'introduction', title: 'Introduction', section: 'Getting Started', component: IntroductionPage },
  { slug: 'concepts', title: 'Core Concepts', section: 'Getting Started', component: CoreConceptsPage },
  { slug: 'quickstart', title: 'Quickstart', section: 'Getting Started', component: QuickstartPage },
  
  // Usage
  { slug: 'authentication', title: 'Authentication', section: 'Usage', component: AuthenticationPage },
  { slug: 'sending-notifications', title: 'Sending Notifications', section: 'Usage', component: SendingNotificationsPage },
  { slug: 'templates', title: 'Templates', section: 'Usage', component: TemplatesPage },
  { slug: 'providers', title: 'Providers', section: 'Usage', component: ProvidersPage },
  
  // Management
  { slug: 'api-keys', title: 'API Keys', section: 'Management', component: ApiKeysPage },
  { slug: 'workspaces', title: 'Workspaces', section: 'Management', component: WorkspacesPage },
  { slug: 'delivery-logs', title: 'Delivery Logs', section: 'Management', component: DeliveryLogsPage },
  
  // Advanced
  { slug: 'self-hosting', title: 'Self-hosting', section: 'Advanced', component: SelfHostingPage },
  
  // SDKs
  { slug: 'go-sdk', title: 'Go SDK', section: 'SDKs', component: GoSDKPage },

  // Reference
  { slug: 'api-reference', title: 'API Reference', section: 'Reference', component: ApiReferencePage },
  { slug: 'error-reference', title: 'Error Reference', section: 'Reference', component: ErrorReferencePage },
];

export const getDocBySlug = (slug?: string) => {
  if (!slug) return DOCS_REGISTRY[0];
  return DOCS_REGISTRY.find(page => page.slug.toLowerCase() === slug.toLowerCase()) || DOCS_REGISTRY[0];
};

export const getDocsBySection = () => {
  const sections: Record<string, DocPageConfig[]> = {};
  DOCS_REGISTRY.forEach(page => {
    if (!sections[page.section]) sections[page.section] = [];
    sections[page.section].push(page);
  });
  return sections;
};
