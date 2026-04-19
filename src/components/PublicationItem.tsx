import type { Publication } from '@/types'
import { FormattedAuthors } from './FormattedAuthors'

interface PublicationItemProps {
  publication: Publication
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
      <p className="mt-1 max-w-none text-sm text-text-secondary">
        <FormattedAuthors authors={authors} />
      </p>
      <p className="mt-0.5 text-sm text-text-muted">
        {journal}, {year}
      </p>
    </article>
  )
}
