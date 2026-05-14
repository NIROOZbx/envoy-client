import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthPageLayout } from './features/auth/layouts/AuthPageLayout';
import { PublicLayout } from './layouts/PublicLayout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { GuestRoute } from './components/auth/GuestRoute';
import { LoginPage } from './features/auth/pages/LoginPage';
import { RegisterPage } from './features/auth/pages/RegisterPage';
import { CheckEmailPage } from './features/auth/pages/CheckEmail.tsx';
import { VerifyEmailPage } from './features/auth/pages/VerifyEmail.tsx';
import { CreateWorkspacePage } from './features/auth/pages/CreateWorkspacePage';
import { DocsPage } from './features/public/pages/DocsPage';
import { DocsContentPage } from './features/docs/pages/DocsContentPage';
import { LandingPage } from './features/public/pages/LandingPage';
import { DashboardOverviewPage } from './features/dashboard/pages/OverviewPage';
import { DashboardLayout } from './features/dashboard/components/DashboardLayout';
import { WorkflowsPage } from './features/dashboard/pages/WorkflowsPage';
import { IntegrationsPage } from './features/dashboard/pages/IntegrationsPage';
import { ApiKeysPage } from './features/dashboard/pages/ApiKeysPage';
import { SubscribersPage } from './features/dashboard/pages/SubscribersPage';
import { LayoutsPage } from './features/dashboard/pages/LayoutsPage';
import { LayoutDetailsPage } from './features/dashboard/pages/LayoutDetailsPage';
import { WorkflowDetailsPage } from './features/dashboard/pages/WorkflowDetailsPage';
import { TemplateChannelsPage } from './features/dashboard/pages/TemplateChannelsPage';
import { BillingPage } from './features/dashboard/pages/BillingPage';
import { BillingSuccessPage } from './features/dashboard/pages/BillingSuccessPage';
import { ActivityLogPage } from './features/dashboard/pages/ActivityLogPage';

const Placeholder = ({ title }: { title: string }) => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <h2 className="text-2xl font-bold uppercase tracking-widest opacity-20">{title} Content Coming Soon</h2>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GuestRoute />}>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/products" element={<Placeholder title="Products" />} />
            <Route path="/developers" element={<Placeholder title="Developers" />} />
            <Route path="/pricing" element={<Placeholder title="Pricing" />} />
          </Route>
        </Route>

        <Route path="/docs" element={<DocsPage />}>
          <Route index element={<Navigate to="/docs/introduction" replace />} />
          <Route path=":slug" element={<DocsContentPage />} />
        </Route>

        <Route element={<GuestRoute />}>
          <Route element={<AuthPageLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/check-email" element={<CheckEmailPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<AuthPageLayout />}>
            <Route path="/create-workspace" element={<CreateWorkspacePage />} />
          </Route>
          <Route path="/billing/success" element={<BillingSuccessPage />} />
          
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardOverviewPage />} />
            <Route path="/dashboard/templates" element={<WorkflowsPage />} />
            <Route path="/dashboard/templates/:id" element={<WorkflowDetailsPage />} />
            <Route path="/dashboard/templates/:id/channels" element={<TemplateChannelsPage />} />
            <Route path="/dashboard/layouts" element={<LayoutsPage />} />
            <Route path="/dashboard/layouts/:id" element={<LayoutDetailsPage />} />
            <Route path="/dashboard/channels" element={<IntegrationsPage />} />
            <Route path="/dashboard/subscribers" element={<SubscribersPage />} />
            <Route path="/dashboard/logs" element={<ActivityLogPage />} />
            <Route path="/dashboard/api-keys" element={<ApiKeysPage />} />
            <Route path="/dashboard/billing" element={<BillingPage />} />
            <Route path="/dashboard/settings" element={<Placeholder title="Settings" />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
