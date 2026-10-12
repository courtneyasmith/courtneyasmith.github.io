<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const notFound = computed(() => props.error.status === 404)
const title = computed(() => (notFound.value ? 'Page not found' : 'Something went wrong'))

useSeoMeta({ title, robots: 'noindex' })
</script>

<template>
  <!-- error.vue renders outside the layout unless wrapped, which is why the default page had no header or footer -->
  <NuxtLayout>
    <Container size="prose">
      <PageHeader
        :title="title"
        :intro="notFound ? 'This page does not exist or has moved.' : 'This page could not be loaded. Please try again in a moment.'"
      />
      <p class="pb-12">
        <NuxtLink to="/" class="text-accent hover:text-accent-hover hover:underline">Return to the home page</NuxtLink>
      </p>
    </Container>
  </NuxtLayout>
</template>
