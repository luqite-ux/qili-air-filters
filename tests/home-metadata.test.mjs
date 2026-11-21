import test from 'node:test'
import assert from 'node:assert/strict'
import { baseHomeMetadata, mergeHomeMetadata } from '../app/home-metadata.mjs'

test('homepage metadata publishes the formal root canonical URL', () => {
  assert.equal(baseHomeMetadata.alternates.canonical, '/')
})

test('site content SEO overrides copy without dropping the formal canonical', () => {
  const result = mergeHomeMetadata(baseHomeMetadata, { title: 'Managed title', description: 'Managed description' })
  assert.equal(result.title, 'Managed title')
  assert.equal(result.description, 'Managed description')
  assert.equal(result.alternates.canonical, '/')
})
