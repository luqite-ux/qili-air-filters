import test from 'node:test'
import assert from 'node:assert/strict'
import { compactFooterCategoryCount } from '../lib/content/customer-materials.mjs'

test('mobile footer limits the product-family index to a scannable subset', () => {
  assert.equal(compactFooterCategoryCount, 6)
})
