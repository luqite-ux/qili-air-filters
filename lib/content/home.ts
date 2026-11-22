import { resolveDictionary } from '@/lib/i18n'
import { getSiteContent } from '@/lib/site-content/site-content'
import { applyHomeSiteContent } from './home-site-content.mjs'

export type HeroSlide = {
  id: string
  eyebrow: string
  title: string
  body: string
  cta: { label: string; href: string }
  secondary: { label: string; href: string }
  image: { src: string; alt: string }
  side: 'left' | 'right'
  tabLabel: string
}

export type Certification = {
  id: string
  standard: string
  title: string
  number: string
  subject: string
  issued: string
  validThrough: string
  issuedLabel: string
  validLabel: string
}

export type HomeContent = {
  slides: HeroSlide[]
  selection: { title: string; text: string; question: string; hint: string }[]
  airflowLayers: { id: string; stage: string; title: string; text: string }[]
  equipment: { title: string; text: string }[]
  process: { title: string; text: string }[]
  leadTimes: { id: string; title: string; window: string; min: number; max: number; text: string }[]
  faq: { group: string; items: { q: string; a: string }[] }[]
  certifications: Certification[]
}

const en: HomeContent = {
  slides: [
    {
      id: 'range',
      eyebrow: 'Product range',
      title: 'From pre-filters to HEPA, filter media to finished units',
      body: 'Panel, bag, HEPA, chemical, high-temperature and oil-mist filters, plus filter media and humidifier pads. Choose by stage, structure and media.',
      cta: { label: 'Browse products', href: '/products' },
      secondary: { label: 'Request a quote', href: '/contact' },
      image: {
        src: '/images/banners/banner-product-range.jpg',
        alt: 'Cylindrical filters, filter roll, carbon panel and filter sheets arranged on a reflective teal surface',
      },
      side: 'right',
      tabLabel: 'Product range',
    },
    {
      id: 'manufacturing',
      eyebrow: 'Manufacturing and customization',
      title: 'Made to your dimensions, media and frame',
      body: 'Media production, pleating, framing and assembly in Kunshan. Send a drawing, a sample or a size list and we plan the build with you.',
      cta: { label: 'See our capabilities', href: '/capabilities' },
      secondary: { label: 'Send a drawing', href: '/contact' },
      image: {
        src: '/images/banners/banner-custom-manufacturing.jpg',
        alt: 'Layered filter media, activated carbon granules, a filter media roll and production machine on a light blue background',
      },
      side: 'left',
      tabLabel: 'Custom manufacturing',
    },
    {
      id: 'application',
      eyebrow: 'Application-fit inquiry',
      title: 'Tell us where the air needs to be cleaner',
      body: 'Describe the process, airflow and space. We match filter stage, media and frame to the application and quote against your requirement.',
      cta: { label: 'Start an inquiry', href: '/contact' },
      secondary: { label: 'Explore applications', href: '/applications' },
      image: {
        src: '/images/banners/banner-fiber-media.jpg',
        alt: 'Bundle of white filter fibres with glowing airflow curves on a blue gradient',
      },
      side: 'left',
      tabLabel: 'Application fit',
    },
  ],
  selection: [
    {
      title: 'Operating conditions',
      text: 'Start from the air itself: what it carries, how fast it moves and how hot or humid it is.',
      question: 'What is in the air?',
      hint: 'Dust, oil mist, gas or odour · airflow · temperature range · humidity',
    },
    {
      title: 'Dimensions',
      text: 'Give the housing or grid the filter must fit, including frame depth and any clearance.',
      question: 'What must it fit?',
      hint: 'Width × height × depth · face size · installation direction',
    },
    {
      title: 'Media and frame',
      text: 'Pick the media family, pleat or pocket structure and frame material for the stage.',
      question: 'How is it built?',
      hint: 'Media type · pleat or pocket layout · frame material · sealing',
    },
    {
      title: 'Application',
      text: 'Name the process or space so stages can be balanced across the whole filtration train.',
      question: 'Where does it work?',
      hint: 'Cleanroom, laboratory, coating booth, HVAC terminal, appliance',
    },
  ],
  airflowLayers: [
    {
      id: 'pre',
      stage: 'Stage 01',
      title: 'Pre-filter',
      text: 'Holds back lint and coarse dust so the finer stages behind it are protected.',
    },
    {
      id: 'bag',
      stage: 'Stage 02',
      title: 'Medium-efficiency bag filter',
      text: 'Pockets give a large media surface for finer dust across the middle stage.',
    },
    {
      id: 'hepa',
      stage: 'Stage 03',
      title: 'HEPA media',
      text: 'Fine-fibre media for the smallest particles in controlled environments.',
    },
    {
      id: 'chem',
      stage: 'Stage 04',
      title: 'Chemical media',
      text: 'Activated carbon or chemical media for gaseous contaminants and odour.',
    },
  ],
  equipment: [
    { title: 'Meltblown equipment', text: 'Fibre media production for filtration layers.' },
    { title: 'Nonwoven equipment', text: 'Base and support media for filters and cotton.' },
    { title: 'Pleating equipment', text: 'Forms pleated packs for panel and HEPA formats.' },
    { title: 'Bag-filter equipment', text: 'Cuts and joins pocket media for bag filters.' },
    { title: 'Frame equipment', text: 'Prepares frames to the sizes you specify.' },
    { title: 'Gluing equipment', text: 'Sets media packs into frames and casings.' },
    { title: 'Welding equipment', text: 'Joins pockets, headers and fittings.' },
    { title: 'Assembly equipment', text: 'Brings media, frames and fittings together.' },
  ],
  process: [
    { title: 'Requirement', text: 'Share the application, dimensions, quantity and any drawing or sample.' },
    { title: 'Selection', text: 'We propose filter stage, media and frame against your conditions.' },
    { title: 'Sample and confirmation', text: 'Specification, drawing and sample are confirmed with you.' },
    { title: 'Production planning', text: 'Materials and workshop time are scheduled for the confirmed order.' },
    { title: 'Delivery', text: 'Packing and dispatch are arranged to your agreed terms.' },
  ],
  leadTimes: [
    {
      id: 'media',
      title: 'Filter media, container orders',
      window: '7–10 days',
      min: 7,
      max: 10,
      text: 'Roll goods for container quantities.',
    },
    {
      id: 'primary',
      title: 'Primary and medium-efficiency filters',
      window: '10–15 days',
      min: 10,
      max: 15,
      text: 'Panel, pleated and bag formats.',
    },
    {
      id: 'hepa',
      title: 'HEPA filters',
      window: '20–25 days',
      min: 20,
      max: 25,
      text: 'Framed HEPA panels and units.',
    },
  ],
  faq: [
    {
      group: 'Specifications and customization',
      items: [
        {
          q: 'Can you make a filter to my own dimensions?',
          a: 'Yes. Send a drawing, a size list or a sample. We confirm media, frame and structure with you before production.',
        },
        {
          q: 'What information helps you quote fastest?',
          a: 'The application, dimensions, quantity, target filter stage and any temperature, humidity or contaminant details.',
        },
        {
          q: 'Do you supply filter media without converting it into filters?',
          a: 'Yes. Meltblown and nonwoven media and filter cotton can be supplied in rolls or cut to size.',
        },
      ],
    },
    {
      group: 'MOQ and samples',
      items: [
        {
          q: 'What is the minimum order quantity?',
          a: 'It depends on product type and specification. Tell us your target quantity and we confirm what is practical for that item.',
        },
        {
          q: 'Can I request a sample first?',
          a: 'Sample arrangements depend on the product. Ask in your inquiry and we confirm what can be prepared and on what terms.',
        },
      ],
    },
    {
      group: 'Ordering and lead time',
      items: [
        {
          q: 'How long does production take?',
          a: 'We give planning references by product family on this page. Firm timing is confirmed once specification and quantity are agreed.',
        },
        {
          q: 'How do we place an order?',
          a: 'Send an inquiry, confirm specification and quotation, then production is planned for the confirmed order.',
        },
      ],
    },
    {
      group: 'Inspection',
      items: [
        {
          q: 'Can we agree inspection requirements in advance?',
          a: 'Yes. Raise inspection or documentation needs in your inquiry so they are discussed during order confirmation.',
        },
        {
          q: 'Which management-system certificates do you hold?',
          a: 'ISO 9001:2015, ISO 14001:2015 and ISO 45001:2018. Details are shown in the certification section and on the Quality page.',
        },
      ],
    },
  ],
  certifications: [
    {
      id: 'iso-9001',
      standard: 'ISO 9001:2015',
      title: 'Quality management system',
      number: '29526Q07641R001',
      subject: 'Quality management',
      issued: '2026-09-16',
      validThrough: '2029-09-15',
      issuedLabel: '16 Sep 2026',
      validLabel: '15 Sep 2029',
    },
    {
      id: 'iso-14001',
      standard: 'ISO 14001:2015',
      title: 'Environmental management system',
      number: '29526E07642R001',
      subject: 'Environmental management',
      issued: '2026-09-16',
      validThrough: '2029-09-15',
      issuedLabel: '16 Sep 2026',
      validLabel: '15 Sep 2029',
    },
    {
      id: 'iso-45001',
      standard: 'ISO 45001:2018',
      title: 'Occupational health and safety management system',
      number: '29526S07643R001',
      subject: 'Occupational health and safety management',
      issued: '2026-09-16',
      validThrough: '2029-09-15',
      issuedLabel: '16 Sep 2026',
      validLabel: '15 Sep 2029',
    },
  ],
}

const dictionaries: Record<string, HomeContent> = { en }

export async function getHomeContent(locale: string): Promise<HomeContent> {
  const fallback = resolveDictionary(dictionaries, locale)
  if (!process.env.SITE_CONTENT_INTEGRATION_KEY || !process.env.SITE_CONTENT_DOMAIN) return fallback
  const snapshot = await getSiteContent(locale)
  return applyHomeSiteContent(fallback, snapshot) as HomeContent
}
