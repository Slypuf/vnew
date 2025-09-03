import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: true,
    allowedHosts: ['cf7bc4cacfcb.ngrok-free.app'],
    // Enhanced hot reloading settings
    hmr: {
      overlay: true, // Show errors as overlay
    },
    watch: {
      usePolling: false, // Use native file system events
      interval: 100, // Polling interval if usePolling is true
    },
  },
  // Enable source maps for better debugging
  build: {
    sourcemap: true,
  },
});
