import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import love from 'eslint-config-love'
import prettier from 'eslint-config-prettier/flat'

const TS_FILES = ['**/*.{ts,tsx,mts}']

export default defineConfig([
  ...nextVitals,
  ...nextTs,

  { ...love, files: TS_FILES },

  {
    files: TS_FILES,
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-misused-promises': 'off'
    }
  },

  {
    files: ['utils/logError.ts'],
    rules: {
      'no-console': 'off'
    }
  },

  prettier,

  globalIgnores([
    '.next/**',
    'node_modules/**',
    'next-env.d.ts',
    'playwright-report/**',
    'test-results/**'
  ])
])
