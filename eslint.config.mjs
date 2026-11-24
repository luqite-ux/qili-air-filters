import { globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const config = [
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'node_modules/**', '.codex-delivery/**', '.playwright-cli/**', 'output/**', 'deliverables/evidence/**', 'next-env.d.ts']),
]

export default config
