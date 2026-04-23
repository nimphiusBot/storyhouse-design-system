import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'StoryhouseUtils',
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
    },
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: 'node',
  },
});