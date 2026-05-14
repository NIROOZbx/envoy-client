import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useAuth } from '../../features/auth/hooks/useAuth';

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading: isGlobalLoading } = useAuthStore();
  const { getMe } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      await getMe();
      setIsChecking(false);
    };
    initAuth();
  }, [getMe]);

  if (isGlobalLoading || isChecking) {
    return (
      <div className="min-h-screen bg-pearl flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const hasWorkspace = useAuthStore.getState().user?.hasWorkspace;
  const isCreatingWorkspace = window.location.pathname === '/create-workspace';

  if (!hasWorkspace && !isCreatingWorkspace) {
    return <Navigate to="/create-workspace" replace />;
  }

  if (hasWorkspace && isCreatingWorkspace) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
