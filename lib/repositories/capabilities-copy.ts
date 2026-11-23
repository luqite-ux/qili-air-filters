import { DEFAULT_LOCALE } from '@/lib/i18n'
import { getSiteContent } from '@/lib/site-content/site-content'

export async function getCapabilitiesCopy(locale: string = DEFAULT_LOCALE) {
  const snapshot = await getSiteContent(locale)
  const values = snapshot?.pages.find(page => page.key === 'capabilities')?.modules.find(module => module.key === 'page_copy')?.values
  if (!values) throw new Error('Published Capabilities copy missing')
  const get = (key: string) => {
    const value = values[key]
    if (typeof value !== 'string' || !value.trim()) throw new Error(`Invalid Capabilities copy: ${key}`)
    return value
  }
  const stages = values.stages
  if (!Array.isArray(stages) || stages.length !== 4 || !stages.every(row => row && typeof row === 'object' && typeof row.title === 'string' && typeof row.text === 'string')) throw new Error('Invalid Capabilities stages')
  return {
    heroEyebrow: get('hero_eyebrow'), heroTitle: get('hero_title'), floorAreaLabel: get('floor_area_label'), workshopsLabel: get('workshops_label'),
    flowEyebrow: get('flow_eyebrow'), flowTitle: get('flow_title'), equipmentEyebrow: get('equipment_eyebrow'),
    equipmentTitle: get('equipment_title'), equipmentLead: get('equipment_lead'), galleryEyebrow: get('gallery_eyebrow'),
    galleryTitle: get('gallery_title'), galleryLead: get('gallery_lead'), galleryExpandLabel: get('gallery_expand_label'),
    ctaTitle: get('cta_title'), ctaText: get('cta_text'), seoTitle: get('seo_title'), seoDescription: get('seo_description'),
    stages: stages as Array<{ id: string; title: string; text: string }>,
  }
}
