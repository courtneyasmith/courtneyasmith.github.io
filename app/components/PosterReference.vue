<script setup lang="ts">
import type { PosterReference } from '~/types'

// The talk number is the caller's: only the PeDRA page has a talk whose numbering differs from the poster's
const props = defineProps<{ reference: PosterReference; talk?: number }>()

// Volume and pages stay on one line: a break at the hyphen in a page range strands the last page
const details = computed(() => {
  const split = props.reference.details.lastIndexOf(' ') + 1
  return { lead: props.reference.details.slice(0, split), tail: props.reference.details.slice(split) }
})

// AMA drops the closing period after a title that already ends in a question or exclamation mark
const titleEnd = computed(() => (/[?!]$/.test(props.reference.title) ? '' : '.'))
</script>

<template>
  <li :id="`ref-${reference.poster}`" class="ref">
    <div class="num">
      <span class="num-poster">{{ reference.poster }}</span>
      <span v-if="talk" class="num-talk">talk {{ talk }}</span>
    </div>
    <div>
      <p class="cite">
        {{ reference.authors }} <span class="cite-title">{{ reference.title }}{{ titleEnd }}</span> {{ reference.containerPrefix }}<em>{{ reference.container }}</em>. {{ details.lead }}<span class="nowrap">{{ details.tail }}.</span><template v-if="reference.doi"> doi:<a :href="`https://doi.org/${reference.doi}`" target="_blank" rel="noopener noreferrer">{{ reference.doi }}</a></template>
      </p>
      <p v-if="reference.pmid" class="links">
        <a :href="`https://pubmed.ncbi.nlm.nih.gov/${reference.pmid}/`" target="_blank" rel="noopener noreferrer">PubMed</a>
      </p>
    </div>
  </li>
</template>

<style scoped>
.ref {
  --ref-gutter: 2.5rem;
  display: grid;
  grid-template-columns: var(--ref-gutter) 1fr;
  column-gap: 0.25rem;
  margin: 0 -0.5rem;
  padding: 0.875rem 0.5rem;
  border-radius: 6px;
  scroll-margin-top: 6.5rem;
}

/* A reference reached from the dot plot or a superscript flashes once so the eye finds it */
.ref:target {
  animation: ref-land 2.6s cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes ref-land {
  0%,
  35% {
    background-color: var(--color-accent-subtle);
  }
  100% {
    background-color: transparent;
  }
}

.num {
  display: flex;
  flex-direction: column;
  padding-top: 0.0625rem;
  line-height: 1.25;
}

.num-poster {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-accent);
  font-variant-numeric: tabular-nums lining-nums;
}

.num-talk {
  margin-top: 0.25rem;
  font-size: 0.6875rem;
  color: var(--color-text-muted);
  white-space: nowrap;
}

/* Citations run the full column like the rest of the page instead of stopping at the global 65ch cap */
.cite {
  max-width: none;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
  overflow-wrap: break-word;
}

.cite-title {
  font-weight: 500;
  color: var(--color-text-primary);
}

/* Links inside citation text need more than color to stand out (WCAG 1.4.1), so they carry a quiet underline */
.cite a {
  overflow-wrap: anywhere;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
  text-decoration-color: color-mix(in oklch, currentColor 40%, transparent);
}

.cite a:hover {
  text-decoration-color: currentColor;
}

.nowrap {
  white-space: nowrap;
}

.links {
  margin-top: 0.25rem;
  font-size: 0.8125rem;
}

@media (min-width: 640px) {
  .ref {
    --ref-gutter: 2.75rem;
  }
}

/* From desktop width the number column hangs in the margin so citations align with the body text; 0.75rem is the row padding plus the column gap */
@media (min-width: 1024px) {
  .ref {
    margin-left: calc(-1 * var(--ref-gutter) - 0.75rem);
  }

  .num {
    align-items: flex-end;
    padding-right: 1rem;
  }
}
</style>
