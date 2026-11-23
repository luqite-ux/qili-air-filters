import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, FileText } from 'lucide-react'
import { PageHero } from '@/components/layout/page-hero'
import { CtaBand } from '@/components/layout/cta-band'
import { Reveal } from '@/components/motion/reveal'
import { getHomeContent } from '@/lib/content/home'
import { DEFAULT_LOCALE } from '@/lib/i18n'
import { getSiteContent } from '@/lib/site-content/site-content'

export const metadata: Metadata = {
  title: 'Quality and Certifications',
  description: 'ISO 9001:2015, ISO 14001:2015 and ISO 45001:2018 management system certifications and the inspection steps behind Qili air filters.',
  alternates: { canonical: '/quality' },
}

const steps = [
  { title: 'Specification check', text: 'Dimensions, media, frame and application are confirmed before production starts.' },
  { title: 'Material check', text: 'Incoming media and frame materials are checked against the agreed specification.' },
  { title: 'In-process check', text: 'Pleating, gluing and assembly are checked as work proceeds.' },
  { title: 'Final inspection', text: 'Finished filters are inspected for dimensions and appearance before packing.' },
]

export default async function QualityPage() {
  const { certifications } = await getHomeContent(DEFAULT_LOCALE)
  const snapshot = await getSiteContent(DEFAULT_LOCALE)
  const registration = snapshot?.pages.find(page=>page.key==='quality')?.modules.find(module=>module.key==='registration')?.values as {title:string;image:{url:string;alt:string}} | undefined
  const certificatePage = (id:string) => id === 'iso-9001' ? 3 : id === 'iso-14001' ? 1 : 5

  return (
    <>
      <PageHero
        eyebrow="Quality"
        title="Three management system certifications"
        lead="Qili holds ISO 9001, ISO 14001 and ISO 45001 certifications. Each is a separate certificate with its own number."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Quality' }]}
      />

      <section className="container-x py-14 lg:py-20" aria-labelledby="certs" data-hq-content-version={registration ? snapshot?.version : undefined}>
        <h2 id="certs" className="sr-only">
          Certifications
        </h2>
        <ul className="space-y-8">
          {certifications.map((c, i) => (
            <Reveal as="li" key={c.id} index={i} id={c.id} className="scroll-mt-28">
              <article className="layer-sheet grid gap-8 rounded-xl p-6 sm:p-10 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <p className="eyebrow">{c.standard}</p>
                  <h3 className="mt-3 text-2xl font-extrabold sm:text-3xl">{c.title}</h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{c.subject}</p>
                  <dl className="mt-6 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
                    <div className="bg-white p-4">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Certificate no.</dt>
                      <dd className="mt-1 break-all font-mono text-sm font-bold">{c.number}</dd>
                    </div>
                    <div className="bg-white p-4">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Issued</dt>
                      <dd className="mt-1 text-sm font-bold">
                        <time dateTime={c.issued}>{c.issuedLabel}</time>
                      </dd>
                    </div>
                    <div className="bg-white p-4">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Valid through</dt>
                      <dd className="mt-1 text-sm font-bold">
                        <time dateTime={c.validThrough}>{c.validLabel}</time>
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="flex flex-col gap-4 lg:col-span-5">
                  <a href={c.english ?? `/images/certificates/qili-certificate-${certificatePage(c.id)+1}.jpg`} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-lg border border-border bg-white">
                    <Image src={c.english ?? `/images/certificates/qili-certificate-${certificatePage(c.id)+1}.jpg`} alt={`${c.standard} English certificate scan`} width={850} height={1200} className="h-auto w-full" />
                  </a>
                  <div className="flex gap-4 text-sm font-bold text-primary">
                    <a href={c.chinese ?? `/images/certificates/qili-certificate-${certificatePage(c.id)}.jpg`} target="_blank" rel="noopener noreferrer">View Chinese scan</a>
                    <a href={c.english ?? `/images/certificates/qili-certificate-${certificatePage(c.id)+1}.jpg`} target="_blank" rel="noopener noreferrer">View English scan</a>
                  </div>
                </div>
                <div className="hidden">
                  <div className="flex items-start gap-4">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-sm bg-white text-primary">
                      <FileText className="size-6" aria-hidden />
                    </span>
                    <div>
                      <p className="font-bold">Certificate document</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Available in English and Chinese pages. Ask us and we will send the document for {c.standard}.</p>
                    </div>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-input bg-white px-5 text-sm font-bold hover:bg-white/70"
                  >
                    Request document <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </section>

      {registration && <section className="container-x pb-16"><Reveal><h2 className="text-3xl font-extrabold">{registration.title}</h2><p className="mt-4 text-muted-foreground">View our Chinese company registration document.</p><a className="mt-6 inline-flex min-h-11 items-center font-bold text-primary underline" href={registration.image.url} target="_blank" rel="noopener noreferrer">View business licence</a></Reveal></section>}
      <section className="border-t border-border bg-mist/60 py-14 lg:py-20" aria-labelledby="inspection">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">Inspection</p>
            <h2 id="inspection" className="mt-3 max-w-2xl text-3xl font-extrabold sm:text-4xl">
              How an order is checked
            </h2>
          </Reveal>
          <ol className="mt-10 grid gap-6 md:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} index={i} className="border-t-2 border-air pt-5">
                <span className="text-sm font-bold text-air-ink">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <div className="pt-16 lg:pt-20">
        <CtaBand title="Need inspection requirements on your order?" text="Tell us what you need to check and we will agree it before production." />
      </div>
    </>
  )
}
