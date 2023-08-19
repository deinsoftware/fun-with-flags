import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    globals: true,
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
    reporters: ['verbose'],
    coverage: {
      all: true,
      reporter: ['text', 'html', 'lcov'],
      include: ['**/src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        '.next/',
        '**/src/main.{js,jsx,ts,tsx}',
        '**/*.types.{ts,tsx}',
        '**/*.test.{js,jsx,ts,tsx}',
        '**/src/vite-env*',
      ],
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0,
    },
    environment: 'jsdom',
    setupFiles: '.vitest/setup.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '#': path.resolve(__dirname, './'),
    },
  },
})
