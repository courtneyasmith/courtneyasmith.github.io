export const PUBLICATION_TAGS = ['epidemiology', 'informatics', 'health-equity', 'chemistry'] as const
export type PublicationTag = (typeof PUBLICATION_TAGS)[number]

export type PublicationKind = 'article' | 'published-abstract' | 'submitted'

export interface Publication {
  id: string
  title: string
  authors: string
  journal: string
  year: number
  doi?: string
  pmid?: string
  url?: string
  tags: PublicationTag[]
  isFirstAuthor: boolean
  kind: PublicationKind
  isPeerReviewed: boolean
}

export const PRESENTATION_TYPES = ['oral', 'poster'] as const
export type PresentationType = (typeof PRESENTATION_TYPES)[number]

export interface Presentation {
  id: string
  title: string
  authors: string
  venue: string
  location?: string
  date: string
  year: number
  type: PresentationType
  status?: string
  isFirstAuthor: boolean
}

export interface ResearchDirection {
  id: string
  title: string
  description: string
  focus?: string
  keyWork?: string[]
  relatedPublicationIds: string[]
}

export interface Project {
  id: string
  title: string
  stack: string[]
  description: string
  impact?: string
  githubUrl?: string
  demoUrl?: string
  writeupUrl?: string
  visibility?: 'public' | 'private' | 'internal'
  status?: 'active' | 'archived' | 'in-development'
  featured?: boolean
}

export interface CommunityItem {
  id: string
  title: string
  role: string
  years: string
  category: 'featured' | 'clinical' | 'advocacy' | 'service'
  description?: string
  url?: string
  featured: boolean
  sortOrder?: number
}

export interface SiteConfig {
  name: string
  title: string
  tagline: string
  email: string
  googleScholar?: string
  orcid?: string
  github?: string
  cvPdfPath?: string
}
