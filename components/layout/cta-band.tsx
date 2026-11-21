import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'

export function CtaBand({ title, text, href = '/contact', label = 'Request a Quote' }: { title: string; text: string; href?: string; label?: string }) {
  return (
    <section className="container-x pb-20 lg:pb-28">
      <Reveal variant="scale" className="layer-sheet relative overflow-hidden rounded-xl p-8 sm:p-12">
        <div aria-hidden className="lab-grid absolute inset-0 opacity-60" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-extrabold sm:text-3xl">{title}</h2>
            <p className="mt-3 text-muted-foreground">{text}</p>
          </div>
          <Link
            href={href}
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-sm bg-primary px-7 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {label}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </Reveal>
    </section>
  )
}
