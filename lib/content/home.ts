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
  chinese?: string
  english?: string
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
    "group": "Specifications and customization",
    "items": [
      {
        "q": "Can you customize products and provide OEM or ODM services?",
        "a": "Yes. We can develop sizes, materials, colours and processes to suit your requirements, and provide OEM/ODM design, sampling and bulk production based on your brand and technical requirements."
      },
      {
        "q": "What affects filter service life and replacement?",
        "a": "Service life depends on operating conditions. Typical references are 2–4 months for pre-filters, 3–6 months for medium-efficiency filters and 8–12 months for HEPA filters with upstream filters properly maintained. Differential pressure and regular technical inspection determine replacement. Pre-filters capture particles of 5 micrometres and above; selected models are washable. Medium-efficiency filters capture 1–5 micrometre particles and protect HEPA media. H13/H14 HEPA options address 0.3-micrometre particles. We can help plan spare-filter quantities."
      },
      {
        "q": "Do you supply filter media without converting it into filters? Which industries use your products?",
        "a": "Yes. Meltblown and nonwoven media and filter cotton can be supplied in rolls or cut to size. Applications include microelectronics, terminal air conditioning, biological laboratories, food and beverage production, pharmaceuticals, lithium batteries, semiconductors, hospitals, automotive painting, solar photovoltaics, membrane manufacturing, the nuclear industry, residential fresh-air systems, commercial HVAC, animal husbandry and farming."
      }
    ]
  },
  {
    "group": "MOQ and samples",
    "items": [
      {
        "q": "What is the minimum order quantity?",
        "a": "The minimum order is 500 metres for filter media, 100 units for filters and 300 pieces for HEPA filter elements."
      },
      {
        "q": "Can I request a sample first? How long do samples take, and are they approved before production?",
        "a": "Standard small samples are free, with freight payable by the recipient. Custom samples incur a sampling fee, which can be refunded or credited against a confirmed bulk order. Standard small filter-cotton samples are dispatched in 1–3 working days. Custom samples normally take 5–7 working days, depending on process complexity. Custom orders proceed to bulk production after sample approval, with the approved sample used as the material and process reference."
      }
    ]
  },
  {
    "group": "Ordering and lead time",
    "items": [
      {
        "q": "How long does production take?",
        "a": "General order planning is 12–25 days, depending on quantity and process complexity. Product-family references are 7–10 days for a standard 40-foot high-cube container of filter media, 10–15 days for pre- and medium-efficiency filters, and 20–25 days for HEPA filters. The schedule is confirmed with the order. Peak-season changes are discussed in advance; expedited production can be considered for urgent orders."
      },
      {
        "q": "How do we place an order? How are prices, packaging and trade terms agreed?",
        "a": "Send an inquiry, confirm specification and quotation, then production is planned for the confirmed order. Pricing is tiered by quantity, specifications and customization, with dedicated arrangements for regular bulk customers. Standard neutral packaging is included; international freight and taxes are excluded. Specified packaging and EXW/FOB quotations can be arranged. Raw-material and exchange-rate changes may affect new quotations and are discussed in advance; confirmed-order pricing remains fixed."
      }
    ]
  },
  {
    "group": "Inspection",
    "items": [
      {
        "q": "Which technical documents and inspection services are available? How do you monitor production and communicate progress?",
        "a": "Product data sheets and factory inspection reports are available. Third-party test reports can be arranged to meet customer requirements. Third-party inspection services are not offered. Inspection covers incoming materials, processing, assembly and finished-goods storage, with designated inspectors at each stage. We provide regular progress updates and can supply production photos or videos on request. Our recorded order on-time delivery rate is above 98%."
      },
      {
        "q": "Which management-system certificates do you hold?",
        "a": "ISO 9001:2015, ISO 14001:2015 and ISO 45001:2018. Details are shown in the certification section and on the Quality page."
      }
    ]
  }
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
