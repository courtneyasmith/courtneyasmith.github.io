<script setup lang="ts">
interface ContainerProps {
  size?: 'prose' | 'content' | 'full'
  class?: string
}
const props = withDefaults(defineProps<ContainerProps>(), {
  size: 'content',
  class: '',
})

// prose: 672px text-heavy · content: 896px mixed · full: 1024px grid layouts
const sizeMaxWidths = {
  prose: '42rem',
  content: '56rem',
  full: '64rem',
} as const
</script>

<template>
  <div
    :class="props.class"
    :style="{
      maxWidth: sizeMaxWidths[props.size],
      marginInline: 'auto',
      paddingInline: 'clamp(1.5rem, 5vw, 3rem)',
      width: '100%',
      boxSizing: 'border-box',
    }"
  >
    <slot />
  </div>
</template>
