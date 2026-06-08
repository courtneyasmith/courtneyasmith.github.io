<script setup lang="ts">
useSeoMeta({
  title: 'About',
  description: 'Background, education, and research trajectory of Courtney A. Smith, MD, MS.',
})

const education = [
  { years: '2027–2030', institution: 'Harvard Combined Dermatology Residency' },
  { years: '2026–2027', institution: 'Mission Community Hospital, Transitional Year' },
  { years: '2022–2026', institution: 'UCLA David Geffen School of Medicine, MD' },
  { years: '2014–2017', institution: 'University of South Florida, MS Chemistry' },
  { years: '2010–2014', institution: 'University of South Florida, BA Chemistry' },
]

const technicalSkills: Record<string, string[]> = {
  Languages: ['Python', 'R', 'SQL', 'JavaScript'],
  Tools: ['REDCap', 'Git', 'NLP pipelines', 'Jupyter Notebook'],
  Databases: ['Kaiser Permanente', 'VA CDW', 'NHANES'],
}

interface CommunityService {
  title: string
  role: string
  years: string
  description?: string
  url?: string
  featured: boolean
}

const communityService: CommunityService[] = [
  {
    title: 'Glimmering Bridges',
    role: 'Founder',
    years: '2019–present',
    description: 'Nonprofit providing personalized music players and handmade holiday cards to isolated seniors in nursing homes and assisted living facilities. Over 2,500 cards delivered through volunteer campaigns.',
    url: 'https://glimmeringbridges.com',
    featured: true,
  },
  { title: 'Venice Family Clinic — Dermatology Specialty Clinic', role: 'Volunteer', years: '2022–2026', featured: false },
  { title: 'LGBTQ Haven Clinic', role: 'Volunteer', years: '2012–2014', featured: false },
  { title: 'Crisis Text Line', role: 'Crisis Counselor', years: '2020–2021', featured: false },
  { title: 'Orange County Behavioral Health Advisory Board', role: 'Commissioner, District 3', years: '2020–2022', featured: false },
]

const featuredService = computed(() => communityService.filter((s) => s.featured))
const otherService = computed(() => communityService.filter((s) => !s.featured))
</script>

<template>
  <Container size="prose">
    <ScrollReveal>
      <PageHeader title="About" />
    </ScrollReveal>

    <ScrollReveal :delay="0.1">
      <section class="pb-12 space-y-6">
        <p class="text-text-primary leading-relaxed">
          I study how computational methods and large-scale data can improve care for patients
          underrepresented in dermatologic research. My work has included multi-center cohort
          studies on acne and hidradenitis suppurativa in transgender individuals, NLP tools
          for prescription analysis, and epidemiologic work on skin cancer disparities in
          sexual and gender minority patients.
        </p>

        <p class="text-text-primary leading-relaxed">
          I join Harvard Combined Dermatology in 2027. I am looking forward to growing as a
          clinician, learning from mentors and co-residents, and continuing to develop research
          questions alongside collaborators who care about equitable dermatologic care.
        </p>
      </section>
    </ScrollReveal>

    <ScrollReveal :delay="0.2">
      <section class="py-10 px-6 rounded-lg bg-bg-secondary border border-border-subtle">
        <h2 class="font-semibold text-text-primary mb-6" :style="{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)' }">
          Education &amp; Training
        </h2>

        <div class="space-y-3">
          <div
            v-for="item in education"
            :key="item.years"
            class="grid gap-3"
            :style="{ gridTemplateColumns: '100px 1fr' }"
          >
            <span class="text-sm font-mono text-text-muted">{{ item.years }}</span>
            <span class="text-text-primary">{{ item.institution }}</span>
          </div>
        </div>
      </section>
    </ScrollReveal>

    <ScrollReveal :delay="0.3">
      <section class="py-10 mt-6 px-6 rounded-lg bg-bg-secondary border border-border-subtle">
        <h2 class="font-semibold text-text-primary mb-6" :style="{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)' }">
          Technical Skills
        </h2>

        <div class="space-y-5">
          <div v-for="(skills, category) in technicalSkills" :key="category">
            <h3 class="text-sm font-medium text-text-secondary mb-2">{{ category }}</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="skill in skills"
                :key="skill"
                class="inline-flex px-2.5 py-1 text-sm rounded bg-accent-subtle text-text-primary"
              >{{ skill }}</span>
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>

    <ScrollReveal :delay="0.4">
      <section class="py-10 mt-6 mb-12 px-6 rounded-lg bg-bg-secondary border border-border-subtle">
        <h2 class="font-semibold text-text-primary mb-6" :style="{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)' }">
          Community &amp; Service
        </h2>

        <div class="space-y-6">
          <div v-for="service in featuredService" :key="service.title">
            <div class="flex flex-wrap items-baseline gap-x-2">
              <h3 class="font-medium text-text-primary">
                <a
                  v-if="service.url"
                  :href="service.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-accent hover:text-accent-hover hover:underline"
                >{{ service.title }}</a>
                <template v-else>{{ service.title }}</template>
              </h3>
              <span class="text-sm text-text-secondary">{{ service.role }}</span>
              <span class="text-sm text-text-muted">{{ service.years }}</span>
            </div>
            <p v-if="service.description" class="mt-2 text-text-secondary text-sm leading-relaxed">
              {{ service.description }}
            </p>
          </div>

          <div class="space-y-2 pt-4 border-t border-border-subtle">
            <div
              v-for="service in otherService"
              :key="service.title"
              class="flex flex-wrap items-baseline gap-x-2 text-sm"
            >
              <span class="text-text-primary">{{ service.title }}</span>
              <span class="text-text-secondary">{{ service.role }}</span>
              <span class="text-text-muted">{{ service.years }}</span>
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  </Container>
</template>
