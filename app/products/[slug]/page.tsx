import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Check } from 'lucide-react'
import { PageHero } from '@/components/layout/page-hero'
import { ProductGallery } from '@/components/products/product-gallery'
import { ProductVisual } from '@/components/products/product-visual'
import { ProductCard } from '@/components/products/product-card'
import { RfqForm } from '@/components/inquiry/rfq-form'
import { Reveal } from '@/components/motion/reveal'
import { getApplications } from '@/lib/repositories/applications'
import { getCategories, getProduct, getProductSlugs, getRelatedProducts } from '@/lib/repositories/products'

type Params = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getProductSlugs()).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) return {}
  return { title: product.name, description: product.summary, alternates: { canonical: `/products/${product.slug}` } }
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()
  const [categories, applications, related] = await Promise.all([getCategories(), getApplications(), getRelatedProducts(slug)])
  const category = categories.find((c) => c.slug === product.categorySlug)
  const fitApplications = applications.filter((a) => product.applicationSlugs.includes(a.slug))

  return (
    <>
      <PageHero
        eyebrow={category?.role ?? 'Product'}
        title={product.name}
        lead={product.summary}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          ...(category ? [{ label: category.name, href: `/products?category=${category.slug}` }] : []),
          { label: product.name },
        ]}
      />

      <section className="container-x grid gap-10 py-12 lg:grid-cols-12 lg:gap-14 lg:py-16" aria-labelledby="product-overview">
        <div className="lg:col-span-6">
          {product.images.length > 0 ? (
            <ProductGallery images={product.images} name={product.name} />
          ) : (
            <ProductVisual kind={product.visual} sizes="(min-width:1024px) 46vw, 92vw" priority className="rounded-lg border border-border" />
          )}
        </div>

        <div className="lg:col-span-6">
          <Reveal>
            <h2 id="product-overview" className="text-2xl font-extrabold sm:text-3xl">
              Overview
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{product.overview}</p>
          </Reveal>

          <Reveal delay={80} className="mt-8">
            <h3 className="text-lg font-bold">Structure and options</h3>
            <ul className="mt-4 space-y-3">
              {product.features.map((f) => (
                <li key={f} className="flex gap-3 text-sm leading-relaxed">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120} className="mt-8">
            <h3 className="text-lg font-bold">Specifications</h3>
            <dl className="mt-4 divide-y divide-border border-y border-border">
              {product.specs.map((s) => (
                <div key={s.label} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="text-sm font-semibold text-muted-foreground">{s.label}</dt>
                  <dd className="text-sm">{s.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-sm text-muted-foreground">Final dimensions, media grade and frame are confirmed with you before production.</p>
          </Reveal>

          <Reveal delay={160} className="mt-8">
            <Link
              href="#product-rfq"
              className="inline-flex min-h-12 items-center gap-2 rounded-sm bg-primary px-7 text-sm font-bold text-primary-foreground hover:bg-primary/90"
            >
              Request a Quote for this product <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      {fitApplications.length > 0 && (
        <section className="border-y border-border bg-mist/60 py-14" aria-labelledby="product-apps">
          <div className="container-x">
            <Reveal>
              <h2 id="product-apps" className="text-2xl font-extrabold sm:text-3xl">
                Applicable fields
              </h2>
            </Reveal>
            <ul className="mt-8 flex flex-wrap gap-3">
              {fitApplications.map((a, i) => (
                <Reveal as="li" key={a.slug} index={i}>
                  <Link href={`/applications/${a.slug}`} className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-border bg-white px-4 text-sm font-semibold hover:border-air hover:bg-mist">
                    {a.name}
                    <ArrowRight className="size-4 text-primary" aria-hidden />
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section id="product-rfq" className="container-x scroll-mt-24 py-16 lg:py-20" aria-labelledby="product-rfq-title">
        <Reveal>
          <p className="eyebrow">Request a Quote</p>
          <h2 id="product-rfq-title" className="mt-3 max-w-3xl text-3xl font-extrabold sm:text-4xl">
            Quote {product.name}
          </h2>
        </Reveal>
        <div className="mt-8">
          <RfqForm captchaScope={`product-${product.slug}`} sourcePath={`/products/${product.slug}`} defaultProduct={category?.name} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-x pb-20 lg:pb-28" aria-labelledby="related-products">
          <Reveal>
            <h2 id="related-products" className="text-2xl font-extrabold sm:text-3xl">
              Related products
            </h2>
          </Reveal>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <li key={p.slug} className="h-full">
                <ProductCard product={p} category={categories.find((c) => c.slug === p.categorySlug)} index={i} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}
