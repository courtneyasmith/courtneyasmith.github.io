import { Hero, ResearchThemeCard, PublicationItem } from '@/components'
import { ScrollReveal } from '@/components/animation/ScrollReveal'
import { researchThemes } from '@/data/research-themes'
import { publications } from '@/data/publications'
import Link from 'next/link'

// Curated list of publications to feature on homepage
const featuredPublicationIds = [
  'acne-incidence-and-severity-in-transgender-individuals',
  'incidence-of-hidradenitis-suppurativa-in-transgender-and-cisgender-individuals-a',
  'permanent-hair-removal-in-gender-diverse-adults-assigned-male-at-birth-a-cross-s',
  'smoking-cessation-and-persistence-in-skin-cancer-survivors-a-cross-sectional-stu',
  'video-synchronous-isotretinoin-management-is-associated-with-lower-risk-of-patie',
]

const selectedPublications = featuredPublicationIds
  .map(id => publications.find(p => p.id === id))
  .filter((p): p is typeof publications[number] => p !== undefined)

const containerStyle = {
  maxWidth: '1100px',
  margin: '0 auto',
  padding: '0 1.5rem',
  width: '100%',
  boxSizing: 'border-box' as const,
}

const sectionStyle = {
  padding: '4rem 0',
}

export default function Home() {
  return (
    <>
      <Hero />

      {/* Research Section */}
      <section style={sectionStyle}>
        <div style={containerStyle}>
          <ScrollReveal>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '2rem' }}>
              Research
            </h2>
          </ScrollReveal>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.25rem'
          }}>
            {researchThemes.map((theme, index) => (
              <ResearchThemeCard key={theme.id} theme={theme} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section style={{ ...sectionStyle, backgroundColor: 'var(--color-bg-secondary)' }}>
        <div style={{ ...containerStyle, maxWidth: '800px' }}>
          <ScrollReveal>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '2rem' }}>
              Selected Publications
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div style={{
              backgroundColor: 'var(--color-bg-primary)',
              borderRadius: '0.5rem',
              border: '1px solid var(--color-border-subtle)',
              padding: '1.5rem'
            }}>
              {selectedPublications.map((pub) => (
                <PublicationItem key={pub.id} publication={pub} />
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p style={{ marginTop: '1.5rem' }}>
              <Link
                href="/publications"
                className="text-accent hover:text-accent-hover"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
              >
                View all publications <span aria-hidden="true">→</span>
              </Link>
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
