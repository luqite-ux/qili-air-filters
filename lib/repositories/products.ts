import { DEFAULT_LOCALE, l, la, resolveLocalized, type Localized } from '@/lib/i18n'
import { getServerDatabase, getTenantId } from '@/lib/supabase/server'

/*
 * Integration boundary: replace the demo records below with tenant-scoped backend data.
 * Components only consume the resolved view types and the async getters.
 */

export type VisualKind = 'panel' | 'bag' | 'hepa' | 'chemical' | 'hightemp' | 'oilmist' | 'media' | 'household' | 'pad' | 'unit'

export type ProductImage = { src: string; alt: string; width: number; height: number }

export type CategoryView = {
  slug: string
  name: string
  role: string
  summary: string
  visual: VisualKind
  image?: ProductImage
  leadTime?: { window: string; note: string }
}

export type ProductView = {
  slug: string
  categorySlug: string
  name: string
  summary: string
  overview: string
  features: string[]
  images: ProductImage[]
  visual: VisualKind
  specs: { label: string; value: string }[]
  applicationSlugs: string[]
}

type RawImage = { src: string; alt: Localized; width: number; height: number }

type RawCategory = {
  slug: string
  name: Localized
  role: Localized
  summary: Localized
  visual: VisualKind
  image?: RawImage
  leadTime?: { window: Localized; note: Localized }
}

type RawProduct = {
  slug: string
  categorySlug: string
  name: Localized
  summary: Localized
  overview: Localized
  features: Localized<string[]>
  images: RawImage[]
  visual: VisualKind
  specs: { label: Localized; value: Localized }[]
  applicationSlugs: string[]
}

const planningNote = l('Indicative planning reference. Actual timing depends on specification, quantity and order confirmation.')

const rawCategories: RawCategory[] = [
  {
    slug: 'pre-filters',
    name: l('Pre-filters'),
    role: l('Coarse dust stage'),
    summary: l('Panel and pleated pre-filters that protect the stages behind them in air handling units and terminals.'),
    visual: 'panel',
    image: { src: '/images/products/panel-pre-filter.jpg', alt: l('Three pleated panel pre-filters in metal frames with green, grey and black media'), width: 1920, height: 1920 },
    leadTime: { window: l('10–15 days'), note: planningNote },
  },
  {
    slug: 'medium-efficiency-bag-filters',
    name: l('Medium-efficiency bag filters'),
    role: l('Fine dust stage'),
    summary: l('Multi-pocket bag filters for the middle stage of a filtration train, made to your frame and pocket layout.'),
    visual: 'bag',
    image: { src: '/images/products/bag-filter.jpg', alt: l('Pink multi-pocket bag filter in a light metal frame'), width: 1920, height: 1920 },
    leadTime: { window: l('10–15 days'), note: planningNote },
  },
  {
    slug: 'hepa-filters',
    name: l('HEPA filters'),
    role: l('High-efficiency stage'),
    summary: l('Framed HEPA panels for cleanrooms, laboratories and process air, made to your dimensions.'),
    visual: 'hepa',
    image: { src: '/images/products/hepa-panel-filter.jpg', alt: l('Four black-framed HEPA panel filters of different sizes'), width: 1920, height: 1920 },
    leadTime: { window: l('20–25 days'), note: planningNote },
  },
  {
    slug: 'chemical-filters',
    name: l('Chemical filters'),
    role: l('Gas-phase stage'),
    summary: l('Activated-carbon and chemical-media filters in panel and V-bank formats for gaseous contaminants and odour.'),
    visual: 'chemical',
    image: { src: '/images/products/chemical-v-bank-carbon.jpg', alt: l('Activated-carbon honeycomb panel filter beside a black V-bank chemical filter'), width: 1920, height: 1920 },
  },
  {
    slug: 'high-temperature-filters',
    name: l('High-temperature filters'),
    role: l('Heat-resistant stage'),
    summary: l('Filters for elevated-temperature air streams. Operating temperature is defined with each application.'),
    visual: 'hightemp',
  },
  {
    slug: 'oil-mist-filters',
    name: l('Oil-mist filters'),
    role: l('Process-air stage'),
    summary: l('Filters for process air carrying oil mist or aerosol. Media and structure follow the operating condition.'),
    visual: 'oilmist',
  },
  {
    slug: 'filter-media',
    name: l('Air filter media and filter cotton'),
    role: l('Roll goods'),
    summary: l('Meltblown and nonwoven media and filter cotton, supplied in rolls or cut to size.'),
    visual: 'media',
    leadTime: { window: l('7–10 days'), note: l('Indicative planning reference for filter-media container orders. Actual timing depends on specification, quantity and order confirmation.') },
  },
  {
    slug: 'household-commercial-hepa',
    name: l('Household and commercial HEPA filters'),
    role: l('Appliance elements'),
    summary: l('HEPA filter elements for air purifiers and commercial units, made to your appliance dimensions.'),
    visual: 'household',
  },
  {
    slug: 'humidifier-pads',
    name: l('Humidifier pads'),
    role: l('Humidification media'),
    summary: l('Evaporative humidifier pads in several mesh structures and sizes.'),
    visual: 'pad',
    image: { src: '/images/products/humidifier-pad.jpg', alt: l('Blue, white and green humidifier pad samples in different mesh structures'), width: 1920, height: 1920 },
  },
  {
    slug: 'high-efficiency-filter-units',
    name: l('High-efficiency filter units'),
    role: l('Terminal units'),
    summary: l('Housed high-efficiency units that combine a filter with its casing for terminal installation.'),
    visual: 'unit',
  },
]

const sizesLine = { label: l('Dimensions'), value: l('Made to your drawing or size list') }
const mediaLine = { label: l('Media'), value: l('Selected with you against the operating condition') }
const qtyLine = { label: l('Order basis'), value: l('Quantity and packing confirmed at quotation') }

const rawProducts: RawProduct[] = [
  {
    slug: 'panel-pre-filter',
    categorySlug: 'pre-filters',
    name: l('Pleated panel pre-filter'),
    summary: l('Pleated media in a rigid metal frame, used as the first stage ahead of finer filters.'),
    overview: l('A pleated panel with a supporting grid in a metal frame. The panel format is simple to fit and replace, and the pleat structure gives a larger media area within the frame depth you specify.'),
    features: la(['Pleated media with a supporting grid', 'Metal frame, fitted to your housing', 'Media colour and grade chosen to the filter stage', 'Frame depth and pleat layout to your drawing']),
    images: [{ src: '/images/products/panel-pre-filter.jpg', alt: l('Three pleated panel pre-filters in metal frames with green, grey and black media'), width: 1920, height: 1920 }],
    visual: 'panel',
    specs: [{ label: l('Structure'), value: l('Pleated panel in a metal frame') }, mediaLine, sizesLine, qtyLine],
    applicationSlugs: ['hvac-terminals', 'commercial-hvac', 'microelectronics', 'food-beverage'],
  },
  {
    slug: 'multi-pocket-bag-filter',
    categorySlug: 'medium-efficiency-bag-filters',
    name: l('Multi-pocket bag filter'),
    summary: l('Synthetic pockets in a light metal frame, built for the middle stage of an air handling train.'),
    overview: l('Several media pockets share one header frame, giving a deep dust-holding volume at a standard face size. Pocket count, pocket length and frame are set to your unit.'),
    features: la(['Multiple pockets on a single header frame', 'Stitched pocket seams', 'Pocket count and length to your unit', 'Frame profile and gasket options on request']),
    images: [{ src: '/images/products/bag-filter.jpg', alt: l('Pink multi-pocket bag filter in a light metal frame'), width: 1920, height: 1920 }],
    visual: 'bag',
    specs: [{ label: l('Structure'), value: l('Pocket media on a header frame') }, mediaLine, sizesLine, qtyLine],
    applicationSlugs: ['hvac-terminals', 'commercial-hvac', 'pharmaceuticals', 'hospitals'],
  },
  {
    slug: 'hepa-panel-filter',
    categorySlug: 'hepa-filters',
    name: l('HEPA panel filter'),
    summary: l('Fine-fibre HEPA media in a rigid frame, made in the width, height and depth your system needs.'),
    overview: l('HEPA panels are produced in a range of proportions, from tall narrow formats to compact squares. Frame colour, depth and sealing are agreed with you before production.'),
    features: la(['Fine-fibre media with separated pleats', 'Rigid frame with a flat sealing face', 'Tall, wide and compact formats', 'Dimensions and sealing to your housing']),
    images: [{ src: '/images/products/hepa-panel-filter.jpg', alt: l('Four black-framed HEPA panel filters of different sizes'), width: 1920, height: 1920 }],
    visual: 'hepa',
    specs: [{ label: l('Structure'), value: l('Pleated HEPA media in a rigid frame') }, mediaLine, sizesLine, qtyLine],
    applicationSlugs: ['biological-laboratories', 'pharmaceuticals', 'semiconductors', 'hospitals', 'microelectronics'],
  },
  {
    slug: 'panel-and-v-bank-chemical-filter',
    categorySlug: 'chemical-filters',
    name: l('Activated-carbon panel and V-bank chemical filter'),
    summary: l('Carbon honeycomb panels and deep V-bank cells for gas-phase filtration stages.'),
    overview: l('Chemical filters pair an adsorbent medium with a structure suited to the airflow. A flat honeycomb panel suits shallow housings; a V-bank cell offers more medium in a standard face size.'),
    features: la(['Panel format with activated-carbon honeycomb', 'V-bank cell for greater medium volume', 'Adsorbent and structure chosen to the target gas', 'Frame and cell size to your housing']),
    images: [{ src: '/images/products/chemical-v-bank-carbon.jpg', alt: l('Activated-carbon honeycomb panel filter beside a black V-bank chemical filter'), width: 1920, height: 1920 }],
    visual: 'chemical',
    specs: [{ label: l('Structure'), value: l('Panel or V-bank cell') }, { label: l('Medium'), value: l('Activated carbon or other chemical media, defined with you') }, sizesLine, qtyLine],
    applicationSlugs: ['semiconductors', 'microelectronics', 'lithium-batteries', 'photovoltaics'],
  },
  {
    slug: 'high-temperature-filter',
    categorySlug: 'high-temperature-filters',
    name: l('High-temperature filter'),
    summary: l('Heat-resistant filter construction for elevated-temperature air streams.'),
    overview: l('Heat changes the media, frame and sealing choices. Share the working temperature range and airflow so the construction can be specified for your process.'),
    features: la(['Media and frame selected for the temperature range', 'Sealing suited to the operating condition', 'Dimensions to your drawing']),
    images: [],
    visual: 'hightemp',
    specs: [{ label: l('Structure'), value: l('Defined with the operating condition') }, mediaLine, sizesLine, qtyLine],
    applicationSlugs: ['automotive-coating', 'lithium-batteries', 'photovoltaics', 'membrane-production'],
  },
  {
    slug: 'oil-mist-filter',
    categorySlug: 'oil-mist-filters',
    name: l('Oil-mist filter'),
    summary: l('Filter construction for process air carrying oil mist or aerosol.'),
    overview: l('Oil-laden air needs media and structure that handle liquid loading. Tell us the process, airflow and mist source and we will propose a construction to quote.'),
    features: la(['Media chosen for liquid-laden air', 'Frame and drainage details to your equipment', 'Dimensions to your drawing']),
    images: [],
    visual: 'oilmist',
    specs: [{ label: l('Structure'), value: l('Defined with the operating condition') }, mediaLine, sizesLine, qtyLine],
    applicationSlugs: ['automotive-coating', 'membrane-production', 'lithium-batteries'],
  },
  {
    slug: 'air-filter-media-roll',
    categorySlug: 'filter-media',
    name: l('Air filter media and filter cotton'),
    summary: l('Meltblown and nonwoven filter media and filter cotton in rolls or cut lengths.'),
    overview: l('Media is the foundation of every filter we build, and it is also supplied on its own for converters and appliance makers. Roll width, length and basis are set per order.'),
    features: la(['Meltblown and nonwoven media', 'Filter cotton for coarse stages', 'Roll width and length to your line', 'Cut-to-size pieces on request']),
    images: [],
    visual: 'media',
    specs: [{ label: l('Format'), value: l('Rolls or cut-to-size sheets') }, { label: l('Media type'), value: l('Meltblown, nonwoven or filter cotton') }, { label: l('Roll size'), value: l('Width and length set per order') }, qtyLine],
    applicationSlugs: ['residential-fresh-air', 'commercial-hvac', 'agricultural-ventilation'],
  },
  {
    slug: 'household-commercial-hepa-filter',
    categorySlug: 'household-commercial-hepa',
    name: l('Household and commercial HEPA filter'),
    summary: l('Replacement and OEM HEPA filter elements for air purifiers and commercial units.'),
    overview: l('Round and rectangular elements are made to the fit of your appliance. Send a sample or drawing, and we will confirm media, frame and any pre-filter or carbon layer.'),
    features: la(['Elements made to your appliance fit', 'Optional pre-filter or carbon layers', 'Sample or drawing based development']),
    images: [],
    visual: 'household',
    specs: [{ label: l('Structure'), value: l('Pleated element, round or rectangular') }, mediaLine, sizesLine, qtyLine],
    applicationSlugs: ['residential-fresh-air', 'commercial-hvac'],
  },
  {
    slug: 'humidifier-pad',
    categorySlug: 'humidifier-pads',
    name: l('Humidifier pad'),
    summary: l('Evaporative pads in several mesh structures, supplied as sheets, strips or rolled bands.'),
    overview: l('Pads are available in different mesh structures and colours. Share your humidifier model or the pad size so the cut and structure match the unit.'),
    features: la(['Several mesh structures', 'Sheets, strips or rolled bands', 'Cut to your humidifier model']),
    images: [{ src: '/images/products/humidifier-pad.jpg', alt: l('Blue, white and green humidifier pad samples in different mesh structures'), width: 1920, height: 1920 }],
    visual: 'pad',
    specs: [{ label: l('Structure'), value: l('Mesh pad, rolled or flat') }, { label: l('Format'), value: l('Sheet, strip or band') }, sizesLine, qtyLine],
    applicationSlugs: ['residential-fresh-air', 'commercial-hvac', 'agricultural-ventilation'],
  },
  {
    slug: 'high-efficiency-filter-unit',
    categorySlug: 'high-efficiency-filter-units',
    name: l('High-efficiency filter unit'),
    summary: l('A high-efficiency filter combined with its casing for terminal installation.'),
    overview: l('Housed units reduce site assembly by delivering the filter and casing together. Casing size, connection and filter grade are confirmed from your drawing.'),
    features: la(['Filter and casing supplied together', 'Casing size and connection to your drawing', 'Filter grade confirmed with you']),
    images: [],
    visual: 'unit',
    specs: [{ label: l('Structure'), value: l('Filter in a casing') }, mediaLine, sizesLine, qtyLine],
    applicationSlugs: ['biological-laboratories', 'pharmaceuticals', 'semiconductors', 'hospitals'],
  },
]

const resolveImage = (image: RawImage, locale: string): ProductImage => ({
  src: image.src,
  width: image.width,
  height: image.height,
  alt: resolveLocalized(image.alt, locale),
})

function toCategory(raw: RawCategory, locale: string): CategoryView {
  return {
    slug: raw.slug,
    name: resolveLocalized(raw.name, locale),
    role: resolveLocalized(raw.role, locale),
    summary: resolveLocalized(raw.summary, locale),
    visual: raw.visual,
    image: raw.image ? resolveImage(raw.image, locale) : undefined,
    leadTime: raw.leadTime
      ? { window: resolveLocalized(raw.leadTime.window, locale), note: resolveLocalized(raw.leadTime.note, locale) }
      : undefined,
  }
}

function toProduct(raw: RawProduct, locale: string): ProductView {
  return {
    slug: raw.slug,
    categorySlug: raw.categorySlug,
    name: resolveLocalized(raw.name, locale),
    summary: resolveLocalized(raw.summary, locale),
    overview: resolveLocalized(raw.overview, locale),
    features: resolveLocalized(raw.features, locale),
    images: raw.images.map((image) => resolveImage(image, locale)),
    visual: raw.visual,
    specs: raw.specs.map((s) => ({ label: resolveLocalized(s.label, locale), value: resolveLocalized(s.value, locale) })),
    applicationSlugs: raw.applicationSlugs,
  }
}

export async function getCategories(locale: string = DEFAULT_LOCALE): Promise<CategoryView[]> {
  const db = getServerDatabase(), tenantId = getTenantId()
  if (!db || !tenantId) return rawCategories.map((c) => toCategory(c, locale))
  const { data, error } = await db.from('product_categories').select('slug,name,name_en,name_i18n,description,description_en,description_i18n,sort_order').eq('tenant_id', tenantId).eq('is_active', true).order('sort_order').order('id')
  if (error || !data?.length) return rawCategories.map((c) => toCategory(c, locale))
  return data.map((row) => {
    const localizedName = resolveLocalized((row.name_i18n ?? { en: row.name_en || row.name }) as Localized, locale)
    const summary = resolveLocalized((row.description_i18n ?? { en: row.description_en || row.description || '' }) as Localized, locale)
    const visual: VisualKind = /bag/i.test(localizedName) ? 'bag' : /hepa|high efficiency/i.test(localizedName) ? 'hepa' : /chemical|metal|oil/i.test(localizedName) ? 'chemical' : /media|paper|nonwoven|cotton|mat/i.test(localizedName) ? 'media' : /humid/i.test(localizedName) ? 'pad' : 'panel'
    return { slug: row.slug, name: localizedName, role: 'Product family', summary: summary || `Explore ${localizedName.toLowerCase()} supplied to customer specifications.`, visual }
  })
}

export async function getCategory(slug: string, locale: string = DEFAULT_LOCALE) {
  return (await getCategories(locale)).find((category) => category.slug === slug) ?? null
}

export async function getProducts(locale: string = DEFAULT_LOCALE, categorySlug?: string): Promise<ProductView[]> {
  const db = getServerDatabase(), tenantId = getTenantId()
  if (!db || !tenantId) return rawProducts.filter((p) => !categorySlug || p.categorySlug === categorySlug).map((p) => toProduct(p, locale))
  let query = db.from('products').select('slug,category_slug,name,name_en,name_i18n,description,description_en,description_i18n,overview,overview_en,overview_i18n,features,features_i18n,image_url,specs,extra_data,sort_order').eq('tenant_id', tenantId).eq('is_active', true).order('sort_order').order('id')
  if (categorySlug) query = query.eq('category_slug', categorySlug)
  const { data, error } = await query
  if (error || !data?.length) return rawProducts.filter((p) => !categorySlug || p.categorySlug === categorySlug).map((p) => toProduct(p, locale))
  return data.map((row) => {
    const name = resolveLocalized((row.name_i18n ?? { en: row.name_en || row.name }) as Localized, locale)
    const summary = resolveLocalized((row.description_i18n ?? { en: row.description_en || row.description || '' }) as Localized, locale)
    const overview = resolveLocalized((row.overview_i18n ?? { en: row.overview_en || row.overview || summary }) as Localized, locale)
    const featureValue = resolveLocalized((row.features_i18n ?? { en: row.features || [] }) as Localized<string[]>, locale)
    const gallery = Array.isArray(row.extra_data?.images) ? row.extra_data.images.filter((url: unknown): url is string => typeof url === 'string' && /^https:\/\//.test(url)) : []
    const urls = gallery.length ? gallery : row.image_url ? [row.image_url] : []
    const specs = row.specs && typeof row.specs === 'object' && !Array.isArray(row.specs) ? Object.entries(row.specs).map(([label,value]) => ({ label, value: String(value) })) : []
    const visual: VisualKind = /bag/i.test(name) ? 'bag' : /hepa|high efficiency/i.test(name) ? 'hepa' : /chemical|metal|oil|voc/i.test(name) ? 'chemical' : /media|paper|nonwoven|cotton|mat/i.test(name) ? 'media' : /humid/i.test(name) ? 'pad' : /unit|ffu/i.test(name) ? 'unit' : 'panel'
    return { slug: row.slug, categorySlug: row.category_slug, name, summary, overview, features: Array.isArray(featureValue) ? featureValue : [], images: urls.map((src: string, index: number) => ({ src, alt: `${name}${index ? ` view ${index + 1}` : ''}`, width: 1600, height: 1600 })), visual, specs, applicationSlugs: [] }
  })
}

export async function getProduct(slug: string, locale: string = DEFAULT_LOCALE) {
  return (await getProducts(locale)).find((product) => product.slug === slug) ?? null
}

export async function getRelatedProducts(slug: string, locale: string = DEFAULT_LOCALE, limit = 3) {
  const all = await getProducts(locale)
  const current = all.find((p) => p.slug === slug)
  if (!current) return all.slice(0, limit)
  const others = all.filter((p) => p.slug !== slug)
  const score = (p: ProductView) => p.applicationSlugs.filter((a) => current.applicationSlugs.includes(a)).length
  return others.sort((a, b) => score(b) - score(a)).slice(0, limit)
}

export async function getProductSlugs() {
  return (await getProducts()).map((product) => product.slug)
}
