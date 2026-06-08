<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    direction?: 'up' | 'down' | 'left' | 'right'
    delay?: number
    duration?: number
    class?: string
  }>(),
  { direction: 'up', delay: 0, duration: 0.7, class: '' },
)
const el = ref<HTMLElement | null>(null)
const { style } = useScrollReveal(el, {
  direction: props.direction,
  delay: props.delay,
  duration: props.duration,
})
</script>

<template>
  <div ref="el" :class="['scroll-reveal', props.class]" :style="style">
    <slot />
  </div>
</template>
