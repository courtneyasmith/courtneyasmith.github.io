<script setup lang="ts">
defineProps<{ active: boolean }>()
defineEmits<{ click: [] }>()
</script>

<template>
  <button
    :class="['inline-flex items-center px-3 py-1.5 rounded-full text-sm transition-all duration-150 ease-out', active ? 'bg-accent-subtle text-accent border border-accent' : 'bg-bg-secondary text-text-secondary border border-border-subtle hover:border-accent']"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>
