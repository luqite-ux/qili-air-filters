import { DEFAULT_LOCALE } from '@/lib/i18n'
import { getSiteContent } from '@/lib/site-content/site-content'

export async function getAboutCopy(locale: string = DEFAULT_LOCALE) {
  const snapshot = await getSiteContent(locale)
  const values = snapshot?.pages.find(page => page.key === 'about')?.modules.find(module => module.key === 'page_copy')?.values
  if (!values) throw new Error('Published About copy missing')
  const get = (key: string) => {
    const value = values[key]
    if (typeof value !== 'string' || !value.trim()) throw new Error(`Invalid About copy: ${key}`)
    return value
  }
  const image = values.image as { url?: unknown; alt?: unknown } | undefined
  if (!image || typeof image !== 'object' || typeof image.url !== 'string' || typeof image.alt !== 'string' || !image.url.startsWith('https://')) throw new Error('Invalid About photograph')
  return {
    heroEyebrow: get('hero_eyebrow'), heroTitle: get('hero_title'), heroLeadSuffix: get('hero_lead_suffix'),
    companyTitle: get('company_title'), companyParagraph1: get('company_paragraph_1'), companyParagraph2: get('company_paragraph_2'),
    brandLabel: get('brand_label'), companyLabel: get('company_label'), addressLabel: get('address_label'),
    productionLabel: get('production_label'), productionValue: get('production_value'),
    image: image as { url: string; alt: string }, imageCaption: get('image_caption'),
    scopeEyebrow: get('scope_eyebrow'), scopeTitle: get('scope_title'), ctaTitle: get('cta_title'), ctaText: get('cta_text'),
    seoTitle: get('seo_title'), seoDescriptionSuffix: get('seo_description_suffix'),
  }
}
