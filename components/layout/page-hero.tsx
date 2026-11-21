import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Reveal } from '@/components/motion/reveal'

export type Crumb = { label: string; href?: string }

export function PageHero({ eyebrow, title, lead, crumbs, aside }: { eyebrow: string; title: ReactNode; lead?: ReactNode; crumbs?: Crumb[]; aside?: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div aria-hidden className="lab-grid absolute inset-0" />
      <div aria-hidden className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,oklch(0.9_0.05_210/0.55),transparent)]" />
      <div className="container-x relative grid gap-10 py-14 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-8">
          {crumbs && (
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
                {crumbs.map((c, i) => (
                  <li key={c.label} className="flex items-center gap-1">
                    {c.href ? (
                      <Link href={c.href} className="inline-flex min-h-8 items-center hover:text-foreground">
                        {c.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="font-semibold text-foreground">
                        {c.label}
                      </span>
                    )}
                    {i < crumbs.length - 1 && <ChevronRight className="size-3.5" aria-hidden />}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <Reveal variant="fade">
            <p className="eyebrow flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-air" />
              {eyebrow}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">{title}</h1>
          </Reveal>
          {lead && (
            <Reveal delay={160}>
              <div className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{lead}</div>
            </Reveal>
          )}
        </div>
        {aside && (
          <Reveal variant="left" delay={200} className="lg:col-span-4 lg:self-end">
            {aside}
          </Reveal>
        )}
      </div>
    </section>
  )
}
