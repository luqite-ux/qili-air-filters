import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { ProductVisual } from '@/components/products/product-visual'
import type { ProductView, CategoryView } from '@/lib/repositories/products'

export function ProductCard({ product, category, index = 0 }: { product: ProductView; category?: CategoryView; index?: number }) {
  return (
    <Reveal index={index} className="h-full">
      <Link
        href={`/products/${product.slug}`}
        className="lift group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card"
      >
        <ProductVisual image={product.images[0]} kind={product.visual} sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 92vw" className="border-b border-border" />
        <div className="flex flex-1 flex-col p-5">
          {category && <p className="eyebrow">{category.role}</p>}
          <h3 className="mt-2 text-lg font-bold leading-snug">{product.name}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{product.summary}</p>
          <span className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-primary">
            View details
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </span>
        </div>
      </Link>
    </Reveal>
  )
}
