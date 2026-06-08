<script setup lang="ts">
interface SectionProps {
  title?: string
  id?: string
  as?: 'section' | 'article' | 'div'
  class?: string
}
const props = withDefaults(defineProps<SectionProps>(), {
  as: 'section',
  class: '',
})
</script>

<template>
  <component :is="props.as" :id="props.id" :class="['py-16', props.class]">
    <h2
      v-if="props.title"
      class="font-semibold mb-6 text-text-primary"
      :style="{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)' }"
    >
      {{ props.title }}
    </h2>
    <slot />
  </component>
</template>
