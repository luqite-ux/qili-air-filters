import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHero } from '@/components/layout/page-hero'
import { CtaBand } from '@/components/layout/cta-band'
import { Reveal } from '@/components/motion/reveal'
import { getHomeContent } from '@/lib/content/home'
import { DEFAULT_LOCALE } from '@/lib/i18n'
import { getSiteContent } from '@/lib/site-content/site-content'
import { getQualityCopy } from '@/lib/repositories/quality-copy'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const copy = await getQualityCopy()
  return { title: copy.seoTitle, description: copy.seoDescription, alternates: { canonical: '/quality' } }
}

export default async function QualityPage() {
  const { certifications } = await getHomeContent(DEFAULT_LOCALE)
  const snapshot = await getSiteContent(DEFAULT_LOCALE)
  const copy = await getQualityCopy()
  const registration = snapshot?.pages.find(page=>page.key==='quality')?.modules.find(module=>module.key==='registration')?.values as {title:string;image:{url:string;alt:string}} | undefined
  const certificatePage = (id:string) => id === 'iso-9001' ? 3 : id === 'iso-14001' ? 1 : 5

  return (
    <>
      <PageHero
        eyebrow={copy.heroEyebrow}
        title={copy.heroTitle}
        lead={copy.heroLead}
        crumbs={[{ label: 'Home', href: '/' }, { label: copy.heroEyebrow }]}
      />

      <section className="container-x py-14 lg:py-20" aria-labelledby="certs" data-hq-content-version={registration ? snapshot?.version : undefined}>
        <h2 id="certs" className="sr-only">
          {copy.certificationsTitle}
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
                      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{copy.certificateNumberLabel}</dt>
                      <dd className="mt-1 break-all font-mono text-sm font-bold">{c.number}</dd>
                    </div>
                    <div className="bg-white p-4">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{copy.issuedLabel}</dt>
                      <dd className="mt-1 text-sm font-bold">
                        <time dateTime={c.issued}>{c.issuedLabel}</time>
                      </dd>
                    </div>
                    <div className="bg-white p-4">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{copy.validThroughLabel}</dt>
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
                    <a href={c.chinese ?? `/images/certificates/qili-certificate-${certificatePage(c.id)}.jpg`} target="_blank" rel="noopener noreferrer">{copy.chineseScanLabel}</a>
                    <a href={c.english ?? `/images/certificates/qili-certificate-${certificatePage(c.id)+1}.jpg`} target="_blank" rel="noopener noreferrer">{copy.englishScanLabel}</a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </section>

      {registration && <section className="container-x pb-16"><Reveal><h2 className="text-3xl font-extrabold">{registration.title}</h2><p className="mt-4 text-muted-foreground">{copy.registrationLead}</p><a className="mt-6 inline-flex min-h-11 items-center font-bold text-primary underline" href={registration.image.url} target="_blank" rel="noopener noreferrer">{copy.registrationLinkLabel}</a></Reveal></section>}
      <section className="border-t border-border bg-mist/60 py-14 lg:py-20" aria-labelledby="inspection">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">{copy.inspectionEyebrow}</p>
            <h2 id="inspection" className="mt-3 max-w-2xl text-3xl font-extrabold sm:text-4xl">
              {copy.inspectionTitle}
            </h2>
          </Reveal>
          <ol className="mt-10 grid gap-6 md:grid-cols-4">
            {copy.steps.map((s, i) => (
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
        <CtaBand title={copy.ctaTitle} text={copy.ctaText} />
      </div>
    </>
  )
}
