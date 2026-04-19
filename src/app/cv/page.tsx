import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import { PageHeader } from '@/components/PageHeader'
import { siteConfig } from '@/data/site-config'
import { publications } from '@/data/publications'

export const metadata: Metadata = {
  title: 'CV',
  description: 'Curriculum vitae of Courtney A. Smith, MS.',
}

const firstAuthorCount = publications.filter(
  p => p.isFirstAuthor && p.isPeerReviewed && p.kind === 'article'
).length

const summaryCards = [
  {
    title: 'Education',
    items: [
      'Harvard Combined Dermatology (2027)',
      'UCLA DGSOM, MD (2026)',
      'USF, MS Chemistry',
    ],
  },
  {
    title: 'Publications',
    items: [
      `${firstAuthorCount} first-author peer-reviewed articles`,
      'Multiple abstracts and presentations',
    ],
  },
  {
    title: 'Awards',
    items: [
      'PeDRA Research Fellowship',
      'David Geffen Medical Scholarship',
      'FL GA Louis Stokes Research Fellowship',
    ],
  },
  {
    title: 'Technical Skills',
    items: [
      'Python, R, SQL',
      'NLP & Clinical Informatics',
      'REDCap, Large EHR Databases',
    ],
  },
]

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 3a1 1 0 011 1v8.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V4a1 1 0 011-1z"
        clipRule="evenodd"
      />
      <path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
    </svg>
  )
}

export default function CVPage() {
  return (
    <Container size="prose">
      <PageHeader
        title="Curriculum Vitae"
        intro="For a comprehensive overview of my training, publications, and experience."
        centered
      />

      {/* Download Button */}
      <div className="flex justify-center pb-12">
        <a
          href={siteConfig.cvPdfPath}
          download
          className="btn-primary gap-2"
        >
          <DownloadIcon className="w-5 h-5" />
          Download CV (PDF)
        </a>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 pb-16 sm:grid-cols-2">
        {summaryCards.map((card) => (
          <div
            key={card.title}
            className="p-6 rounded-lg bg-bg-secondary border border-border-subtle"
          >
            <h3 className="font-medium text-text-primary mb-3">
              {card.title}
            </h3>
            <ul className="space-y-1 text-sm text-text-secondary">
              {card.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Container>
  )
}
