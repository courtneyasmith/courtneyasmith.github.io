<script setup lang="ts">
import type { ResearchDirection } from '~/types'

interface ResearchThemeCardProps {
  theme: ResearchDirection
  index?: number
}
const props = withDefaults(defineProps<ResearchThemeCardProps>(), {
  index: 0,
})

const tagLabels: Record<string, string> = {
  'transgender-dermatology': 'Epidemiology',
  'hidradenitis-suppurativa': 'Epidemiology',
  'clinical-informatics': 'Informatics',
  'health-equity': 'Health Equity',
}

const tag = computed(() => tagLabels[props.theme.id] || 'Research')
</script>

<template>
  <ScrollReveal :delay="0.1 * props.index">
    <NuxtLink
      :to="`/research#${theme.id}`"
      class="group block h-full card hover:no-underline"
    >
      <h3 class="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors duration-150">
        {{ theme.title }}
      </h3>
      <p class="mt-3 text-sm text-text-secondary leading-relaxed">
        {{ theme.description }}
      </p>
      <div class="mt-4 flex flex-wrap gap-2">
        <span class="inline-block px-3 py-1 text-xs font-medium bg-accent-subtle text-accent rounded-full">
          {{ tag }}
        </span>
        <span
          v-if="theme.relatedPublicationIds.length > 0"
          class="inline-block px-3 py-1 text-xs bg-bg-primary text-text-muted rounded-full border border-border-subtle"
        >
          {{ theme.relatedPublicationIds.length }} publications
        </span>
      </div>
    </NuxtLink>
  </ScrollReveal>
</template>
