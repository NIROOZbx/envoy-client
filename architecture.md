# Scalable Frontend Architecture Plan

This document outlines the architectural strategy for the **Notification Engine Client**. The application is designed to be highly scalable, maintainable, and type-safe, built upon a modern React 19 stack.

## Core Pillars
1. **Feature-Based Mapping**: Grouping code by business domain (Auth, Dashboard, Workflows) rather than technical type (Hooks, Components). This makes feature isolation and deprecation safer.
2. **State Separation**: Strictly separating global Client State (UI toggles, Authentication) from Server State (Database entities, API responses).
3. **Design System Tokens**: Centralized control of visual properties via CSS variables, enabling a high-fidelity "Pearl & Black" aesthetic integrated directly with Tailwind CSS v4.
4. **Logic Separation**: Moving side effects, form validation, and complex API logic out of generic UI components into feature-specific hooks or services.

---

## 1. Directory Structure

```text
src/
├── features/                 # DOMAIN LOGIC (The Core)
│   ├── auth/                 # Example: Authentication domain
│   │   ├── api/              # Auth-specific API calls/hooks
│   │   └── components/       # Auth-specific UI
│   ├── dashboard/            # Example: Dashboard domain
│   │   ├── components/       # Dashboard-specific UI (e.g., IntegrationCard)
│   │   └── pages/            # Routable page components (Workflows, Logs)
│
├── components/               # SHARED / ATOMIC UI
│   ├── ui/                   # Generic elements (Button, Input, StatusDisplayCard)
│   └── layout/               # Generic Navbars, Modals
│
├── layouts/                  # ROUTE WRAPPERS
│   └── DashboardLayout.tsx   # Wraps protected routes with navigation
│
├── store/                    # GLOBAL CLIENT STATE
│   └── authStore.ts          # Zustand store for user/session state
│
├── lib/                      # UTILITIES & CONFIG
│   ├── axios.ts              # API client configuration & interceptors
│   └── utils.ts              # Global helpers (formatting, class merging)
```

---

## 2. State Management Strategy

### Server State (TanStack React Query)
All asynchronous data fetching, caching, and server state mutation is handled via React Query.
- **Why?** It automatically handles caching, background refetching, deduping multiple requests, and loading/error states without boilerplate.
- **Implementation**: API calls should be wrapped in custom hooks inside the relevant feature's `api/` directory.

### Client State (Zustand)
Global, synchronous state that doesn't belong to the server (like the current authenticated user, theme toggles, or active environment context) is managed by Zustand.
- **Why?** It is lighter, faster, and requires less boilerplate than Redux Toolkit or the Context API.

```typescript
// Example: src/store/authStore.ts
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  setAuth: (user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setAuth: (user) => set({ user }),
  clearAuth: () => set({ user: null }),
}));
```

---

## 3. Theming & Design System

The application relies on a premium, custom UI aesthetic. 

### Design Tokens (`src/index.css`)
We define our core palette and structural tokens as CSS variables. This ensures we can update the entire application's look from a single file.
```css
:root {
  --pearl: #F7F7F2;
  --black: #0D0D0D;
  --ui-surface: #FFFFFF;
  --ui-border: #E5E7EB;
  --success: #10B981;
}
```

### Tailwind CSS v4 Integration
Tailwind CSS v4 seamlessly consumes these variables. We utilize Tailwind utilities mapped to these variables (e.g., `text-ui-muted`, `bg-success/10`, `border-ui-border`) rather than hardcoding hex codes in the components.

---

## 4. Forms & Validation

All complex data entry forms use **React Hook Form** coupled with **Zod** schema validation.
- **Type Safety**: Zod infers TypeScript types directly from the validation schema, eliminating interface duplication.
- **Performance**: React Hook Form minimizes re-renders during text input.

```typescript
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  channel: z.enum(["email", "sms"]),
});
type FormData = z.infer<typeof schema>;
```

---

## 5. Implementation Guidelines
- **No Custom CSS Modules**: Always use Tailwind utility classes. For highly specific effects (like brushed metal gradients), use Tailwind's arbitrary values or extract them to `index.css` if reused heavily.
- **Component Reusability**: If a component is specific to a domain (e.g., `IntegrationCard`), it lives in `features/*/components`. If it can be used anywhere (e.g., `Button`), it lives in `components/ui`.
- **Absolute Imports**: Always use the `@/` alias for absolute imports originating from the `src/` directory to prevent brittle relative paths.
