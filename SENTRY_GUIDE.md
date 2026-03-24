# Sentry Setup Guide

This guide outlines the practical steps to set up Sentry for error tracking and feedback loops in our project.

## 1. Create Account & Project
1. Go to [sentry.io](https://sentry.io/) and create an account.
2. Create a new Organization (e.g., `jkgss`).
3. Click **Create Project**.
4. Select **React** (or your specific framework if using Next.js/Vite config).
5. Name the project (e.g., `54-app`).

## 2. Install the SDK
The easiest and most reliable way to install and configure Sentry is using their official setup wizard. 
Run this in your terminal:

```bash
npx @sentry/wizard@latest -i react
```

*The wizard will prompt you to log in, select your project, and will automatically install dependencies and inject the initialization code into your app.*

## 3. Manual Configuration (Alternative)
If you prefer not to use the wizard, install the packages manually:
```bash
npm install @sentry/react @sentry/tracing
```

Then initialize it in your entry file (e.g., `src/main.tsx`):
```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_PROJECT_DSN_HERE", // Keep this in your .env file
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(), // Essential for Session Replay & Feedback
  ],
  tracesSampleRate: 1.0, // 100% during development
  replaysSessionSampleRate: 0.1, // 10% for normal sessions in prod
  replaysOnErrorSampleRate: 1.0, // 100% when an error occurs
});
```

## 4. Test It
To verify the setup is working, intentionally throw an error in your app (e.g., add a temporary button):
```tsx
<button onClick={() => { throw new Error("Sentry Test Error!"); }}>
  Test Sentry
</button>
```
Click it, open your Sentry dashboard, and confirm the issue was captured!
