import { DEFAULT_LOCALE } from '@/lib/i18n'
import { getSiteContent } from '@/lib/site-content/site-content'

export async function getContactCopy(locale: string = DEFAULT_LOCALE) {
  const snapshot = await getSiteContent(locale)
  const values = snapshot?.pages.find(page => page.key === 'contact')?.modules.find(module => module.key === 'page_copy')?.values
  if (!values) throw new Error('Published contact copy missing')
  const get = (key: string) => {
    const value = values[key]
    if (typeof value !== 'string' || !value.trim()) throw new Error(`Invalid contact copy: ${key}`)
    return value
  }
  return {
    heroEyebrow: get('hero_eyebrow'),
    heroTitle: get('hero_title'),
    heroLead: get('hero_lead'),
    detailsTitle: get('details_title'),
    emailLabel: get('email_label'),
    phoneLabel: get('phone_label'),
    addressLabel: get('address_label'),
    formTitle: get('form_title'),
    seoTitle: get('seo_title'),
    seoDescription: get('seo_description'),
  }
}
