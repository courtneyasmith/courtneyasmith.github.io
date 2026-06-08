import type { Publication } from '~/types'

export type TypeFilter = 'all' | 'article' | 'published-abstract'
export type YearFilter = 'all' | '2026' | '2025' | '2024' | 'earlier'

export function filterPublications(
  pubs: Publication[],
  typeFilter: TypeFilter,
  yearFilter: YearFilter,
  firstAuthorOnly: boolean,
): Publication[] {
  return pubs
    .filter((pub) => {
      if (pub.kind === 'submitted') return false
      if (typeFilter === 'article' && pub.kind !== 'article') return false
      if (typeFilter === 'published-abstract' && pub.kind !== 'published-abstract') return false
      if (yearFilter === '2026' && pub.year !== 2026) return false
      if (yearFilter === '2025' && pub.year !== 2025) return false
      if (yearFilter === '2024' && pub.year !== 2024) return false
      if (yearFilter === 'earlier' && pub.year >= 2024) return false
      if (firstAuthorOnly && !pub.isFirstAuthor) return false
      return true
    })
    .sort((a, b) => b.year - a.year)
}
