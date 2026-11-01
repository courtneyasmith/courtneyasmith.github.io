<script setup lang="ts">
// chip: the header's quick toggle (labelled from lg up); row: the same setting spelled out in the phone menu, where the header has no room for words
withDefaults(defineProps<{ variant?: 'chip' | 'row' }>(), { variant: 'chip' })

// Shared by every instance, so the header chip and the menu row never disagree; the server renders it off for everyone and the real state is read on mount from <html>, where the inline head script has already applied any saved choice
const isOn = useState('reading-font', () => false)

onMounted(() => {
  isOn.value = document.documentElement.dataset.readingFont === 'lexend'
})

function toggle() {
  isOn.value = !isOn.value
  const root = document.documentElement
  if (isOn.value) root.dataset.readingFont = 'lexend'
  else delete root.dataset.readingFont
  try {
    if (isOn.value) localStorage.setItem('reading-font', 'lexend')
    else localStorage.removeItem('reading-font')
  }
  catch {
    // Storage blocked (private browsing, strict settings): the choice still holds until the next full page load
  }
}
</script>

<template>
  <button
    v-if="variant === 'chip'"
    type="button"
    class="chip"
    :aria-pressed="isOn"
    title="Dyslexia-friendly font"
    @click="toggle"
  >
    <svg class="glyph" width="17" height="12" viewBox="0 0 20 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M1.5 13 6 1.5 10.5 13M3.2 9h5.6" />
      <circle cx="15" cy="9.5" r="3.25" />
      <path d="M18.25 6.25V13" />
    </svg>
    <span class="sr-only lg:not-sr-only lg:whitespace-nowrap">Dyslexia-friendly font</span>
  </button>

  <button
    v-else
    type="button"
    class="row"
    :aria-pressed="isOn"
    @click="toggle"
  >
    <span class="flex items-center gap-3">
      <svg class="glyph" width="17" height="12" viewBox="0 0 20 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M1.5 13 6 1.5 10.5 13M3.2 9h5.6" />
        <circle cx="15" cy="9.5" r="3.25" />
        <path d="M18.25 6.25V13" />
      </svg>
      Dyslexia-friendly font
    </span>
    <span class="state" aria-hidden="true">{{ isOn ? 'On' : 'Off' }}</span>
  </button>
</template>

<style scoped>
/* The chip borrows the site's pill vocabulary (filter pills, About page pills): a cream pill with a border reads as a button; on is solid blue, so the state shows in fill and contrast, not hue alone */
.chip {
  position: relative;
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-width: 2.75rem;
  min-height: 2.25rem;
  margin-block: -0.25rem;
  padding-inline: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 9999px;
  background-color: var(--color-bg-secondary);
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 150ms ease-out, border-color 150ms ease-out, color 150ms ease-out, transform 150ms ease-out;
}

/* The pill is 36px so it sits in the 28px nav row without growing the header; this layer, measured from inside the 1px border, makes the tap target 44px tall */
.chip::before {
  content: '';
  position: absolute;
  inset: calc(-0.25rem - 1px) -1px;
}

/* Hover only where a pointer can hover: on a phone a tap would otherwise leave the hover shade on until the next tap elsewhere */
@media (hover: hover) {
  .chip:hover {
    border-color: var(--color-text-muted);
    color: var(--color-text-primary);
  }

  .row:hover {
    background-color: var(--color-bg-secondary);
    color: var(--color-text-primary);
  }

  :root[data-reading-font='lexend'] .chip:hover {
    border-color: var(--color-accent-hover);
    background-color: var(--color-accent-hover);
  }
}

.chip:active {
  transform: scale(0.97);
}

@media (min-width: 1024px) {
  .chip {
    padding-inline: 0.75rem 0.9375rem;
  }
}

/* Sized in em so the glyph grows with the reader's text size instead of shrinking beside it */
.glyph {
  display: block;
  flex: none;
  width: 1.2em;
  height: auto;
}

/* The menu row matches the menu's links, with the state spelled out in a small pill on the right */
.row {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 1.5rem;
  color: var(--color-text-secondary);
  font-size: 1rem;
  text-align: left;
  cursor: pointer;
  transition: background-color 150ms ease-out, color 150ms ease-out;
}

.state {
  min-width: 2.75rem;
  padding: 0.0625rem 0.625rem;
  border: 1px solid var(--color-border);
  border-radius: 9999px;
  background-color: var(--color-bg-secondary);
  font-size: 0.8125rem;
  text-align: center;
}

/* On follows the attribute on <html>, set before first paint, so a returning reader sees it on before the page's script loads; aria-pressed catches up on mount */
:root[data-reading-font='lexend'] .chip,
:root[data-reading-font='lexend'] .state {
  border-color: var(--color-accent);
  background-color: var(--color-accent);
  color: var(--color-bg-primary);
}

/* Forced colors would repaint the fill as background, leaving on and off identical */
@media (forced-colors: active) {
  :root[data-reading-font='lexend'] .chip,
  :root[data-reading-font='lexend'] .state {
    forced-color-adjust: none;
    border-color: Highlight;
    background-color: Highlight;
    color: HighlightText;
  }
}
</style>
