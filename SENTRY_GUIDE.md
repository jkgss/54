# Sentry Setup Guide

This guide outlines the practical steps to set up Sentry for error tracking and feedback loops in our project.

## 1. Create Account & Project
1. Go to [sentry.io](https://sentry.io/) and create an account.
2. Create a new Organization (e.g., `jkgss`).
3. Click **Create Project**.
4. Select **React** (or your specific framework if using Next.js/Vite config).
5. Name the project (e.g., `54-app`).

## 2. Install the SDK
Install the packages manually by running in your terminal:
```bash
npm install @sentry/react @sentry/tracing
```

## 3. Configuration
Make sure you have your Sentry DSN ready from the Sentry Dashboard.
We have already initialized Sentry in your entry file (`src/main.tsx`).
Add your environment variable: `VITE_SENTRY_DSN=YOUR_DSN_HERE` to your `.env` file!
```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN || "https://e8cd92cc3e530e784145ca299282fd6f@o4511101309419520.ingest.us.sentry.io/4511101320298497",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(), // Essential for Session Replay & Feedback
  ],
  tracesSampleRate: 1.0, // 100% during development
  replaysSessionSampleRate: 0.1, // 10% for normal sessions in prod
  replaysOnErrorSampleRate: 1.0, // 100% when an error occurs
  sendDefaultPii: true,
});
```
