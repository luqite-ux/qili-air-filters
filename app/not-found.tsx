import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="eyebrow">Page not found</p>
      <h1 className="mt-3 max-w-2xl text-4xl font-extrabold sm:text-5xl">This page is not available</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">The address may have changed. Return to the home page or browse the product range.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="inline-flex min-h-12 items-center justify-center rounded-sm bg-primary px-6 text-sm font-bold text-primary-foreground hover:bg-primary/90">
          Home
        </Link>
        <Link href="/products" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-input bg-white px-6 text-sm font-bold hover:bg-mist">
          Browse products <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </section>
  )
}
