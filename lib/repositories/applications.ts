import { DEFAULT_LOCALE, l, la, resolveLocalized, type Localized } from '@/lib/i18n'

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
  return {
    slug: a.slug,
    name: resolveLocalized(a.name, locale),
    group: a.group,
    summary: resolveLocalized(a.summary, locale),
    considerations: resolveLocalized(a.considerations, locale),
    categorySlugs: a.categorySlugs,
  }
}

export async function getApplications(locale: string = DEFAULT_LOCALE) {
  return raw.map((a) => toView(a, locale))
}

export async function getApplication(slug: string, locale: string = DEFAULT_LOCALE) {
  const found = raw.find((a) => a.slug === slug)
  return found ? toView(found, locale) : null
}

export async function getApplicationSlugs() {
  return raw.map((a) => a.slug)
}
