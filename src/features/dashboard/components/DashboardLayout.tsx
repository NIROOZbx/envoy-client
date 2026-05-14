import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  LogOut,
  ChevronRight,
  Bell,
  Globe,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useAuthStore } from '@/store/authStore';
import { AlertDialog } from '@/components/ui';

import { DASHBOARD_NAV_ITEMS, BRAND_CONFIG } from '../constants/navigation';
import { UsageBanner } from './UsageBanner';

const SidebarItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) => cn(
      "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group relative",
      isActive 
        ? "bg-ui-text text-ui-bg shadow-lg shadow-ui-text/10" 
        : "text-ui-muted hover:text-ui-text hover:bg-ui-text/5"
    )}
  >
    {({ isActive }) => (
      <>
        <Icon className="w-[18px] h-[18px]" />
        <span className="text-sm font-semibold tracking-tight">{label}</span>
        {isActive && (
          <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-ui-bg/40" />
        )}
      </>
    )}
  </NavLink>
);

export const DashboardLayout: React.FC = () => {
  const { user, logout, getMe } = useAuth();
  const { environments, activeEnvironmentId, setActiveEnvironment } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const confirmLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarContent = (
    <>
      <div className="px-4 py-6 flex items-center justify-between mb-8">
        <span className="font-black text-xl tracking-tighter uppercase text-ui-text">{BRAND_CONFIG.name}</span>
        <button 
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden p-2 hover:bg-black/5 rounded-lg"
        >
          <X className="w-5 h-5 text-ui-muted" />
        </button>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto no-scrollbar pr-1 py-4">
        {DASHBOARD_NAV_ITEMS.map((group) => (
          <div key={group.group}>
            <div className="px-4 mb-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-ui-muted">
                {group.group}
              </span>
            </div>
            <div className="space-y-1">
              {group.items.map((item) => (
                <SidebarItem 
                  key={item.to} 
                  to={item.to} 
                  icon={item.icon} 
                  label={item.label} 
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-ui-border space-y-2">
        <div className="px-4 py-3 bg-ui-text/5 rounded-xl flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-ui-text/10 rounded-full flex items-center justify-center font-black text-xs text-ui-text">
            {user?.fullName?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-black truncate text-ui-text">{user?.fullName || 'User'}</div>
            <div className="text-[10px] text-ui-muted truncate">{user?.email}</div>
          </div>
        </div>
        
        <button 
          onClick={() => setIsLogoutModalOpen(true)}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-ui-muted hover:text-destructive hover:bg-destructive/5 transition-all duration-200 group"
        >
          <LogOut className="w-[18px] h-[18px]" />
          <span className="text-sm font-semibold tracking-tight">Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen w-full bg-ui-bg flex overflow-x-hidden">
      <AlertDialog 
        isOpen={isLogoutModalOpen} 
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={confirmLogout}
        title="Confirm Logout"
        description="Are you sure you want to log out of your session?"
        confirmLabel="Logout"
        type="danger"
      />
      
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-60 border-r border-ui-border flex-col p-4 fixed h-full bg-ui-bg/80 backdrop-blur-xl z-[100]">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110] lg:hidden"
            />
            <motion.aside
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-64 bg-ui-bg p-4 z-[120] lg:hidden shadow-2xl border-r border-ui-border flex flex-col"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 lg:ml-60 min-h-screen flex flex-col bg-dots min-w-0 overflow-x-hidden">
        <UsageBanner />
        {/* Header */}
        <header className="h-16 border-b border-ui-border bg-ui-surface/50 backdrop-blur-md sticky top-0 z-[90] px-4 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-black/5 rounded-lg -ml-2"
            >
              <Menu className="w-5 h-5 text-ui-muted" />
            </button>
            <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-ui-text/5 rounded-full border border-ui-border">
              <Globe className="w-3.5 h-3.5 text-ui-muted" />
              <span className="text-[11px] font-black uppercase tracking-wider text-ui-text/60">
                {user?.workspaceName || 'My Workspace'}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-ui-text/20" />
              <Link 
                to="/dashboard" 
                className="text-sm font-semibold text-ui-muted hover:text-ui-text transition-colors"
              >
                Dashboard
              </Link>
            </div>
            
            <div className="sm:hidden font-black text-sm tracking-tighter uppercase text-ui-text">
              {BRAND_CONFIG.name}
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Environment Toggle - driven by real IDs from backend */}
            {environments.length > 0 && (
              <div className="flex bg-ui-text/5 p-1 rounded-lg border border-ui-border">
                {environments.map((env) => (
                  <button
                    key={env.id}
                    onClick={() => setActiveEnvironment(env.id)}
                    className={cn(
                      "px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider transition-all",
                      activeEnvironmentId === env.id
                        ? env.name.toLowerCase() === 'production'
                          ? "bg-ui-text text-ui-bg shadow-sm"
                          : "bg-ui-surface text-ui-text shadow-sm"
                        : "text-ui-muted hover:text-ui-text/60"
                    )}
                  >
                    {env.name.toLowerCase() === 'production' ? 'Prod' : 'Dev'}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center gap-3 border-l border-ui-border pl-6">
              <div className="relative">
                <Bell className="w-5 h-5 text-ui-muted cursor-pointer hover:text-ui-text transition-colors" />
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-ui-text border-2 border-ui-bg rounded-full" />
              </div>
              
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-4 lg:p-8">
          <Outlet context={{ environmentId: activeEnvironmentId }} />
        </div>
      </main>
    </div>
  );
};
