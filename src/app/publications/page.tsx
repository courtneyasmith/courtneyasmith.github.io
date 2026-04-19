'use client'

import { useState, useMemo } from 'react'
import { Container } from '@/components/Container'
import { PageHeader } from '@/components/PageHeader'
import { publications } from '@/data/publications'
import type { Publication } from '@/types'

type TypeFilter = 'all' | 'article' | 'published-abstract'
type YearFilter = 'all' | '2026' | '2025' | '2024' | 'earlier'

function getPubMedUrl(pmid: string): string {
  return `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`
}

function highlightAuthor(authors: string, name: string = 'Smith CA'): React.ReactNode {
  const parts = authors.split(name)
  if (parts.length === 1) return authors

  return (
    <>
      {parts[0]}
      <strong className="font-semibold">{name}</strong>
      {parts.slice(1).join(name)}
    </>
  )
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center px-3 py-1.5 rounded-full text-sm
        transition-all duration-150 ease-out
        ${active
          ? 'bg-accent-subtle text-accent border border-accent'
          : 'bg-bg-secondary text-text-secondary border border-border-subtle hover:border-accent'
        }
      `}
    >
      {children}
    </button>
  )
}

function PublicationListItem({
  publication,
}: {
  publication: Publication
}) {
  const { title, authors, journal, year, pmid, tags } = publication

  return (
    <article
      className="py-4 border-b border-border-subtle last:border-b-0 transition-opacity duration-150"
    >
      <h3 className="font-medium text-text-primary leading-snug">
        {pmid ? (
          <a
            href={getPubMedUrl(pmid)}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors duration-150"
          >
            {title}
          </a>
        ) : (
          title
        )}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {highlightAuthor(authors)}
      </p>
      <p className="mt-0.5 text-sm text-text-muted">
        <em>{journal}</em>, {year}
      </p>
      {tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex px-2 py-0.5 text-xs rounded-full bg-accent-subtle text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}

export default function PublicationsPage() {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all')
  const [yearFilter, setYearFilter] = useState<YearFilter>('all')
  const [firstAuthorOnly, setFirstAuthorOnly] = useState(false)

  const filteredPublications = useMemo(() => {
    return publications.filter((pub) => {
      // Exclude submitted/unpublished
      if (pub.kind === 'submitted') return false

      // Type filter
      if (typeFilter === 'article' && pub.kind !== 'article') return false
      if (typeFilter === 'published-abstract' && pub.kind !== 'published-abstract') return false

      // Year filter
      if (yearFilter === '2026' && pub.year !== 2026) return false
      if (yearFilter === '2025' && pub.year !== 2025) return false
      if (yearFilter === '2024' && pub.year !== 2024) return false
      if (yearFilter === 'earlier' && pub.year >= 2024) return false

      // First author filter
      if (firstAuthorOnly && !pub.isFirstAuthor) return false

      return true
    }).sort((a, b) => b.year - a.year)
  }, [typeFilter, yearFilter, firstAuthorOnly])

  const totalCount = publications.filter(p => p.kind !== 'submitted').length

  return (
    <>
      {/* Add metadata via document title since this is a client component */}
      <title>Publications | Courtney A. Smith, MS</title>

      <Container size="content">
        <PageHeader
          title="Publications"
          intro="Peer-reviewed articles, abstracts, and presentations."
        />

        {/* Filter Bar */}
        <div className="pb-6 space-y-4">
          {/* Type filters */}
          <div className="flex flex-wrap gap-2">
            <FilterPill
              active={typeFilter === 'all'}
              onClick={() => setTypeFilter('all')}
            >
              All
            </FilterPill>
            <FilterPill
              active={typeFilter === 'article'}
              onClick={() => setTypeFilter('article')}
            >
              Manuscripts
            </FilterPill>
            <FilterPill
              active={typeFilter === 'published-abstract'}
              onClick={() => setTypeFilter('published-abstract')}
            >
              Abstracts
            </FilterPill>

            <span className="w-px bg-border-subtle mx-1" />

            {/* Year filters */}
            <FilterPill
              active={yearFilter === 'all'}
              onClick={() => setYearFilter('all')}
            >
              All Years
            </FilterPill>
            <FilterPill
              active={yearFilter === '2026'}
              onClick={() => setYearFilter('2026')}
            >
              2026
            </FilterPill>
            <FilterPill
              active={yearFilter === '2025'}
              onClick={() => setYearFilter('2025')}
            >
              2025
            </FilterPill>
            <FilterPill
              active={yearFilter === '2024'}
              onClick={() => setYearFilter('2024')}
            >
              2024
            </FilterPill>
            <FilterPill
              active={yearFilter === 'earlier'}
              onClick={() => setYearFilter('earlier')}
            >
              Earlier
            </FilterPill>
          </div>

          {/* First author toggle */}
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={firstAuthorOnly}
              onChange={(e) => setFirstAuthorOnly(e.target.checked)}
              className="w-4 h-4 rounded border-border accent-accent"
            />
            <span className="text-sm text-text-secondary">
              First author only
            </span>
          </label>
        </div>

        {/* Results count */}
        <p className="text-sm text-text-muted mb-4">
          Showing {filteredPublications.length} of {totalCount} publications
        </p>

        {/* Publication list */}
        <div className="pb-16">
          {filteredPublications.length > 0 ? (
            filteredPublications.map((pub) => (
              <PublicationListItem key={pub.id} publication={pub} />
            ))
          ) : (
            <p className="py-8 text-center text-text-secondary">
              No publications match these filters. Try adjusting your selection.
            </p>
          )}
        </div>
      </Container>
    </>
  )
}
