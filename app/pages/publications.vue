<script setup lang="ts">
import type { TypeFilter, YearFilter } from '~/utils/filter-publications'

useSeoMeta({ title: 'Publications | Courtney A. Smith, MD, MS' })

const typeFilter = ref<TypeFilter>('all')
const yearFilter = ref<YearFilter>('all')
const firstAuthorOnly = ref(false)

const filtered = computed(() =>
  filterPublications(publications, typeFilter.value, yearFilter.value, firstAuthorOnly.value),
)
const totalCount = computed(() => publications.filter((p) => p.kind !== 'submitted').length)
</script>

<template>
  <Container size="content">
    <PageHeader title="Publications" intro="Peer-reviewed articles, abstracts, and presentations." />

    <div class="pb-6 space-y-4">
      <div class="flex flex-wrap gap-2">
        <FilterPill :active="typeFilter === 'all'" @click="typeFilter = 'all'">All</FilterPill>
        <FilterPill :active="typeFilter === 'article'" @click="typeFilter = 'article'">Manuscripts</FilterPill>
        <FilterPill :active="typeFilter === 'published-abstract'" @click="typeFilter = 'published-abstract'">Abstracts</FilterPill>
        <span class="w-px bg-border-subtle mx-1" />
        <FilterPill :active="yearFilter === 'all'" @click="yearFilter = 'all'">All Years</FilterPill>
        <FilterPill :active="yearFilter === '2026'" @click="yearFilter = '2026'">2026</FilterPill>
        <FilterPill :active="yearFilter === '2025'" @click="yearFilter = '2025'">2025</FilterPill>
        <FilterPill :active="yearFilter === '2024'" @click="yearFilter = '2024'">2024</FilterPill>
        <FilterPill :active="yearFilter === 'earlier'" @click="yearFilter = 'earlier'">Earlier</FilterPill>
      </div>

      <label class="inline-flex items-center gap-2 cursor-pointer">
        <input v-model="firstAuthorOnly" type="checkbox" class="w-4 h-4 rounded border-border accent-accent">
        <span class="text-sm text-text-secondary">First author only</span>
      </label>
    </div>

    <p class="text-sm text-text-muted mb-4">
      Showing {{ filtered.length }} of {{ totalCount }} publications
    </p>

    <div class="pb-16">
      <template v-if="filtered.length > 0">
        <PublicationListItem v-for="pub in filtered" :key="pub.id" :publication="pub" />
      </template>
      <p v-else class="py-8 text-center text-text-secondary">
        No publications match these filters. Try adjusting your selection.
      </p>
    </div>
  </Container>
</template>
