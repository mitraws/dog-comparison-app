import react from '@vitejs/plugin-react';
import type { UserConfigExport } from 'vite';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'], // <==
    setupFiles: './setupTests.ts',
  },
} as UserConfigExport);
