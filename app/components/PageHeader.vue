<script setup lang="ts">
interface PageHeaderProps {
  title: string
  intro?: string
  centered?: boolean
}
const props = withDefaults(defineProps<PageHeaderProps>(), {
  centered: false,
})
</script>

<template>
  <header :class="['pt-12 pb-8', props.centered ? 'text-center' : '']">
    <h1 class="font-semibold text-text-primary text-h1">
      {{ props.title }}
    </h1>
    <p
      v-if="props.intro"
      :class="['mt-4 text-text-secondary leading-relaxed max-w-prose', props.centered ? 'mx-auto' : '']"
    >
      {{ props.intro }}
    </p>
  </header>
</template>
