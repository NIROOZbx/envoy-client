import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export const GuestRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-pearl flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isAuthenticated) {
    const hasWorkspace = useAuthStore.getState().user?.hasWorkspace;
    return <Navigate to={hasWorkspace ? "/dashboard" : "/create-workspace"} replace />;
  }

  return <Outlet />;
};
