import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/layout/section-heading'
import { ProductVisual } from '@/components/products/product-visual'
import type { CategoryView } from '@/lib/repositories/products'
import { cn } from '@/lib/utils'

export function ProductFamilies({ categories }: { categories: CategoryView[] }) {
  const featured = categories.filter((c) => c.image)
  const rest = categories.filter((c) => !c.image)

  return (
    <section aria-labelledby="families-title" className="section-pad">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Product families" title={<span id="families-title">Know the grade, the structure and the media</span>}>
            Each family has a place in the filtration train. Start with the stage you need, then narrow by structure and media.
          </SectionHeading>
          <Reveal variant="fade">
            <Link href="/products" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary hover:underline">
              All product families <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {featured.map((c, i) => (
            <Reveal as="li" key={c.slug} index={i} className={cn('lg:[&:nth-child(even)]:mt-10')}>
              <Link href={`/products?category=${c.slug}`} className="lift group flex h-full overflow-hidden rounded-lg border border-border bg-card sm:flex-col">
                <ProductVisual image={c.image} kind={c.visual} sizes="(min-width:1024px) 18vw, (min-width:640px) 45vw, 112px" className="w-28 shrink-0 border-r border-border sm:w-full sm:border-b sm:border-r-0" />
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <p className="eyebrow">{c.role}</p>
                  <h3 className="mt-2 font-bold leading-snug">{c.name}</h3>
                  <p className="mt-2 hidden flex-1 text-sm leading-relaxed text-muted-foreground sm:block">{c.summary}</p>
                  <span className="mt-3 inline-flex min-h-11 items-center gap-1 text-sm font-bold text-primary">
                    Explore <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>

        <ul className="mt-14 grid gap-x-10 border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((c, i) => (
            <Reveal as="li" key={c.slug} index={i} className="border-b border-border">
              <Link href={`/products?category=${c.slug}`} className="group flex min-h-11 items-start justify-between gap-4 py-5">
                <span>
                  <span className="eyebrow block">{c.role}</span>
                  <span className="mt-1 block font-bold group-hover:text-primary">{c.name}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{c.summary}</span>
                </span>
                <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden />
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
