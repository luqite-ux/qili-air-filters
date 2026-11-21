import Link from 'next/link'
import { Logo } from '@/components/layout/logo'
import { site, mainNav } from '@/lib/site'
import { getCategories } from '@/lib/repositories/products'

export async function SiteFooter() {
  const categories = await getCategories()
  return (
    <footer className="relative border-t border-border bg-mist">
      <div className="container-x grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo size={56} />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {site.legalName}
            <br />
            <span lang="zh-Hans">{site.legalNameZh}</span>
          </p>
          <address className="mt-5 text-sm not-italic leading-relaxed text-foreground/80">
            {site.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </div>

        <nav aria-label="Footer pages" className="lg:col-span-2">
          <h2 className="eyebrow">Pages</h2>
          <ul className="mt-4 space-y-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-11 items-center text-sm font-medium hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="inline-flex min-h-11 items-center text-sm font-medium hover:text-primary">
                Request a Quote
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Product families" className="lg:col-span-3">
          <h2 className="eyebrow">Product families</h2>
          <ul className="mt-4 space-y-1">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/products?category=${c.slug}`} className="inline-flex min-h-11 items-center text-sm hover:text-primary">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="eyebrow">Contact</h2>
          <ul className="mt-4 space-y-1 text-sm">
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center font-semibold text-primary hover:underline">
                {site.email}
              </a>
            </li>
            {site.phones.map((p) => (
              <li key={p.href}>
                <a href={p.href} className="inline-flex min-h-11 items-center hover:text-primary">
                  <span className="mr-3 w-14 text-muted-foreground">{p.label}</span>
                  {p.display}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">ISO 9001:2015 · ISO 14001:2015 · ISO 45001:2018</p>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.legalName}</p>
          <p>{site.domain}</p>
        </div>
      </div>
    </footer>
  )
}
