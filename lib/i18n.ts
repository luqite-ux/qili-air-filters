export const PUBLIC_LOCALES = ['en'] as const
export const DEFAULT_LOCALE = 'en'

export type Localized<T = string> = Partial<Record<string, T>>

function isNonEmpty(value: unknown): boolean {
  if (typeof value === 'string') return value.trim().length > 0
  if (Array.isArray(value)) return value.length > 0
  return value !== undefined && value !== null
}

/** request locale -> default locale -> first non-empty value */
export function resolveLocalized<T extends string | string[]>(
  value: Localized<T> | undefined,
  locale: string = DEFAULT_LOCALE,
): T {
  const empty = (Array.isArray(Object.values(value ?? {})[0]) ? [] : '') as T
  if (!value) return empty
  if (isNonEmpty(value[locale])) return value[locale] as T
  if (isNonEmpty(value[DEFAULT_LOCALE])) return value[DEFAULT_LOCALE] as T
  const first = Object.values(value).find(isNonEmpty)
  return (first as T | undefined) ?? empty
}

/** Same fallback chain for whole dictionaries keyed by locale. */
export function resolveDictionary<T>(dictionaries: Record<string, T>, locale: string = DEFAULT_LOCALE): T {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE] ?? (Object.values(dictionaries)[0] as T)
}

/** Integration boundary: replace with request-scoped locale detection when more locales go public. */
export async function getRequestLocale(): Promise<string> {
  return DEFAULT_LOCALE
}

export const l = (en: string): Localized => ({ en })
export const la = (en: string[]): Localized<string[]> => ({ en })
