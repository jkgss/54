import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    // Local Vite has no Vercel serverless functions — proxy API calls to production.
    proxy: {
      '/api': {
        target: 'https://54-neon.vercel.app',
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
