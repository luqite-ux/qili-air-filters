import 'server-only'
import { site, type SiteSettings } from './site'
import { getTenantId } from './supabase/server'
import { readPublicSettings } from './repositories/public-catalog'

export async function getPublishedSiteSettings(): Promise<SiteSettings> {
  const tenant = getTenantId()
  if (!tenant) throw new Error('Settings tenant is not configured')
  const row = await readPublicSettings(tenant)
  const address = row.contact_address_i18n?.en || site.address
  const phones = [row.contact_phone, row.extra_settings?.secondary_phone].filter((phone): phone is string => typeof phone === 'string' && Boolean(phone))
  return { ...site, legalName: row.extra_settings?.legal_name_i18n?.en || site.legalName, domain: row.domain, url: `https://${row.domain}`, email: row.public_contact_email || row.contact_email || site.email, address, addressLines: [address], phones: phones.map((phone, index) => ({ label: index ? 'Hotline' : 'Phone', display: phone, href: `tel:${phone.replace(/[^+0-9]/g, '')}` })) }
}
