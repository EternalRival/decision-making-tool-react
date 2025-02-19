import { coverageConfigDefaults, defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    host: true,
  },
  build: {
    assetsInlineLimit: (filePath) => !/sprite\.svg$/i.test(filePath),
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  resolve: {
    alias: {
      '~': resolve(import.meta.dirname, 'src'),
    },
  },
  test: {
    environment: 'jsdom',
    // setupFiles: resolve(import.meta.dirname, 'test/setup-vitest.ts'),
    coverage: {
      reporter: ['text'],
      provider: 'v8',
      exclude: [
        ...coverageConfigDefaults.exclude,
        '**/{lint-staged,stylelint}.config.*',
        'vitest.setup.ts',
        '**/index.ts',
      ],
    },
  },
});
