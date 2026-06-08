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
    <h1
      class="font-semibold text-text-primary"
      :style="{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }"
    >
      {{ props.title }}
    </h1>
    <p
      v-if="props.intro"
      :class="['mt-4 text-text-secondary leading-relaxed', props.centered ? 'mx-auto' : '']"
      :style="{ maxWidth: '65ch' }"
    >
      {{ props.intro }}
    </p>
  </header>
</template>
