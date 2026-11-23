import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const ROOT_FOLDERS = [
  'components',
  'constants',
  'contexts',
  'hooks',
  'interfaces',
  'services',
  'utils'
]

export default defineConfig({
  resolve: {
    alias: ROOT_FOLDERS.map((folder) => ({
      find: new RegExp(`^${folder}/`),
      replacement: fileURLToPath(new URL(`./${folder}/`, import.meta.url))
    }))
  },
  test: {
    environment: 'jsdom',
    include: ['tests/unit/**/*.test.ts'],
    restoreMocks: true,
    unstubEnvs: true,
    unstubGlobals: true
  }
})
