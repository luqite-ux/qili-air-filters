import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const repoRoot = path.resolve(import.meta.dirname, '..')
const contentJson = JSON.parse(
  fs.readFileSync(path.join(repoRoot, 'deliverables/site-content/content.json'), 'utf8')
)
const applicationsSource = fs.readFileSync(
  path.join(repoRoot, 'lib/repositories/applications.ts'),
  'utf8'
)

test('lead_times module uses updated 15–20 days and 20–25 days windows', () => {
  const items = contentJson.pages.home.modules.lead_times.values.items
  const media = items.find((item) => item.id === 'media')
  const primary = items.find((item) => item.id === 'primary')
  assert.ok(media, 'media lead_time item must exist')
  assert.ok(primary, 'primary lead_time item must exist')
  assert.equal(media.min, 15)
  assert.equal(media.max, 20)
  assert.equal(media.window.en, '15–20 days')
  assert.equal(primary.min, 20)
  assert.equal(primary.max, 25)
  assert.equal(primary.window.en, '20–25 days')
})

test('FAQ lead-time answer matches updated production lead times without old windows', () => {
  const faqItems = contentJson.pages.home.modules.faq.values.items
  const leadFaq = faqItems.find((item) => item.id === 'lead-time')
  assert.ok(leadFaq, 'lead-time FAQ item must exist')
  assert.doesNotMatch(leadFaq.answer.en, /7[–-]10 days/)
  assert.doesNotMatch(leadFaq.answer.en, /10[–-]15 days/)
  assert.match(leadFaq.answer.en, /15–20 days/)
  assert.match(leadFaq.answer.en, /20–25 days/)
})

test('hero slide 2 no longer references the replaced stock banner asset', () => {
  const slides = contentJson.pages.home.modules.hero.values.slides
  assert.equal(slides[1].id, 'manufacturing')
  assert.notEqual(slides[1].image.assetId, '2fbd8da7-fb7c-45fe-9d6f-eea9ab152ca1')
  assert.ok(slides[1].image.assetId, 'slide 2 must reference the new R2 media asset')
})

test('applications mapping no longer references deleted category hepa-composite-filter-paper', () => {
  assert.doesNotMatch(applicationsSource, /hepa-composite-filter-paper/)
  assert.match(applicationsSource, /ql-bag-filter-media/)
})
