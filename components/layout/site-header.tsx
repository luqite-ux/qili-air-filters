import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Logo } from '@/components/layout/logo'
import { NavLinks } from '@/components/layout/nav-links'
import { MobileNav } from '@/components/layout/mobile-nav'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="container-x flex h-[4.25rem] items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Primary" className="hidden xl:block">
          <NavLinks />
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden min-h-11 items-center gap-2 rounded-sm bg-primary px-5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 sm:inline-flex"
          >
            Request a Quote
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
