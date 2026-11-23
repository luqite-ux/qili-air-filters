import 'server-only'
import { unstable_cache } from 'next/cache'
import { getServerDatabase, getTenantId } from '@/lib/supabase/server'

const pending = new Map<string, Promise<unknown>>()
const retryAfter = new Map<string, number>()

async function singleFlight<T>(key: string, read: () => Promise<T>): Promise<T> {
  const active = pending.get(key)
  if (active) return active as Promise<T>
  if ((retryAfter.get(key) ?? 0) > Date.now()) throw new Error('Public catalogue temporarily unavailable')
  const work = read().catch(error => {
    retryAfter.set(key, Date.now() + 120_000)
    throw error
  }).finally(() => pending.delete(key))
  pending.set(key, work)
  return work
}

export const readPublicCatalog = unstable_cache(async (tenantId: string) => singleFlight(`catalog:${tenantId}`, async () => {
  const db = getServerDatabase()
  if (!db || tenantId !== getTenantId()) throw new Error('Catalogue tenant configuration missing')
  const signal = AbortSignal.timeout(8000)
  const [products, categories] = await Promise.all([
    db.from('products').select('slug,category_slug,name,name_en,name_i18n,description,description_en,description_i18n,overview,overview_en,overview_i18n,features,features_i18n,image_url,specs,extra_data,sort_order').eq('tenant_id', tenantId).eq('is_active', true).order('sort_order').order('id').abortSignal(signal),
    db.from('product_categories').select('slug,name,name_en,name_i18n,description,description_en,description_i18n,sort_order').eq('tenant_id', tenantId).eq('is_active', true).order('sort_order').order('id').abortSignal(signal),
  ])
  if (products.error || categories.error) throw new Error('Public catalogue read failed')
  console.info(JSON.stringify({ event: 'qili_catalog_origin_read', tenantId, queries: 2 }))
  return { products: products.data, categories: categories.data }
}), ['qili-public-catalog-v1'], { revalidate: 300, tags: ['qili-catalog'] })

export const readPublicSettings = unstable_cache(async (tenantId: string) => singleFlight(`settings:${tenantId}`, async () => {
  const db = getServerDatabase()
  if (!db || tenantId !== getTenantId()) throw new Error('Settings tenant configuration missing')
  const { data, error } = await db.from('tenants').select('domain,contact_email,public_contact_email,contact_phone,contact_address_i18n,extra_settings').eq('id', tenantId).abortSignal(AbortSignal.timeout(8000)).single()
  if (error) throw new Error('Public settings read failed')
  console.info(JSON.stringify({ event: 'qili_settings_origin_read', tenantId, queries: 1 }))
  return data
}), ['qili-public-settings-v1'], { revalidate: 300, tags: ['qili-settings'] })

export const readPublicArticles = unstable_cache(async (tenantId: string) => singleFlight(`articles:${tenantId}`, async () => {
  const db = getServerDatabase()
  if (!db || tenantId !== getTenantId()) throw new Error('Article tenant configuration missing')
  const { data, error } = await db.from('articles').select('slug,title_i18n,excerpt_i18n,content_i18n,featured_image,published_at,sort_order').eq('tenant_id', tenantId).eq('is_published', true).order('sort_order').order('published_at', { ascending: false, nullsFirst: false }).order('id').abortSignal(AbortSignal.timeout(8000))
  if (error) throw new Error('Public articles read failed')
  console.info(JSON.stringify({ event: 'qili_articles_origin_read', tenantId, queries: 1 }))
  return data
}), ['qili-public-articles-v1'], { revalidate: 300, tags: ['qili-articles'] })
