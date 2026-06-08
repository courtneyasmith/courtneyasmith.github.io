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
const sizeClass = {
  prose: 'max-w-[42rem]',
  content: 'max-w-[56rem]',
  full: 'max-w-[64rem]',
} as const
</script>

<template>
  <div :class="['mx-auto w-full px-[clamp(1.5rem,5vw,3rem)]', sizeClass[props.size], props.class]">
    <slot />
  </div>
</template>
