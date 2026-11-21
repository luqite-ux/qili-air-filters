const text = (value, fallback = '') => typeof value === 'string' && value.trim() ? value.trim() : fallback
const list = (value) => Array.isArray(value) ? value : []

export function applyHomeSiteContent(fallback, snapshot) {
  const page = snapshot?.pages?.find((candidate) => candidate.key === 'home' && candidate.path === '/')
  if (!page) return fallback
  const modules = new Map(page.modules.map((module) => [module.key, module.values ?? {}]))
  const hero = modules.get('hero')
  const faq = modules.get('faq')
  const slides = list(hero?.slides).map((slide, index) => ({
    id: text(slide.id, `slide-${index + 1}`),
    eyebrow: text(slide.eyebrow),
    title: text(slide.title),
    body: text(slide.body),
    cta: { label: text(slide.primary_label), href: text(slide.primary_href, '/products') },
    secondary: { label: text(slide.secondary_label), href: text(slide.secondary_href, '/contact') },
    image: { src: text(slide.image?.url), alt: text(slide.image?.alt) },
    side: slide.side === 'right' ? 'right' : 'left',
    tabLabel: text(slide.tab_label, text(slide.eyebrow, `Slide ${index + 1}`)),
  })).filter((slide) => slide.title && slide.body && slide.image.src)
  const faqItems = list(faq?.items).map((item) => ({
    group: text(item.group, 'Questions'),
    q: text(item.question),
    a: text(item.answer),
  })).filter((item) => item.q && item.a)
  const groupedFaq = [...new Set(faqItems.map((item) => item.group))].map((group) => ({
    group,
    items: faqItems.filter((item) => item.group === group).map(({ q, a }) => ({ q, a })),
  }))
  return {
    ...fallback,
    ...(slides.length ? { slides } : {}),
    ...(groupedFaq.length ? { faq: groupedFaq } : {}),
  }
}
