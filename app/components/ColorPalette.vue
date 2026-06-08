<script setup lang="ts">
// Design system reference component displaying all color tokens.
// For development use only - not intended for production pages.

interface Swatch {
  name: string
  value: string
  usage: string
}
interface ColorGroup {
  title: string
  swatches: Swatch[]
}

const groups: ColorGroup[] = [
  {
    title: 'Text Colors',
    swatches: [
      { name: 'text.primary', value: colors.text.primary, usage: 'Headings, body text, nav links' },
      { name: 'text.secondary', value: colors.text.secondary, usage: 'Captions, journal names, metadata' },
      { name: 'text.muted', value: colors.text.muted, usage: 'Dates, years, less important info' },
    ],
  },
  {
    title: 'Background Colors',
    swatches: [
      { name: 'bg.primary', value: colors.bg.primary, usage: 'Main page background' },
      { name: 'bg.secondary', value: colors.bg.secondary, usage: 'Cards, pillar cards, project cards' },
      { name: 'bg.hero', value: colors.bg.hero, usage: 'Hero section background' },
    ],
  },
  {
    title: 'Accent Colors',
    swatches: [
      { name: 'accent.DEFAULT', value: colors.accent.DEFAULT, usage: 'Links, active nav, interactive elements' },
      { name: 'accent.hover', value: colors.accent.hover, usage: 'Link hover states' },
      { name: 'accent.subtle', value: colors.accent.subtle, usage: 'Tag backgrounds, filter pills' },
    ],
  },
  {
    title: 'Border Colors',
    swatches: [
      { name: 'border.DEFAULT', value: colors.border.DEFAULT, usage: 'Card borders, section dividers' },
      { name: 'border.subtle', value: colors.border.subtle, usage: 'Subtle borders, light separators' },
    ],
  },
  {
    title: 'Semantic Colors',
    swatches: [
      { name: 'highlight', value: colors.highlight, usage: 'First-author publication rows' },
      { name: 'focusRing', value: colors.focusRing, usage: 'Keyboard focus outlines' },
      { name: 'success', value: colors.success, usage: 'Success states, confirmations' },
      { name: 'error', value: colors.error, usage: 'Error states, validation' },
    ],
  },
]
</script>

<template>
  <div class="space-y-10">
    <section v-for="group in groups" :key="group.title" class="space-y-4">
      <h3 class="text-lg font-semibold border-b border-border pb-2">{{ group.title }}</h3>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        <div v-for="swatch in group.swatches" :key="swatch.name" class="flex flex-col gap-2">
          <div class="h-16 w-full rounded-md border border-border" :style="{ backgroundColor: swatch.value }" />
          <div class="space-y-1">
            <p class="font-medium text-sm">{{ swatch.name }}</p>
            <p class="text-xs font-mono text-text-secondary">{{ swatch.value }}</p>
            <p class="text-xs text-text-muted">{{ swatch.usage }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
