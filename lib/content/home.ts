import { getSiteContent } from '@/lib/site-content/site-content'
import { applyHomeSiteContent } from './home-site-content.mjs'

export type HeroSlide = {
  id: string
  eyebrow: string
  title: string
  body: string
  cta: { label: string; href: string }
  secondary: { label: string; href: string }
  image: { src: string; alt: string }
  side: 'left' | 'right'
  tabLabel: string
}

export type Certification = {
  chinese?: string
  english?: string
  id: string
  standard: string
  title: string
  number: string
  subject: string
  issued: string
  validThrough: string
  issuedLabel: string
  validLabel: string
}

export type HomeContent = {
  heroStyles?: Record<string, unknown>
  slides: HeroSlide[]
  selection: { title: string; text: string; question: string; hint: string }[]
  airflowLayers: { id: string; stage: string; title: string; text: string }[]
  equipment: { title: string; text: string }[]
  process: { title: string; text: string }[]
  leadTimes: { id: string; title: string; window: string; min: number; max: number; text: string }[]
  faq: { group: string; items: { q: string; a: string }[] }[]
  certifications: Certification[]
}

export async function getHomeContent(locale: string): Promise<HomeContent> {
  const snapshot = await getSiteContent(locale)
  if (!snapshot) throw new Error('Published homepage content missing')
  const content = applyHomeSiteContent({}, snapshot) as HomeContent
  const counts: Array<[keyof HomeContent, number]> = [
    ['slides', 3], ['selection', 4], ['airflowLayers', 4], ['equipment', 8],
    ['process', 5], ['leadTimes', 3], ['certifications', 3],
  ]
  for (const [key, count] of counts) {
    if (!Array.isArray(content[key]) || content[key].length !== count) throw new Error(`Incomplete homepage module: ${key}`)
  }
  if (!Array.isArray(content.faq) || content.faq.length === 0) throw new Error('Published homepage FAQ missing')
  return content
}
