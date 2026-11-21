import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Newspaper } from 'lucide-react'
import { PageHero } from '@/components/layout/page-hero'
import { Reveal } from '@/components/motion/reveal'
import { getArticles } from '@/lib/repositories/news'

export const metadata: Metadata = {
  title: 'News',
  description: 'Company and product news from Qili Air Filters.',
  alternates: { canonical: '/news' },
}

const dateFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })

export default async function NewsPage() {
  const articles = await getArticles()

  return (
    <>
      <PageHero eyebrow="News" title="Company and product news" lead="Updates from Qili will appear here." crumbs={[{ label: 'Home', href: '/' }, { label: 'News' }]} />

      <section className="container-x py-14 lg:py-20" aria-labelledby="news-list">
        <h2 id="news-list" className="sr-only">
          Latest news
        </h2>
        {articles.length === 0 ? (
          <Reveal variant="scale" className="layer-sheet relative overflow-hidden rounded-xl p-8 sm:p-14">
            <div aria-hidden className="lab-grid absolute inset-0 opacity-60" />
            <div className="relative mx-auto max-w-xl text-center">
              <span className="mx-auto flex size-14 items-center justify-center rounded-sm bg-mist text-primary">
                <Newspaper className="size-7" aria-hidden />
              </span>
              <p className="mt-6 text-2xl font-extrabold">No news published yet</p>
              <p className="mt-3 text-muted-foreground">While we prepare our first update, browse the product range or send us your requirement.</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/products" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-primary px-6 text-sm font-bold text-primary-foreground hover:bg-primary/90">
                  Browse products <ArrowRight className="size-4" aria-hidden />
                </Link>
                <Link href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-sm border border-input bg-white px-6 text-sm font-bold hover:bg-mist">
                  Request a Quote
                </Link>
              </div>
            </div>
          </Reveal>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((a, i) => (
              <Reveal as="li" key={a.slug} index={i} className="h-full">
                <Link href={`/news/${a.slug}`} className="lift group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card">
                  {a.coverImage && <Image src={a.coverImage.src} alt={a.coverImage.alt} width={a.coverImage.width} height={a.coverImage.height} sizes="(min-width:1024px) 30vw, (min-width:768px) 45vw, 92vw" className="aspect-[16/10] w-full object-cover" />}
                  <span className="flex flex-1 flex-col p-5">
                    <time dateTime={a.publishedAt} className="text-xs font-semibold text-muted-foreground">
                      {dateFormat.format(new Date(a.publishedAt))}
                    </time>
                    <span className="mt-2 text-lg font-bold group-hover:text-primary">{a.title}</span>
                    <span className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{a.excerpt}</span>
                    <span className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-primary">
                      Read article <ArrowRight className="size-4" aria-hidden />
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}
