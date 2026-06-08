<script setup lang="ts">
import type { Publication } from '~/types'
const props = defineProps<{ publication: Publication }>()
const url = computed(() => getPublicationUrl(props.publication))
</script>

<template>
  <article class="py-4 border-b border-border-subtle last:border-b-0 transition-opacity duration-150">
    <h3 class="font-medium text-text-primary leading-snug">
      <a
        v-if="url"
        :href="url"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:text-accent transition-colors duration-150"
      >{{ publication.title }}</a>
      <template v-else>{{ publication.title }}</template>
    </h3>
    <p class="mt-1 max-w-none text-sm text-text-secondary">
      <FormattedAuthors :authors="publication.authors" />
    </p>
    <p class="mt-0.5 text-sm text-text-muted">
      <em>{{ publication.journal }}</em>, {{ publication.year }}
    </p>
    <div v-if="publication.tags.length > 0" class="mt-2 flex flex-wrap gap-1">
      <span
        v-for="tag in publication.tags"
        :key="tag"
        class="inline-flex px-2 py-0.5 text-xs rounded-full bg-accent-subtle text-accent"
      >{{ tag }}</span>
    </div>
  </article>
</template>
