import { Mail, MapPin, Phone } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/layout/section-heading'
import { RfqForm } from '@/components/inquiry/rfq-form'
import { getSiteSettings } from '@/lib/site'

export async function RfqSection() {
  const s = await getSiteSettings()
  return (
    <section id="rfq" aria-labelledby="rfq-title" className="section-pad relative scroll-mt-20 overflow-hidden bg-mist">
      <div aria-hidden className="lab-grid absolute inset-0" />
      <div className="container-x relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading eyebrow="Request a quote" title={<span id="rfq-title">Send your specification, get a considered quotation</span>}>
              {s.legalName} manufactures air filters and filter media in Kunshan, Jiangsu. Tell us what you need to filter and the size it must fit.
            </SectionHeading>
          </div>
          <ul className="grid gap-5 text-sm sm:grid-cols-2 lg:col-span-6">
            <Reveal as="li" index={0} className="flex gap-3">
              <Mail className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              <span>
                <span className="eyebrow block">Email</span>
                <a href={`mailto:${s.email}`} className="inline-flex min-h-8 items-center font-semibold hover:text-primary">{s.email}</a>
              </span>
            </Reveal>
            <Reveal as="li" index={1} className="flex gap-3">
              <Phone className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              <span>
                <span className="eyebrow block">Phone</span>
                {s.phones.map((p) => (
                  <a key={p.href} href={p.href} className="block min-h-6 font-semibold hover:text-primary">{p.display}</a>
                ))}
              </span>
            </Reveal>
            <Reveal as="li" index={2} className="flex gap-3 sm:col-span-2">
              <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              <span>
                <span className="eyebrow block">Registered address</span>
                <span className="font-semibold">{s.address}</span>
              </span>
            </Reveal>
          </ul>
        </div>

        <Reveal variant="scale" className="mt-12">
          <RfqForm captchaScope="home-rfq" sourcePath="/" />
        </Reveal>
      </div>
    </section>
  )
}
