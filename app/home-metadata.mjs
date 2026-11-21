export const baseHomeMetadata = {
  alternates: { canonical: '/' },
}

export function mergeHomeMetadata(base, managed = {}) {
  return {
    ...base,
    ...managed,
    alternates: base.alternates,
  }
}
