import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Environment {
  id: string;
  name: string; // "development" | "production"
}

interface User {
  id: string;
  email: string;
  fullName: string;
  hasWorkspace: boolean;
  workspaceName?: string;
  isVerified?: boolean;
}

interface AuthState {
  user: User | null;
  environments: Environment[];
  activeEnvironmentId: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setAuth: (user: User) => void;
  setEnvironments: (envs: Environment[]) => void;
  setActiveEnvironment: (id: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      environments: [],
      activeEnvironmentId: null,
      isAuthenticated: false,
      isLoading: true,

      setAuth: (user) => set({
        user,
        isAuthenticated: true,
        isLoading: false
      }),

      setEnvironments: (envs) => set((state) => ({
        environments: envs,
        activeEnvironmentId: state.activeEnvironmentId
          ?? envs.find(e => e.name.toLowerCase() === 'development')?.id
          ?? envs[0]?.id
          ?? null,
      })),

      setActiveEnvironment: (id) => set({ activeEnvironmentId: id }),

      logout: () => set({
        user: null,
        environments: [],
        activeEnvironmentId: null,
        isAuthenticated: false,
        isLoading: false
      }),

      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'envoy-auth-storage',
      onRehydrateStorage: () => (state) => {
        state?.setLoading(false);
      },
    }
  )
);
