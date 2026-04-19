import type { Publication } from '@/types'

interface PublicationItemProps {
  publication: Publication
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

function getPubMedUrl(pmid: string): string {
  return `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`
}

function getPublicationUrl(publication: Publication): string | null {
  if (publication.url) return publication.url
  if (publication.pmid) return `https://pubmed.ncbi.nlm.nih.gov/${publication.pmid}/`
  if (publication.doi) return `https://doi.org/${publication.doi}`
  return null
}

export function PublicationItem({ publication }: PublicationItemProps) {
  const { title, authors, journal, year } = publication
  const publicationUrl = getPublicationUrl(publication)

  return (
    <article className="py-4 border-b border-border-subtle last:border-b-0">
      <h4 className="font-medium text-text-primary leading-snug">
        {publicationUrl ? (
          <a
            href={publicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors duration-150"
          >
            {title}
          </a>
        ) : (
          title
        )}
      </h4>
      <p className="mt-1 text-sm text-text-secondary">
        {highlightAuthor(authors)}
      </p>
      <p className="mt-0.5 text-sm text-text-muted">
        {journal}, {year}
      </p>
    </article>
  )
}
