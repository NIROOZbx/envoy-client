# Notification Engine Client

The web dashboard and primary management interface for the **Notification Engine**. This application enables workspace owners and admins to configure notification channels, manage API keys, monitor delivery logs, design templates, and trigger test notifications without writing raw API calls.

## 🚀 Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 + Radix UI + Shadcn UI
- **State Management**: Zustand (Client State) + TanStack React Query (Server State)
- **Routing**: React Router v7
- **Forms**: React Hook Form + Zod
- **Code Editor**: CodeMirror 6 (for JSON payloads and template design)
- **Icons**: Lucide React

## 📂 Project Structure

```text
src/
├── assets/          # Static assets (fonts, images)
├── components/      # Shared/Atomic UI components (buttons, generic cards)
├── features/        # Domain-driven feature modules (auth, dashboard)
├── layouts/         # Page layout wrappers (e.g., DashboardLayout)
├── lib/             # Third-party configurations (Axios clients, formatters)
├── store/           # Global client state (Zustand slices)
├── App.tsx          # Root application component and router provider
└── main.tsx         # Application entry point
```

## 🛠 Prerequisites

- Node.js (v20+ recommended)
- npm or yarn

## ⚙️ Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Create a `.env.development.local` file in the root directory to point to your local Notification Engine API.
   ```env
   VITE_API_BASE_URL=http://localhost:80/api/v1
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

## 📜 Available Scripts

- `npm run dev`: Starts the Vite development server with Hot Module Replacement (HMR).
- `npm run build`: Type-checks (`tsc -b`) and bundles the application for production into the `dist/` directory.
- `npm run preview`: Serves the production build locally for verification.
- `npm run lint`: Runs ESLint to check for code quality and formatting issues.

## 🎨 Design System & Theming

The application utilizes a custom "Pearl & Black" aesthetic built with native CSS variables and **Tailwind CSS v4**. All core tokens (colors, spacing, typography) are defined centrally in `src/index.css`.
