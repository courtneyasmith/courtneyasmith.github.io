<script setup lang="ts">
const socialLinks = computed(() =>
  [
    { url: siteConfig.googleScholar, label: 'Google Scholar' },
    { url: siteConfig.orcid, label: 'ORCID' },
    { url: siteConfig.github, label: 'GitHub' },
  ].filter((link) => link.url),
)
</script>

<template>
  <footer class="py-8 mt-12 border-t border-border">
    <div class="text-center">
      <p class="font-medium text-text-primary">{{ siteConfig.name }}</p>
      <a
        :href="`mailto:${siteConfig.email}`"
        class="text-sm text-text-secondary hover:text-accent transition-colors"
      >
        {{ siteConfig.email }}
      </a>

      <div v-if="socialLinks.length > 0" class="flex justify-center gap-4 mt-4">
        <a
          v-for="link in socialLinks"
          :key="link.label"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm text-text-secondary hover:text-accent transition-colors"
        >
          {{ link.label }}
        </a>
      </div>

      <p class="text-sm text-text-secondary mt-4">&copy; 2026</p>
    </div>
  </footer>
</template>
