import test from 'node:test'
import assert from 'node:assert/strict'
import { applyHomeSiteContent } from '../lib/content/home-site-content.mjs'

const fallback = {
  slides: [{ id: 'old', title: 'Old title', eyebrow: 'Old', body: 'Old body', cta: { label: 'Old', href: '/' }, secondary: { label: 'Old', href: '/' }, image: { src: '/old.jpg', alt: 'Old' }, side: 'left', tabLabel: 'Old' }],
  faq: [{ group: 'Old group', items: [{ q: 'Old question', a: 'Old answer' }] }],
  selection: [], airflowLayers: [], equipment: [], process: [], leadTimes: [], certifications: [],
}

test('published homepage snapshot overrides hero and FAQ content', () => {
  const snapshot = { version: 'v1', pages: [{ key: 'home', path: '/', modules: [
    { key: 'hero', type: 'hero', values: { slides: [{ id: 'range', eyebrow: 'Range', title: 'New title', body: 'New body', primary_label: 'Products', primary_href: '/products', secondary_label: 'Contact', secondary_href: '/contact', image: { url: 'https://cdn.example/banner.jpg', alt: 'Filters' }, side: 'right', tab_label: 'Range' }] } },
    { key: 'faq', type: 'faq', values: { items: [{ id: 'q1', group: 'Buying', question: 'MOQ?', answer: 'By specification.' }] } },
  ] }] }
  const result = applyHomeSiteContent(fallback, snapshot)
  assert.equal(result.slides[0].title, 'New title')
  assert.equal(result.slides[0].image.src, 'https://cdn.example/banner.jpg')
  assert.deepEqual(result.faq, [{ group: 'Buying', items: [{ q: 'MOQ?', a: 'By specification.' }] }])
})

test('missing homepage snapshot preserves the verified fallback', () => {
  assert.strictEqual(applyHomeSiteContent(fallback, null), fallback)
})
