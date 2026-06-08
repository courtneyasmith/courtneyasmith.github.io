<script setup lang="ts">
useSeoMeta({
  title: 'CV',
  description: 'Curriculum vitae of Courtney A. Smith, MD, MS.',
})

const firstAuthorCount = publications.filter(
  (p) => p.isFirstAuthor && p.isPeerReviewed && p.kind === 'article',
).length

const summaryCards = [
  {
    title: 'Education',
    items: ['Harvard Combined Dermatology (2027)', 'UCLA DGSOM, MD (2026)', 'USF, MS Chemistry'],
  },
  {
    title: 'Publications',
    items: [`${firstAuthorCount} first-author peer-reviewed articles`, 'Multiple abstracts and presentations'],
  },
  {
    title: 'Awards',
    items: ['PeDRA Research Fellowship', 'David Geffen Medical Scholarship', 'FL GA Louis Stokes Research Fellowship'],
  },
  {
    title: 'Technical Skills',
    items: ['Python, R, SQL', 'NLP & Clinical Informatics', 'REDCap, Large EHR Databases'],
  },
]
</script>

<template>
  <Container size="prose">
    <PageHeader
      title="Curriculum Vitae"
      intro="For a comprehensive overview of my training, publications, and experience."
      centered
    />

    <div class="flex justify-center pb-12">
      <a :href="siteConfig.cvPdfPath" download class="btn-primary gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-5 h-5"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M10 3a1 1 0 011 1v8.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V4a1 1 0 011-1z"
            clip-rule="evenodd"
          />
          <path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
        </svg>
        Download CV (PDF)
      </a>
    </div>

    <div class="grid gap-4 pb-16 sm:grid-cols-2">
      <div
        v-for="card in summaryCards"
        :key="card.title"
        class="p-6 rounded-lg bg-bg-secondary border border-border-subtle"
      >
        <h3 class="font-medium text-text-primary mb-3">{{ card.title }}</h3>
        <ul class="space-y-1 text-sm text-text-secondary">
          <li v-for="(item, i) in card.items" :key="i">{{ item }}</li>
        </ul>
      </div>
    </div>
  </Container>
</template>
