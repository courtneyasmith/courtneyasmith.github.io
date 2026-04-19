// Centralized data exports
// All data arrays and query helpers are accessible from '@/data'

// Site configuration
export { siteConfig } from './site-config'

// Publications and query helpers
export {
  publications,
  getPublicationsByTag,
  getPublicationsByKind,
  getFirstAuthorPublications,
  getPublicationsByYear,
} from './publications'

// Presentations and query helpers
export {
  presentations,
  getPresentationsByType,
  getFirstAuthorPresentations,
  getPresentationsByYear,
  getPresentationsByVenue,
} from './presentations'

// Research directions
export { researchDirections } from './research-directions'

// Projects
export { projects } from './projects'

// Community items
export { communityItems } from './community'

// Re-export types for convenience
export type {
  SiteConfig,
  Publication,
  PublicationTag,
  PublicationKind,
  Presentation,
  PresentationType,
  ResearchDirection,
  Project,
  CommunityItem,
} from '@/types'
