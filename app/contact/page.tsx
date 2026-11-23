import type { Metadata } from 'next'
import { Mail, MapPin, Phone } from 'lucide-react'
import { PageHero } from '@/components/layout/page-hero'
import { RfqForm } from '@/components/inquiry/rfq-form'
import { Reveal } from '@/components/motion/reveal'
import { getPublishedSiteSettings } from '@/lib/site-settings'
import { getContactCopy } from '@/lib/repositories/contact-copy'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const copy = await getContactCopy()
  return { title: copy.seoTitle, description: copy.seoDescription, alternates: { canonical: '/contact' } }
}

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ product?: string; application?: string }> }) {
  const { product, application } = await searchParams
  const site = await getPublishedSiteSettings()
  const copy = await getContactCopy()

  return (
    <>
      <PageHero
        eyebrow={copy.heroEyebrow}
        title={copy.heroTitle}
        lead={copy.heroLead}
        crumbs={[{ label: 'Home', href: '/' }, { label: copy.heroEyebrow }]}
      />

      <section className="container-x py-12 lg:py-16" aria-labelledby="contact-details">
        <h2 id="contact-details" className="sr-only">
          {copy.detailsTitle}
        </h2>
        <ul className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
          <Reveal as="li" index={0} className="flex gap-4 bg-white p-6">
            <Mail className="mt-1 size-5 shrink-0 text-primary" aria-hidden />
            <div>
              <p className="text-sm font-semibold text-muted-foreground">{copy.emailLabel}</p>
              <a href={`mailto:${site.email}`} className="mt-1 inline-flex min-h-11 items-center break-all font-bold hover:text-primary">
                {site.email}
              </a>
            </div>
          </Reveal>
          <Reveal as="li" index={1} className="flex gap-4 bg-white p-6">
            <Phone className="mt-1 size-5 shrink-0 text-primary" aria-hidden />
            <div>
              <p className="text-sm font-semibold text-muted-foreground">{copy.phoneLabel}</p>
              {site.phones.map((p) => (
                <a key={p.href} href={p.href} className="flex min-h-11 items-center font-bold hover:text-primary">
                  {p.display}
                </a>
              ))}
            </div>
          </Reveal>
          <Reveal as="li" index={2} className="flex gap-4 bg-white p-6">
            <MapPin className="mt-1 size-5 shrink-0 text-primary" aria-hidden />
            <div>
              <p className="text-sm font-semibold text-muted-foreground">{copy.addressLabel}</p>
              <address className="mt-1 not-italic leading-relaxed">
                {site.addressLines.map((line) => (
                  <span key={line} className="block font-bold">
                    {line}
                  </span>
                ))}
              </address>
            </div>
          </Reveal>
        </ul>
      </section>

      <section className="border-t border-border bg-mist/60 py-14 lg:py-20" aria-labelledby="rfq-title">
        <div className="container-x">
          <Reveal>
            <h2 id="rfq-title" className="max-w-3xl text-3xl font-extrabold sm:text-4xl">
              {copy.formTitle}
            </h2>
          </Reveal>
          <div className="mt-8">
            <RfqForm captchaScope="contact-page" sourcePath="/contact" defaultProduct={product} defaultApplication={application} />
          </div>
        </div>
      </section>
    </>
  )
}
