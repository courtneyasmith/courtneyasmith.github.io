import type { Publication } from '~/types'

export type TypeFilter = 'all' | 'article' | 'published-abstract'
export type YearFilter = 'all' | '2026' | '2025' | '2024' | 'earlier'

/**
 * Filters only — it deliberately does not sort.
 *
 * app/data/publications.ts is generated already ordered most-recent-first, by
 * publication date with CV order breaking ties (see sort_publications in
 * src/scripts/export_ts.py). Array.prototype.filter preserves order, so that
 * ordering carries through untouched. Re-sorting here would mean duplicating the
 * date-padding rules in a second language and keeping the two in step forever,
 * and it would mean shipping dates the site never shows. Presentations already
 * work this way.
 */
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
}
