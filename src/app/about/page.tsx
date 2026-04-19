import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import { PageHeader } from '@/components/PageHeader'
import { ScrollReveal } from '@/components/animation/ScrollReveal'

export const metadata: Metadata = {
  title: 'About',
  description: 'Background, education, and research trajectory of Courtney A. Smith, MS.',
}

const education = [
  { years: '2027–2031', institution: 'Harvard Combined Dermatology Residency' },
  { years: '2026–2027', institution: 'Mission Community Hospital, Transitional Year' },
  { years: '2022–2026', institution: 'UCLA David Geffen School of Medicine, MD' },
  { years: '2014–2017', institution: 'University of South Florida, MS Chemistry' },
  { years: '2010–2014', institution: 'University of South Florida, BA Chemistry' },
]

const technicalSkills = {
  Languages: ['Python', 'R', 'SQL', 'TypeScript'],
  Tools: ['REDCap', 'Git', 'NLP pipelines', 'Jupyter'],
  Databases: ['Kaiser Permanente', 'VA CDW', 'NHANES'],
}

const communityService = [
  {
    title: 'Glimmering Bridges',
    role: 'Founder',
    years: '2019–present',
    description: 'Nonprofit providing personalized music players and handmade holiday cards to isolated seniors in nursing homes and assisted living facilities. Over 2,500 cards delivered through volunteer campaigns.',
    url: 'https://glimmeringbridges.com',
    featured: true,
  },
  {
    title: 'Venice Family Clinic — Dermatology Specialty Clinic',
    role: 'Volunteer',
    years: '2022–2026',
    featured: false,
  },
  {
    title: 'LGBTQ Haven Clinic',
    role: 'Volunteer',
    years: '2012–2014',
    featured: false,
  },
  {
    title: 'Crisis Text Line',
    role: 'Crisis Counselor',
    years: '2020–2021',
    featured: false,
  },
  {
    title: 'Orange County Behavioral Health Advisory Board',
    role: 'Commissioner, District 3',
    years: '2020–2022',
    featured: false,
  },
]

function SkillTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex px-2.5 py-1 text-sm rounded bg-accent-subtle text-text-primary">
      {children}
    </span>
  )
}

export default function AboutPage() {
  return (
    <Container size="prose">
      <ScrollReveal>
        <PageHeader title="About" />
      </ScrollReveal>

      {/* Bio Section */}
      <ScrollReveal delay={0.1}>
        <section className="pb-12 space-y-6">
          <p className="text-text-primary leading-relaxed">
            I study how computational methods and large-scale data can improve care for patients
            underrepresented in dermatologic research. My work has included multi-center cohort
            studies on acne and hidradenitis suppurativa in transgender individuals, NLP tools
            for prescription analysis, and epidemiologic work on skin cancer disparities in
            sexual and gender minority patients.
          </p>

          <p className="text-text-primary leading-relaxed">
            I join Harvard Combined Dermatology in 2027. I am looking forward to growing as a
            clinician, learning from mentors and co-residents, and continuing to develop research
            questions alongside collaborators who care about equitable dermatologic care.
          </p>
        </section>
      </ScrollReveal>

      {/* Education & Training */}
      <ScrollReveal delay={0.2}>
        <section className="py-10 px-6 rounded-lg bg-bg-secondary border border-border-subtle">
          <h2
            className="font-semibold text-text-primary mb-6"
            style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)' }}
          >
            Education & Training
          </h2>

          <div className="space-y-3">
            {education.map((item) => (
              <div
                key={item.years}
                className="grid gap-3"
                style={{ gridTemplateColumns: '100px 1fr' }}
              >
                <span className="text-sm font-mono text-text-muted">
                  {item.years}
                </span>
                <span className="text-text-primary">
                  {item.institution}
                </span>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Technical Skills */}
      <ScrollReveal delay={0.3}>
        <section className="py-10 mt-6 px-6 rounded-lg bg-bg-secondary border border-border-subtle">
          <h2
            className="font-semibold text-text-primary mb-6"
            style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)' }}
          >
            Technical Skills
          </h2>

          <div className="space-y-5">
            {Object.entries(technicalSkills).map(([category, skills]) => (
              <div key={category}>
                <h3 className="text-sm font-medium text-text-secondary mb-2">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <SkillTag key={skill}>{skill}</SkillTag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Community & Service */}
      <ScrollReveal delay={0.4}>
        <section className="py-10 mt-6 mb-12 px-6 rounded-lg bg-bg-secondary border border-border-subtle">
          <h2
            className="font-semibold text-text-primary mb-6"
            style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)' }}
          >
            Community & Service
          </h2>

          <div className="space-y-6">
            {communityService.filter(s => s.featured).map((service) => (
              <div key={service.title}>
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <h3 className="font-medium text-text-primary">
                    {service.url ? (
                      <a
                        href={service.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-accent-hover hover:underline"
                      >
                        {service.title}
                      </a>
                    ) : (
                      service.title
                    )}
                  </h3>
                  <span className="text-sm text-text-secondary">
                    {service.role}
                  </span>
                  <span className="text-sm text-text-muted">
                    {service.years}
                  </span>
                </div>
                {service.description && (
                  <p className="mt-2 text-text-secondary text-sm leading-relaxed">
                    {service.description}
                  </p>
                )}
              </div>
            ))}

            <div className="space-y-2 pt-4 border-t border-border-subtle">
              {communityService.filter(s => !s.featured).map((service) => (
                <div
                  key={service.title}
                  className="flex flex-wrap items-baseline gap-x-2 text-sm"
                >
                  <span className="text-text-primary">{service.title}</span>
                  <span className="text-text-secondary">{service.role}</span>
                  <span className="text-text-muted">{service.years}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>
    </Container>
  )
}
