import type { MetadataRoute } from 'next'
import { getApplicationSlugs } from '@/lib/repositories/applications'
import { getArticles } from '@/lib/repositories/news'
import { getProductSlugs } from '@/lib/repositories/products'

const base = 'https://qiliairfilters.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, applications, articles] = await Promise.all([getProductSlugs(), getApplicationSlugs(), getArticles()])
  const fixed = ['', '/products', '/applications', '/capabilities', '/quality', '/about', '/news', '/contact']
  return [
    ...fixed.map((p) => ({ url: `${base}${p}` })),
    ...products.map((s) => ({ url: `${base}/products/${s}` })),
    ...applications.map((s) => ({ url: `${base}/applications/${s}` })),
    ...articles.map((a) => ({ url: `${base}/news/${a.slug}`, lastModified: a.publishedAt })),
  ]
}
