export type SiteSettings = {
  legalName: string
  legalNameZh: string
  brand: string
  displayName: string
  domain: string
  url: string
  email: string
  phones: { label: string; display: string; href: string }[]
  address: string
  addressLines: string[]
}

const defaultSettings: SiteSettings = {
  legalName: 'Suzhou Qili Environmental Protection Technology Co., Ltd.',
  legalNameZh: '苏州企立环保科技有限公司',
  brand: 'Qili',
  displayName: 'Qili Air Filters',
  domain: 'qiliairfilters.com',
  url: 'https://qiliairfilters.com',
  email: 'info@qiliairfilters.com',
  phones: [
    { label: 'Phone', display: '+86 135 8429 5396', href: 'tel:+8613584295396' },
    { label: 'Hotline', display: '400 880 5352', href: 'tel:4008805352' },
  ],
  address:
    'No. 688 Huangpujiang North Road, Zhoushi Town, Kunshan City, Jiangsu, China',
  addressLines: ['No. 688 Huangpujiang North Road', 'Zhoushi Town, Kunshan City', 'Jiangsu, China'],
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return defaultSettings
}

export const site = defaultSettings

export const mainNav = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/applications', label: 'Applications' },
  { href: '/capabilities', label: 'Capabilities' },
  { href: '/quality', label: 'Quality' },
  { href: '/about', label: 'About' },
  { href: '/news', label: 'News' },
] as const
