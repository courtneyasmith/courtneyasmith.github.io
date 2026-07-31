<script setup lang="ts">
import type { Publication } from '~/types'

useSeoMeta({
  title: 'Research',
  description: 'Research in epidemiology, clinical informatics, health equity, and transgender dermatology.',
})

function getPublicationsByIds(ids: string[]): Publication[] {
  return ids
    .map((id) => publications.find((p) => p.id === id))
    .filter((p): p is Publication => p !== undefined && p.kind !== 'submitted')
}

function getPubMedUrl(pmid: string): string {
  return `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`
}

const themeBlocks = researchThemes.map((theme, index) => ({
  theme,
  index,
  relatedPubs: getPublicationsByIds(theme.relatedPublicationIds).slice(0, 3),
}))
</script>

<template>
  <Container size="content">
    <ScrollReveal>
      <PageHeader
        title="Research"
        intro="Focused on computational approaches to dermatologic care, with emphasis on populations underrepresented in existing research."
      />
    </ScrollReveal>

    <div class="pb-16 space-y-8">
      <ScrollReveal v-for="{ theme, index, relatedPubs } in themeBlocks" :key="theme.id" :delay="0.1 * (index + 1)">
        <section
          :id="theme.id"
          class="scroll-mt-24 p-6 rounded-lg bg-bg-secondary border border-border-subtle"
        >
          <h2 class="font-semibold text-text-primary text-xl">
            {{ theme.title }}
          </h2>

          <p class="mt-3 text-text-primary leading-relaxed max-w-prose">
            {{ theme.description }}
          </p>

          <p v-if="theme.focus" class="mt-2 text-sm text-text-secondary italic">
            {{ theme.focus }}
          </p>

          <div v-if="relatedPubs.length > 0" class="mt-5 pt-4 border-t border-border-subtle">
            <h3 class="text-sm font-medium text-text-secondary mb-2">
              Key publications
            </h3>
            <ul class="space-y-1.5">
              <li v-for="pub in relatedPubs" :key="pub.id" class="text-sm">
                <a
                  v-if="pub.pmid"
                  :href="getPubMedUrl(pub.pmid)"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-accent hover:text-accent-hover hover:underline"
                >{{ pub.title }}</a>
                <span v-else class="text-text-primary">{{ pub.title }}</span>
                <span class="text-text-muted ml-1">({{ pub.journal }}, {{ pub.year }})</span>
              </li>
            </ul>
          </div>
        </section>
      </ScrollReveal>
    </div>
  </Container>
</template>
