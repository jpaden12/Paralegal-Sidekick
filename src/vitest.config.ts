import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Enable Jest-like global test APIs (describe, test, expect)
    globals: true,
    // Simulate a browser environment if testing UI components
    environment: 'node', 
  },
})