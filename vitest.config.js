import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/test.js'], // Include all test files with the .test.js suffix in the src directory and its subdirectories
  },
});
