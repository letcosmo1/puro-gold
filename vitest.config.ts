import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'), // ou 'app' se o alias for para dentro de app/
    },
  },
  test: {
    globals: true,
    environment: 'jsdom', 
    setupFiles: './vitest.setup.ts',
  },
});
