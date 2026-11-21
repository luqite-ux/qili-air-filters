import test from 'node:test'
import assert from 'node:assert/strict'
import { metadata } from '../app/home-metadata.mjs'

test('homepage metadata publishes the formal root canonical URL', () => {
  assert.equal(metadata.alternates.canonical, '/')
})
