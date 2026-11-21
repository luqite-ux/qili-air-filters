import { DEFAULT_LOCALE, resolveLocalized, type Localized } from '@/lib/i18n'

export type ArticleView = {
  slug: string
  title: string
  excerpt: string
  body: string[]
  publishedAt: string
  coverImage?: { src: string; alt: string; width: number; height: number }
}

type RawArticle = {
  slug: string
  title: Localized
  excerpt: Localized
  body: Localized<string[]>
  publishedAt: string
  coverImage?: { src: string; alt: Localized; width: number; height: number }
}

/* Integration boundary: replace with tenant-scoped articles. No articles are published yet. */
const rawArticles: RawArticle[] = []

function toView(a: RawArticle, locale: string): ArticleView {
  return {
    slug: a.slug,
    title: resolveLocalized(a.title, locale),
    excerpt: resolveLocalized(a.excerpt, locale),
    body: resolveLocalized(a.body, locale),
    publishedAt: a.publishedAt,
    coverImage: a.coverImage ? { ...a.coverImage, alt: resolveLocalized(a.coverImage.alt, locale) } : undefined,
  }
}

export async function getArticles(locale: string = DEFAULT_LOCALE) {
  return rawArticles
    .map((a) => toView(a, locale))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export async function getArticle(slug: string, locale: string = DEFAULT_LOCALE) {
  const found = rawArticles.find((a) => a.slug === slug)
  return found ? toView(found, locale) : null
}
