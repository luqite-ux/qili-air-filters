import { DEFAULT_LOCALE, resolveLocalized, type Localized } from '@/lib/i18n'
import { getTenantId } from '@/lib/supabase/server'
import { readPublicCatalog } from './public-catalog'

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

export async function getCategories(locale: string = DEFAULT_LOCALE): Promise<CategoryView[]> {
  const tenantId = getTenantId()
  if (!tenantId) throw new Error('Catalogue tenant is not configured')
  const { categories: data } = await readPublicCatalog(tenantId)
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
  const tenantId = getTenantId()
  if (!tenantId) throw new Error('Catalogue tenant is not configured')
  const catalog = await readPublicCatalog(tenantId)
  const data = catalog.products.filter(row => !categorySlug || row.category_slug === categorySlug)
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
