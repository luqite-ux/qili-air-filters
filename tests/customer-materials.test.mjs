import test from 'node:test'
import assert from 'node:assert/strict'

import { facilityGallery, compactFooterCategoryCount } from '../lib/content/customer-materials.mjs'

test('facility gallery uses supplied production and cleanroom photography', () => {
  assert.ok(facilityGallery.length >= 6)
  assert.ok(facilityGallery.some((item) => /cutting|pleating|assembly/i.test(item.caption)))
  assert.ok(facilityGallery.some((item) => /cleanroom/i.test(item.caption)))
  assert.equal(new Set(facilityGallery.map((item) => item.src)).size, facilityGallery.length)
  assert.ok(facilityGallery.every((item) => item.alt.length >= 24 && item.caption.length >= 8))
})

test('mobile footer limits the product-family index to a scannable subset', () => {
  assert.equal(compactFooterCategoryCount, 6)
})
