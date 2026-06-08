<script setup lang="ts">
interface FormattedAuthorsProps {
  authors: string
  highlightName?: string
}
const props = withDefaults(defineProps<FormattedAuthorsProps>(), {
  highlightName: 'Smith CA',
})
const parsed = computed(() => parseAuthors(props.authors))
</script>

<template>
  <span>
    <span
      v-for="(author, index) in parsed"
      :key="`${author}-${index}`"
      class="inline-block whitespace-nowrap"
    >
      <strong v-if="author === props.highlightName" class="font-semibold">{{ author }}</strong>
      <template v-else>{{ author }}</template>
      <template v-if="index !== parsed.length - 1">,&nbsp;</template>
    </span>
  </span>
</template>
