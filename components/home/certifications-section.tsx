import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, BadgeCheck } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/layout/section-heading'
import type { Certification } from '@/lib/content/home'

export function CertificationItem({ cert, index = 0 }: { cert: Certification; index?: number }) {
  return (
    <Reveal as="li" index={index} id={cert.id} className="scroll-mt-28 border-t border-border py-8 first:border-t-0 sm:py-10">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
        <div className="flex items-start gap-4 lg:col-span-5">
          <BadgeCheck className="mt-1.5 size-6 shrink-0 text-primary" aria-hidden />
          <div>
            <h3 className="text-2xl font-extrabold sm:text-3xl">{cert.standard}</h3>
            <p className="mt-1 text-muted-foreground">{cert.title}</p>
          </div>
        </div>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm lg:col-span-5">
          <div className="col-span-2">
            <dt className="eyebrow">Certificate number</dt>
            <dd className="mt-1 font-mono text-base">{cert.number}</dd>
          </div>
          <div>
            <dt className="eyebrow">Issued</dt>
            <dd className="mt-1 font-semibold"><time dateTime={cert.issued}>{cert.issuedLabel}</time></dd>
          </div>
          <div>
            <dt className="eyebrow">Valid through</dt>
            <dd className="mt-1 font-semibold"><time dateTime={cert.validThrough}>{cert.validLabel}</time></dd>
          </div>
          <div className="col-span-2">
            <dt className="eyebrow">Scope</dt>
            <dd className="mt-1 font-semibold">{cert.subject}</dd>
          </div>
        </dl>
        <div className="lg:col-span-2 lg:text-right">
          <Link href={`/quality#${cert.id}`} className="mb-3 block overflow-hidden rounded-sm border border-border bg-white">
            <Image src={`/images/certificates/qili-certificate-${index * 2 + 2}.jpg`} alt={`${cert.standard} English certificate scan`} width={850} height={1200} className="h-40 w-full object-contain" />
          </Link>
          <Link href={`/quality#${cert.id}`} className="inline-flex min-h-11 items-center gap-1.5 rounded-sm border border-input bg-white px-4 text-sm font-bold hover:bg-mist">
            View document <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </Reveal>
  )
}

export function CertificationsSection({ certifications }: { certifications: Certification[] }) {
  return (
    <section aria-labelledby="certs-title" className="section-pad bg-mist">
      <div className="container-x">
        <SectionHeading eyebrow="Certifications" title={<span id="certs-title">Three management-system certificates</span>}>
          Quality, environmental and occupational health and safety management systems, each certified independently.
        </SectionHeading>
        <ul className="layer-sheet mt-12 rounded-xl px-6 sm:px-10">
          {certifications.map((c, i) => (
            <CertificationItem key={c.id} cert={c} index={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}
