import { DEFAULT_LOCALE, l, la, resolveLocalized, type Localized } from '@/lib/i18n'
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

type RawApplication = {
  slug: string
  name: Localized
  group: ApplicationGroup
  summary: Localized
  considerations: Localized<string[]>
  categorySlugs: string[]
}

export const applicationGroupLabels: Record<ApplicationGroup, { title: string; blurb: string }> = {
  precision: { title: 'Cleanroom and precision', blurb: 'Particle and gas control around sensitive production.' },
  'life-science': { title: 'Life science and healthcare', blurb: 'Controlled air for laboratories, production and care settings.' },
  industrial: { title: 'Industrial process', blurb: 'Process air with heat, mist or chemical loading.' },
  building: { title: 'Building and ventilation', blurb: 'Comfort, fresh-air and agricultural ventilation.' },
}

export async function getApplicationPresentation(locale: string = DEFAULT_LOCALE) {
  const snapshot = await getSiteContent(locale)
  const values = snapshot?.pages.find(page => page.key === 'applications')?.modules.find(module => module.key === 'page_copy')?.values
  const get = (key: string, fallback: string) => typeof values?.[key] === 'string' && values[key] ? values[key] as string : fallback
  const groups = Array.isArray(values?.groups) ? values.groups : []
  const labels = { ...applicationGroupLabels }
  for (const value of groups) {
    if (!value || typeof value !== 'object') continue
    const row = value as Record<string, unknown>, group = row.group as ApplicationGroup
    if (group in labels && typeof row.title === 'string' && typeof row.blurb === 'string') labels[group] = { title: row.title, blurb: row.blurb }
  }
  return {
    groups: labels,
    heroTitle: get('hero_title', 'Start from where the air is used'),
    heroLead: get('hero_lead', 'Fields where our filter families apply, each with the product paths to begin with. These are applicable fields, not a list of completed projects.'),
    ctaTitle: get('cta_title', 'Describe your application'),
    ctaText: get('cta_text', 'Share the operating conditions and dimensions. We will propose the stages and media.'),
    considerationsTitle: get('considerations_title', 'What to settle first'),
    relatedTitle: get('related_title', 'Related fields'),
    productPathsTitle: get('product_paths_title', 'Product paths'),
    productPathsLead: get('product_paths_lead', 'Families to start from for this field.'),
    viewFamilyLabel: get('view_family_label', 'View family'),
    rfqEyebrow: get('rfq_eyebrow', 'Request a Quote'),
    rfqTitlePrefix: get('rfq_title_prefix', 'Filters for'),
  }
}

/* Applicable fields only. These are not claims of completed projects. */
const raw: RawApplication[] = [
  {
    slug: 'microelectronics',
    name: l('Microelectronics'),
    group: 'precision',
    summary: l('Air filtration around assembly and test areas where particles and gases affect yield.'),
    considerations: la(['Particle control at fan-filter and terminal stages', 'Gas-phase filtration where airborne molecules matter', 'Frame sizes matched to existing ceiling grids']),
    categorySlugs: ['hepa-filters', 'chemical-filters', 'pre-filters'],
  },
  {
    slug: 'semiconductors',
    name: l('Semiconductors'),
    group: 'precision',
    summary: l('Staged particle and chemical filtration for fabrication-support air systems.'),
    considerations: la(['Combined particle and chemical filtration stages', 'Low-outgassing frame and media choices discussed per project', 'Dimensions fitted to existing housings']),
    categorySlugs: ['hepa-filters', 'chemical-filters', 'high-efficiency-filter-units'],
  },
  {
    slug: 'lithium-batteries',
    name: l('Lithium batteries'),
    group: 'precision',
    summary: l('Dry-room and process-air filtration for battery production environments.'),
    considerations: la(['Particle control in controlled-humidity areas', 'Solvent and odour treatment with chemical media', 'Heat and moisture conditions confirmed per line']),
    categorySlugs: ['hepa-filters', 'chemical-filters', 'high-temperature-filters'],
  },
  {
    slug: 'photovoltaics',
    name: l('Photovoltaics'),
    group: 'precision',
    summary: l('Process and cleanroom air filtration for photovoltaic cell and module production.'),
    considerations: la(['Particle control around cell and module lines', 'Chemical media for process-gas areas', 'Heat-resistant constructions where lines run hot']),
    categorySlugs: ['hepa-filters', 'chemical-filters', 'high-temperature-filters'],
  },
  {
    slug: 'membrane-production',
    name: l('Membrane production'),
    group: 'precision',
    summary: l('Clean and solvent-laden air handling around coating and film processes.'),
    considerations: la(['Particle control across coating areas', 'Mist and solvent handling in drying zones', 'Temperature range shared before construction is chosen']),
    categorySlugs: ['oil-mist-filters', 'high-temperature-filters', 'chemical-filters'],
  },
  {
    slug: 'biological-laboratories',
    name: l('Biological laboratories'),
    group: 'life-science',
    summary: l('HEPA and terminal filtration for laboratory air supply and exhaust.'),
    considerations: la(['HEPA panels and housed units for supply and exhaust', 'Sealing faces matched to cabinet or housing design', 'Replacement size lists maintained for repeat orders']),
    categorySlugs: ['hepa-filters', 'high-efficiency-filter-units', 'pre-filters'],
  },
  {
    slug: 'pharmaceuticals',
    name: l('Pharmaceuticals'),
    group: 'life-science',
    summary: l('Multi-stage filtration for production and support areas.'),
    considerations: la(['Pre-filter, bag and HEPA stages sized together', 'Frame and media choices agreed against your requirement', 'Inspection requirements discussed before production']),
    categorySlugs: ['pre-filters', 'medium-efficiency-bag-filters', 'hepa-filters'],
  },
  {
    slug: 'food-beverage',
    name: l('Food and beverage'),
    group: 'life-science',
    summary: l('Air filtration for processing, packing and storage areas.'),
    considerations: la(['Pre-filter and bag stages for general processing air', 'Frame materials discussed for wash-down areas', 'Odour control with chemical media where needed']),
    categorySlugs: ['pre-filters', 'medium-efficiency-bag-filters', 'chemical-filters'],
  },
  {
    slug: 'hospitals',
    name: l('Hospitals'),
    group: 'life-science',
    summary: l('Staged filtration for ventilation systems in care and support areas.'),
    considerations: la(['Bag and HEPA stages for central air handling', 'High-efficiency units for terminal installation', 'Planned replacement sizes for maintenance teams']),
    categorySlugs: ['medium-efficiency-bag-filters', 'hepa-filters', 'high-efficiency-filter-units'],
  },
  {
    slug: 'automotive-coating',
    name: l('Automotive coating'),
    group: 'industrial',
    summary: l('Booth and supply-air filtration where overspray, mist and heat are present.'),
    considerations: la(['Mist-handling constructions for process air', 'Heat-resistant frames where booths run warm', 'Pre-filter stages that protect finer filters']),
    categorySlugs: ['oil-mist-filters', 'high-temperature-filters', 'pre-filters'],
  },
  {
    slug: 'hvac-terminals',
    name: l('HVAC terminals'),
    group: 'building',
    summary: l('Terminal and air handling unit filtration for building air.'),
    considerations: la(['Pre-filter and bag stages in standard face sizes', 'High-efficiency units at supply terminals', 'Sizes and frames matched to existing units']),
    categorySlugs: ['pre-filters', 'medium-efficiency-bag-filters', 'high-efficiency-filter-units'],
  },
  {
    slug: 'commercial-hvac',
    name: l('Commercial HVAC'),
    group: 'building',
    summary: l('Filtration and humidification media for commercial air systems.'),
    considerations: la(['Bag and panel stages for central systems', 'Media supplied for in-house filter conversion', 'Humidifier pads for evaporative systems']),
    categorySlugs: ['medium-efficiency-bag-filters', 'filter-media', 'humidifier-pads'],
  },
  {
    slug: 'residential-fresh-air',
    name: l('Residential fresh air'),
    group: 'building',
    summary: l('Filter elements and media for household fresh-air and purification units.'),
    considerations: la(['HEPA elements made to the appliance fit', 'Media supplied for OEM filter production', 'Humidifier pads matched to unit models']),
    categorySlugs: ['household-commercial-hepa', 'filter-media', 'humidifier-pads'],
  },
  {
    slug: 'agricultural-ventilation',
    name: l('Agricultural ventilation'),
    group: 'building',
    summary: l('Ventilation filtration for farm buildings and growing spaces.'),
    considerations: la(['Coarse media for dust-heavy intake air', 'Pads for evaporative cooling and humidification', 'Rolls and cut pieces sized to your fans or walls']),
    categorySlugs: ['filter-media', 'humidifier-pads', 'pre-filters'],
  },
]

function toView(a: RawApplication, locale: string): ApplicationView {
  // Application terminology is broader than the source-backed catalogue categories.
  const catalogSlugs: Record<string, string[]> = {
    'hepa-filters': ['high-efficiency-filters'],
    'chemical-filters': ['metal-mesh-oil-mist-and-chemical-filters'],
    'oil-mist-filters': ['metal-mesh-oil-mist-and-chemical-filters'],
    'pre-filters': ['primary-panel-filters'],
    'high-temperature-filters': ['high-efficiency-filters'],
    'household-commercial-hepa': ['residential-and-commercial-hepa-filters'],
    'filter-media': ['ql-primary-and-medium-efficiency-filter-media', 'medium-efficiency-bag-filter-roll-media', 'hepa-composite-filter-paper'],
  }
  return {
    slug: a.slug,
    name: resolveLocalized(a.name, locale),
    group: a.group,
    summary: resolveLocalized(a.summary, locale),
    considerations: resolveLocalized(a.considerations, locale),
    categorySlugs: [...new Set(a.categorySlugs.flatMap(slug => catalogSlugs[slug] ?? [slug]))],
  }
}

export async function getApplications(locale: string = DEFAULT_LOCALE) {
  const snapshot = await getSiteContent(locale)
  const module = snapshot?.pages.find(page => page.key === 'applications')?.modules.find(module => module.key === 'catalog')
  const rows = module?.values.items
  if (!Array.isArray(rows)) return raw.map((a) => toView(a, locale))
  const validGroups = new Set<ApplicationGroup>(['precision', 'life-science', 'industrial', 'building'])
  return rows.map((value): ApplicationView => {
    if (!value || typeof value !== 'object') throw new Error('Invalid application record')
    const row = value as Record<string, unknown>
    if (typeof row.slug !== 'string' || typeof row.name !== 'string' || typeof row.summary !== 'string' || !validGroups.has(row.group as ApplicationGroup)) throw new Error('Invalid published application')
    if (typeof row.considerations !== 'string' || typeof row.category_slugs !== 'string') throw new Error('Invalid application list fields')
    const source = raw.find(item => item.slug === row.slug)
    return { slug: row.slug, name: row.name, group: row.group as ApplicationGroup, summary: row.summary,
      considerations: row.considerations.split('\n').map(item => item.trim()).filter(Boolean),
      categorySlugs: [...new Set(row.category_slugs.split('\n').map(item => item.trim()).filter(Boolean).flatMap(slug => {
        const original = source?.categorySlugs.find(item => item === slug)
        return original ? toView({ ...source!, categorySlugs: [slug] }, locale).categorySlugs : [slug]
      }))],
    }
  })
}

export async function getApplication(slug: string, locale: string = DEFAULT_LOCALE) {
  return (await getApplications(locale)).find(application => application.slug === slug) ?? null
}

export async function getApplicationSlugs() {
  return (await getApplications()).map(application => application.slug)
}
