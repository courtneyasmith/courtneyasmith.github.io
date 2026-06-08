<script setup lang="ts">
import type { Publication } from '~/types'
const props = defineProps<{ publication: Publication }>()
const url = computed(() => getPublicationUrl(props.publication))
</script>

<template>
  <article class="py-4 border-b border-border-subtle last:border-b-0">
    <h4 class="font-medium text-text-primary leading-snug">
      <a
        v-if="url"
        :href="url"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:text-accent transition-colors duration-150"
      >{{ publication.title }}</a>
      <template v-else>{{ publication.title }}</template>
    </h4>
    <p class="mt-1 max-w-none text-sm text-text-secondary">
      <FormattedAuthors :authors="publication.authors" />
    </p>
    <p class="mt-0.5 text-sm text-text-muted">
      {{ publication.journal }}, {{ publication.year }}
    </p>
  </article>
</template>
