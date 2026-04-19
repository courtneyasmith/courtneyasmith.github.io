import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import { PageHeader } from '@/components/PageHeader'
import { ScrollReveal } from '@/components/animation/ScrollReveal'
import { researchThemes } from '@/data/research-themes'
import { publications } from '@/data/publications'
import type { Publication } from '@/types'

export const metadata: Metadata = {
  title: 'Research',
  description: 'Research directions in transgender dermatology, epidemiology, clinical informatics, and health equity.',
}

function getPublicationsByIds(ids: string[]): Publication[] {
  return ids
    .map(id => publications.find(p => p.id === id))
    .filter((p): p is Publication => p !== undefined)
}

function getPubMedUrl(pmid: string): string {
  return `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`
}

export default function ResearchPage() {
  return (
    <Container size="content">
      <ScrollReveal>
        <PageHeader
          title="Research"
          intro="Focused on computational approaches to dermatologic care, with emphasis on populations underrepresented in existing research."
        />
      </ScrollReveal>

      <div className="pb-16 space-y-8">
        {researchThemes.map((theme, index) => {
          const relatedPubs = getPublicationsByIds(theme.relatedPublicationIds).slice(0, 3)

          return (
            <ScrollReveal key={theme.id} delay={0.1 * (index + 1)}>
              <section
                id={theme.id}
                className="scroll-mt-24 p-6 rounded-lg bg-bg-secondary border border-border-subtle"
              >
                <h2
                  className="font-semibold text-text-primary"
                  style={{ fontSize: '1.25rem' }}
                >
                  {theme.title}
                </h2>

                <p
                  className="mt-3 text-text-primary leading-relaxed"
                  style={{ maxWidth: '65ch' }}
                >
                  {theme.description}
                </p>

                {theme.focus && (
                  <p className="mt-2 text-sm text-text-secondary italic">
                    {theme.focus}
                  </p>
                )}

                {relatedPubs.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-border-subtle">
                    <h3 className="text-sm font-medium text-text-secondary mb-2">
                      Key publications
                    </h3>
                    <ul className="space-y-1.5">
                      {relatedPubs.map((pub) => (
                        <li key={pub.id} className="text-sm">
                          {pub.pmid ? (
                            <a
                              href={getPubMedUrl(pub.pmid)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-accent hover:text-accent-hover hover:underline"
                            >
                              {pub.title}
                            </a>
                          ) : (
                            <span className="text-text-primary">{pub.title}</span>
                          )}
                          <span className="text-text-muted ml-1">
                            ({pub.journal}, {pub.year})
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            </ScrollReveal>
          )
        })}
      </div>
    </Container>
  )
}
