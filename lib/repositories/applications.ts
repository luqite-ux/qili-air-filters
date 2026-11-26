import { DEFAULT_LOCALE } from '@/lib/i18n'
import { getSiteContent } from '@/lib/site-content/site-content'

export type ApplicationGroup = 'precision' | 'life-science' | 'industrial' | 'building'

export type ApplicationView = {
  slug: string
  name: string
  group: ApplicationGroup
  summary: string
  considerations: string[]
  categorySlugs: string[]
}

export async function getApplicationPresentation(locale: string = DEFAULT_LOCALE) {
  const snapshot = await getSiteContent(locale)
  const values = snapshot?.pages.find(page => page.key === 'applications')?.modules.find(module => module.key === 'page_copy')?.values
  if (!values) throw new Error('Published application copy missing')
  const get = (key: string) => { const value = values[key]; if (typeof value !== 'string' || !value.trim()) throw new Error('Invalid application copy: '+key); return value }
  const groups = Array.isArray(values?.groups) ? values.groups : []
  const labels = {} as Record<ApplicationGroup, { title: string; blurb: string }>
  for (const value of groups) {
    if (!value || typeof value !== 'object') throw new Error('Invalid application group')
    const row = value as Record<string, unknown>, group = row.group as ApplicationGroup
    if (!['precision', 'life-science', 'industrial', 'building'].includes(group) || typeof row.title !== 'string' || typeof row.blurb !== 'string') throw new Error('Invalid application group fields')
    labels[group] = { title: row.title, blurb: row.blurb }
  }
  if (Object.keys(labels).length !== 4) throw new Error('Incomplete application groups')
  return {
    groups: labels,
    heroTitle: get('hero_title'),
    heroLead: get('hero_lead'),
    ctaTitle: get('cta_title'),
    ctaText: get('cta_text'),
    considerationsTitle: get('considerations_title'),
    relatedTitle: get('related_title'),
    productPathsTitle: get('product_paths_title'),
    productPathsLead: get('product_paths_lead'),
    viewFamilyLabel: get('view_family_label'),
    rfqEyebrow: get('rfq_eyebrow'),
    rfqTitlePrefix: get('rfq_title_prefix'),
  }
}

const catalogSlugs: Record<string, string[]> = {
  'hepa-filters': ['high-efficiency-filters'],
  'chemical-filters': ['metal-mesh-oil-mist-and-chemical-filters'],
  'oil-mist-filters': ['metal-mesh-oil-mist-and-chemical-filters'],
  'pre-filters': ['primary-panel-filters'],
  'high-temperature-filters': ['high-efficiency-filters'],
  'household-commercial-hepa': ['residential-and-commercial-hepa-filters'],
  'filter-media': ['ql-primary-and-medium-efficiency-filter-media', 'ql-bag-filter-media', 'medium-efficiency-bag-filter-roll-media'],
}
function mappedCategories(text: string): string[] {
  return [...new Set(text.split('\n').map(item => item.trim()).filter(Boolean).flatMap(slug => catalogSlugs[slug] ?? [slug]))]
}
export async function getApplications(locale: string = DEFAULT_LOCALE) {
  const snapshot = await getSiteContent(locale)
  const catalogModule = snapshot?.pages.find(page => page.key === 'applications')?.modules.find(module => module.key === 'catalog')
  const rows = catalogModule?.values.items
  if (!Array.isArray(rows)) throw new Error('Published application catalog missing')
  const validGroups = new Set<ApplicationGroup>(['precision', 'life-science', 'industrial', 'building'])
  return rows.map((value): ApplicationView => {
    if (!value || typeof value !== 'object') throw new Error('Invalid application record')
    const row = value as Record<string, unknown>
    if (typeof row.slug !== 'string' || typeof row.name !== 'string' || typeof row.summary !== 'string' || !validGroups.has(row.group as ApplicationGroup)) throw new Error('Invalid published application')
    if (typeof row.considerations !== 'string' || typeof row.category_slugs !== 'string') throw new Error('Invalid application list fields')
    return { slug: row.slug, name: row.name, group: row.group as ApplicationGroup, summary: row.summary,
      considerations: row.considerations.split('\n').map(item => item.trim()).filter(Boolean),
      categorySlugs: mappedCategories(row.category_slugs),
    }
  })
}

export async function getApplication(slug: string, locale: string = DEFAULT_LOCALE) {
  return (await getApplications(locale)).find(application => application.slug === slug) ?? null
}

export async function getApplicationSlugs() {
  return (await getApplications()).map(application => application.slug)
}
