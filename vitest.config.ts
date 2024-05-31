import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    // environment: 'nuxt',
    include: ['./test/*.spec.ts', './test/*.test.ts'],
    testTimeout: 100000,
  },
})
