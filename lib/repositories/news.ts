import { DEFAULT_LOCALE, resolveLocalized, type Localized } from '@/lib/i18n'
import sanitizeHtml from 'sanitize-html'
import { getTenantId } from '@/lib/supabase/server'
import { readPublicArticles } from './public-catalog'

export type ArticleView = {
  slug: string
  title: string
  excerpt: string
  body: string[]
  bodyHtml?: string
  publishedAt: string
  coverImage?: { src: string; alt: string; width: number; height: number }
}

export async function getArticles(locale: string = DEFAULT_LOCALE) {
  const tenant = getTenantId()
  if (!tenant) throw new Error('Article tenant is not configured')
  const rows = await readPublicArticles(tenant)
  return rows.map((row): ArticleView => {
    const title = resolveLocalized(row.title_i18n as Localized, locale)
    const content = resolveLocalized(row.content_i18n as Localized, locale)
    return { slug: row.slug, title, excerpt: resolveLocalized(row.excerpt_i18n as Localized, locale), body: [], bodyHtml: sanitizeHtml(content, { allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img'], allowedAttributes: { a: ['href', 'title'], img: ['src', 'alt', 'width', 'height'] }, allowedSchemes: ['https', 'mailto', 'tel'], allowProtocolRelative: false }), publishedAt: row.published_at || '', coverImage: row.featured_image ? { src: row.featured_image, alt: title, width: 1600, height: 900 } : undefined }
  })
}

export async function getArticle(slug: string, locale: string = DEFAULT_LOCALE) {
  return (await getArticles(locale)).find(article => article.slug === slug) ?? null
}
