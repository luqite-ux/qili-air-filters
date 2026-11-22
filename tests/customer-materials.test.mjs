import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

import { facilityGallery, productionEquipment, compactFooterCategoryCount } from '../lib/content/customer-materials.mjs'

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

test('equipment groups preserve the quantities supplied in the customer workbook', () => {
  const facts = productionEquipment.flatMap((group) => group.items).join(' · ')
  assert.match(facts, /1 meltblown line/)
  assert.match(facts, /2 nonwoven lines/)
  assert.match(facts, /3 composite bag-media lines/)
  assert.match(facts, /3 pleating machines/)
  assert.match(facts, /3 riveting machines/)
})

test('production photographs remain visible even when viewport motion is missed', () => {
  const source = readFileSync(new URL('../app/capabilities/page.tsx', import.meta.url), 'utf8')
  const gallery = source.slice(source.indexOf('facilityGallery.map'), source.indexOf('</ul>', source.indexOf('facilityGallery.map')))
  assert.doesNotMatch(gallery, /<Reveal\b/)
})
