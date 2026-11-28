import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const repoRoot = path.resolve(import.meta.dirname, '..')
const sectionSource = fs.readFileSync(
  path.join(repoRoot, 'components/media/company-video-section.tsx'),
  'utf8'
)
const playerSource = fs.readFileSync(
  path.join(repoRoot, 'components/media/company-video-player.tsx'),
  'utf8'
)
const homePageSource = fs.readFileSync(path.join(repoRoot, 'app/page.tsx'), 'utf8')
const aboutPageSource = fs.readFileSync(path.join(repoRoot, 'app/about/page.tsx'), 'utf8')

test('company promo video and poster use qili-air-filters tenant R2 URLs', () => {
  assert.match(
    sectionSource,
    /https:\/\/pub-c7a22068052144a5805830c30d280128\.r2\.dev\/tenants\/qili-air-filters\/videos\/e8929b06b77757809c6f\.mp4/
  )
  assert.match(
    sectionSource,
    /https:\/\/pub-c7a22068052144a5805830c30d280128\.r2\.dev\/tenants\/qili-air-filters\/videos\/1cdabb41416ed5b0533d\.jpg/
  )
})

test('CompanyVideoSection is mounted on both homepage and About page', () => {
  assert.match(homePageSource, /<CompanyVideoSection\s*\/>/)
  assert.match(aboutPageSource, /<CompanyVideoSection\b/)
})

test('video player supports viewport pause and static poster fallback on error', () => {
  assert.match(playerSource, /IntersectionObserver/)
  assert.match(playerSource, /onError/)
  assert.match(playerSource, /playsInline/)
})

test('video components contain zero CJK characters and zero prohibited warranty terms', () => {
  const combined = `${sectionSource}\n${playerSource}`
  assert.doesNotMatch(combined, /[\u4e00-\u9fff]/)
  assert.doesNotMatch(combined, /\b(warrant(?:y|ies)|guarantee[ds]?)\b/i)
})
