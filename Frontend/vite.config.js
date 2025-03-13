import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // Increases the warning limit (temporary fix)
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Splits third-party dependencies
          }
          if (id.includes('some-heavy-library')) {
            return 'heavy-lib'; // Example: Create a separate chunk for a large library
          }
        },
      },
    },
  },
});
