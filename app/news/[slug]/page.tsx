import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/layout/page-hero'
import { CtaBand } from '@/components/layout/cta-band'
import { getArticle, getArticles } from '@/lib/repositories/news'

type Params = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getArticles()).map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) return {}
  return { title: article.title, description: article.excerpt, alternates: { canonical: `/news/${article.slug}` } }
}

const dateFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) notFound()

  return (
    <>
      <PageHero
        eyebrow={dateFormat.format(new Date(article.publishedAt))}
        title={article.title}
        lead={article.excerpt}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'News', href: '/news' }, { label: article.title }]}
      />
      <article className="container-x py-14 lg:py-20">
        {article.coverImage && (
          <Image src={article.coverImage.src} alt={article.coverImage.alt} width={article.coverImage.width} height={article.coverImage.height} sizes="(min-width:1024px) 960px, 92vw" priority className="mx-auto mb-10 h-auto w-full max-w-4xl rounded-lg border border-border" />
        )}
        <div className="mx-auto max-w-2xl space-y-5 text-lg leading-relaxed">
          {article.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>
      <CtaBand title="Have a similar requirement?" text="Send your dimensions and application and we will reply by email." />
    </>
  )
}
