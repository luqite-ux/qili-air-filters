import { DEFAULT_LOCALE } from '@/lib/i18n'
import { getSiteContent } from '@/lib/site-content/site-content'

async function getCopy(pageKey: 'products' | 'news', keys: readonly string[], locale: string) {
  const snapshot = await getSiteContent(locale)
  const values = snapshot?.pages.find(page => page.key === pageKey)?.modules.find(module => module.key === 'page_copy')?.values
  if (!values) throw new Error(`Published ${pageKey} copy missing`)
  return Object.fromEntries(keys.map(key => {
    const value = values[key]
    if (typeof value !== 'string' || !value.trim()) throw new Error(`Invalid ${pageKey} copy: ${key}`)
    return [key, value]
  })) as Record<string, string>
}

const productKeys = ['seo_title', 'seo_description', 'hero_eyebrow', 'hero_title', 'hero_lead', 'list_title', 'planning_label', 'empty_title', 'empty_text', 'empty_cta', 'families_eyebrow', 'families_title', 'cta_title', 'cta_text'] as const
const newsKeys = ['seo_title', 'seo_description', 'hero_eyebrow', 'hero_title', 'hero_lead', 'list_title', 'empty_title', 'empty_text', 'browse_label', 'quote_label', 'read_label'] as const

export async function getProductListingCopy(locale: string = DEFAULT_LOCALE) { return getCopy('products', productKeys, locale) }
export async function getNewsListingCopy(locale: string = DEFAULT_LOCALE) { return getCopy('news', newsKeys, locale) }
