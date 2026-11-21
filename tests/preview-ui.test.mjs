import test from 'node:test'
import assert from 'node:assert/strict'
import { previewUiState } from '../lib/site-content/preview-ui.mjs'

test('preview mode shows the exit control and suppresses analytics', () => {
  assert.deepEqual(previewUiState(true, true), { showPreviewBar: true, showAnalytics: false })
})

test('public production mode keeps analytics and hides preview controls', () => {
  assert.deepEqual(previewUiState(false, true), { showPreviewBar: false, showAnalytics: true })
})
