import type { Publication } from '~/types'

export function getPublicationUrl(pub: Publication): string | null {
  if (pub.url) return pub.url
  if (pub.pmid) return `https://pubmed.ncbi.nlm.nih.gov/${pub.pmid}/`
  if (pub.doi) return `https://doi.org/${pub.doi}`
  return null
}
