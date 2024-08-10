/// <reference types="vitest" />
/// <reference types="vite/client" />

import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { remixDevTools } from 'remix-development-tools';

export default defineConfig({
  plugins: [remixDevTools(), remix(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
});
