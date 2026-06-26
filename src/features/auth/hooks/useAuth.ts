import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import { login as loginApi, register as registerApi, createWorkspace as createWorkspaceApi, getCurrentUser, verifyEmail, resendEmail } from '../api/auth';
import { toast } from 'sonner';

export const useAuth = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const setAuth = useAuthStore(state => state.setAuth);
  const logout = useAuthStore(state => state.logout);
  const setEnvironments = useAuthStore(state => state.setEnvironments);
  const user = useAuthStore(state => state.user);
  const navigate = useNavigate();

  const getMe = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getCurrentUser();
      if (response.success && response.data) {
        const { user: userData, workspace } = response.data;

        setAuth({
          id: userData.UserID || userData.userID,
          email: userData.Email || userData.email,
          fullName: userData.Name || userData.name,
          hasWorkspace: !!userData.hasWorkspace || !!userData.HasWorkspace || !!workspace,
          workspaceName: workspace?.WorkSpaceName || workspace?.workspaceName
        });

        if (workspace?.environments?.length) {
          setEnvironments(
            workspace.environments.map((e: any) => ({ id: e.id, name: e.name }))
          );
        }
      }
    } catch (err: any) {
      console.error('Failed to fetch user details', err);
      if (err.response?.status === 401) {
        toast.error('Session expired. Please login again.');
        logout();
      }
    } finally {
      setIsLoading(false);
    }
  }, [setAuth, logout, setEnvironments]);

  const handleLogin = React.useCallback(async (data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await loginApi(data);
      const userData = response?.data?.user;
      const workspace = response?.data?.workspace;

      if (userData) {
        const hasWorkspace = !!userData.hasWorkspace || !!userData.HasWorkspace || !!workspace;
        setAuth({
          id: userData.UserID || userData.userID,
          email: userData.Email || userData.email,
          fullName: userData.Name || userData.name,
          hasWorkspace,
          workspaceName: workspace?.WorkSpaceName || workspace?.workspaceName
        });

        if (workspace?.environments?.length) {
          setEnvironments(
            workspace.environments.map((e: any) => ({ id: e.id, name: e.name }))
          );
        }

        if (!hasWorkspace) {
          navigate('/create-workspace');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError('Invalid email or password. Please try again.');
      } else {
        setError(err.response?.data?.error || 'An unexpected error occurred during login.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [setAuth, setEnvironments, navigate]);

  const handleRegister = React.useCallback(async (data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      await registerApi(data);
      navigate('/check-email', { state: { email: data.email } });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const handleCreateWorkspace = React.useCallback(async (data: { workspace_name: string; plan_name: string }, skipNavigate = false) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await createWorkspaceApi(data);
      
      if (response && response.success === false) {
        const errMsg = (response as any).error || response.message || 'Failed to create workspace.';
        setError(errMsg);
        return { success: false, error: errMsg };
      }

      const workspaceData = response?.data?.workspace as any;
      const userData = response?.data?.user as any;

      if (userData) {
        setAuth({
          id: userData.UserID || userData.userID,
          email: userData.Email || userData.email,
          fullName: userData.Name || userData.name,
          hasWorkspace: true,
          workspaceName: workspaceData?.WorkSpaceName || workspaceData?.workspaceName,
          isVerified: true
        });
      }
      
      if (workspaceData?.environments?.length) {
        setEnvironments(
          workspaceData.environments.map((e: any) => ({ id: e.id, name: e.name }))
        );
      }
      
      if (!skipNavigate) {
        navigate('/dashboard');
      }
      return { success: true, data: response?.data };
    } catch (err: any) {
      const errMsg = err.response?.data?.error || 'Failed to create workspace.';
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setIsLoading(false);
    }
  }, [setAuth, setEnvironments, navigate]);

  const handleVerifyEmail = React.useCallback(async (token: string, navigateOnSuccess = true) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await verifyEmail(token);
      const userData = response?.data?.user;
      const workspace = response?.data?.workspace;

      if (userData) {
        const hasWorkspace = !!userData.hasWorkspace || !!userData.HasWorkspace || !!workspace;
        setAuth({
          id: userData.UserID || userData.userID,
          email: userData.Email || userData.email,
          fullName: userData.Name || userData.name,
          hasWorkspace,
          workspaceName: workspace?.WorkSpaceName || workspace?.workspaceName,
          isVerified: userData.IsVerified || userData.isVerified
        });

        if (workspace?.environments?.length) {
          setEnvironments(
            workspace.environments.map((e: any) => ({ id: e.id, name: e.name }))
          );
        }

        if (navigateOnSuccess) {
          if (!hasWorkspace) {
            navigate('/create-workspace');
          } else {
            navigate('/dashboard');
          }
        }
        return true;
      }
      return false;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Verification failed.');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [setAuth, setEnvironments, navigate]);

  const handleResendEmail = React.useCallback(async (email: string) => {
    setIsLoading(true);
    try {
      await resendEmail(email);
      toast.success('Verification email sent!');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to resend email.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return React.useMemo(() => ({
    handleLogin,
    handleRegister,
    handleCreateWorkspace,
    handleVerifyEmail,
    handleResendEmail,
    getMe,
    isLoading,
    error,
    logout,
    user
  }), [handleLogin, handleRegister, handleCreateWorkspace, getMe, isLoading, error, logout, user]);
};
