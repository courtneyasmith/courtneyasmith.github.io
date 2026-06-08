<script setup lang="ts">
useSeoMeta({
  title: siteConfig.name,
  description: siteConfig.tagline,
  ogTitle: siteConfig.name,
  ogDescription: siteConfig.tagline,
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <SkipLink />
    <AppHeader />
    <main id="main-content" tabindex="-1" class="flex-1 outline-none">
      <slot />
    </main>
    <AppFooter />
    <ScrollToTop />
  </div>
</template>
