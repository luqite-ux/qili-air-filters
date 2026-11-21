import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { CategoryView } from '@/lib/repositories/products'

export function CategoryFilter({ categories, active, counts }: { categories: CategoryView[]; active?: string; counts: Record<string, number> }) {
  const total = Object.values(counts).reduce((a, b) => a + b, 0)
  const items = [{ slug: '', name: 'All families', count: total }, ...categories.map((c) => ({ slug: c.slug, name: c.name, count: counts[c.slug] ?? 0 }))]
  return (
    <nav aria-label="Filter products by family">
      <ul className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0">
        {items.map((item) => {
          const selected = (active ?? '') === item.slug
          return (
            <li key={item.slug || 'all'} className="shrink-0">
              <Link
                href={item.slug ? `/products?category=${item.slug}` : '/products'}
                aria-current={selected ? 'page' : undefined}
                scroll={false}
                className={cn(
                  'inline-flex min-h-11 items-center gap-2 rounded-sm border px-4 text-sm font-semibold transition-colors',
                  selected ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-white hover:border-air hover:bg-mist',
                )}
              >
                {item.name}
                <span className={cn('text-xs', selected ? 'text-primary-foreground/80' : 'text-muted-foreground')}>{item.count}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
