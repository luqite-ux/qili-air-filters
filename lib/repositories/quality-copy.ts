import { DEFAULT_LOCALE } from '@/lib/i18n'
import { getSiteContent } from '@/lib/site-content/site-content'

export async function getQualityCopy(locale: string = DEFAULT_LOCALE) {
  const snapshot = await getSiteContent(locale)
  const values = snapshot?.pages.find(page => page.key === 'quality')?.modules.find(module => module.key === 'page_copy')?.values
  if (!values) throw new Error('Published Quality copy missing')
  const get = (key: string) => {
    const value = values[key]
    if (typeof value !== 'string' || !value.trim()) throw new Error(`Invalid Quality copy: ${key}`)
    return value
  }
  const steps = values.steps
  if (!Array.isArray(steps) || steps.length !== 4 || !steps.every(row => row && typeof row === 'object' && typeof row.title === 'string' && typeof row.text === 'string')) throw new Error('Invalid Quality inspection steps')
  return {
    heroEyebrow: get('hero_eyebrow'), heroTitle: get('hero_title'), heroLead: get('hero_lead'),
    certificationsTitle: get('certifications_title'), certificateNumberLabel: get('certificate_number_label'),
    issuedLabel: get('issued_label'), validThroughLabel: get('valid_through_label'),
    chineseScanLabel: get('chinese_scan_label'), englishScanLabel: get('english_scan_label'),
    registrationLead: get('registration_lead'), registrationLinkLabel: get('registration_link_label'),
    inspectionEyebrow: get('inspection_eyebrow'), inspectionTitle: get('inspection_title'),
    ctaTitle: get('cta_title'), ctaText: get('cta_text'), seoTitle: get('seo_title'), seoDescription: get('seo_description'),
    steps: steps as Array<{ id: string; title: string; text: string }>,
  }
}
