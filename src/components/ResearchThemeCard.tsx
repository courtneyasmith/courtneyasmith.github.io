"use client"

import Link from 'next/link'
import type { ResearchDirection } from '@/types'
import { ScrollReveal } from './animation/ScrollReveal'

interface ResearchThemeCardProps {
  theme: ResearchDirection
  index?: number
}

const tagLabels: Record<string, string> = {
  'transgender-dermatology': 'Epidemiology',
  'hidradenitis-suppurativa': 'Epidemiology',
  'clinical-informatics': 'Informatics',
  'health-equity': 'Health Equity',
}

export function ResearchThemeCard({ theme, index = 0 }: ResearchThemeCardProps) {
  const tag = tagLabels[theme.id] || 'Research'

  return (
    <ScrollReveal delay={0.1 * index}>
      <Link
        href={`/research#${theme.id}`}
        className="group block h-full card hover:no-underline"
      >
        <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors duration-150">
          {theme.title}
        </h3>
        <p className="mt-3 text-sm text-text-secondary leading-relaxed">
          {theme.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-accent-subtle text-accent rounded-full">
            {tag}
          </span>
          {theme.relatedPublicationIds.length > 0 && (
            <span className="inline-block px-3 py-1 text-xs bg-bg-primary text-text-muted rounded-full border border-border-subtle">
              {theme.relatedPublicationIds.length} publications
            </span>
          )}
        </div>
      </Link>
    </ScrollReveal>
  )
}
