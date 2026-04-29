# Personal Trainer Booking Web Application

A modern, full-stack web application designed for personal trainers to manage sessions, bookings, and clients. This project features a robust admin dashboard for scheduling and a client portal for session management.

## 🚀 Tech Stack

- **Frontend**: [React 18](https://reactjs.org/), [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
- **Backend & Database**: [Supabase](https://supabase.com/) (Auth, PostgreSQL, Edge Functions, Storage)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Monitoring**: [Sentry](https://sentry.io/)
- **Icons**: [Lucide React](https://lucide.dev/)

## ✨ Key Features

- **Auth & Role Management**: Secure login/signup via Supabase Auth with role-based access control (User, Client, Admin).
- **Admin Dashboard**: Comprehensive management of session types, schedules, client lists, and reporting.
- **Client Portal**: Personalized dashboard for clients to book sessions, view history, and manage profiles.
- **Session Scheduling**: Dynamic availability rules and capacity management.
- **Audit Logging**: tracking of logins, session changes, and booking history.

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone [repository-url]
    cd 54
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up environment variables**:
    Create a `.env` file in the root directory and add your Supabase and Sentry credentials:
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    VITE_SENTRY_DSN=your_sentry_dsn
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

## 📂 Project Structure

- `src/`: Main application source code.
  - `components/`: Shared UI components (shadcn/ui).
  - `lib/`: Utility functions and library configurations (e.g., Supabase client).
  - `hooks/`: Custom React hooks.
  - `pages/`: Page components for different routes.
- `supabase/`: Supabase migrations and configuration.
- `public/`: Static assets.

## 📜 Development Guidelines

- Use **TypeScript** for all new components and logic.
- Follow **shadcn/ui** patterns for consistent UI elements.
- Ensure **RLS (Row Level Security)** is correctly configured in Supabase for all tables.
- All session/booking state transitions should be logged in the history tables.

## 📄 License

[Insert License Info Here]
