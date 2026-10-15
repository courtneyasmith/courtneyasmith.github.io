<script setup lang="ts">
const AXIS_FIRST = 2010
const AXIS_LAST = 2026
const STAGGER_MS = 45

const images = pedra2026ImageReviews
const online = pedra2026OnlineTextStudies
const onlineText = pedra2026ReferencesIn(online)

// The 1rem inset at both ends keeps the 2010 and 2026 labels inside the frame
function x(year: number): string {
  return `calc(1rem + (100% - 2rem) * ${(year - AXIS_FIRST) / (AXIS_LAST - AXIS_FIRST)})`
}

const stackHeight = new Map<number, number>()
const dots = onlineText.map((reference, index) => {
  const level = stackHeight.get(reference.year) ?? 0
  stackHeight.set(reference.year, level + 1)
  const label = `${reference.authors.split(' ')[0] ?? ''} ${reference.year}`
  return {
    poster: reference.poster,
    label,
    tipLeft: reference.year >= 2023,
    style: {
      'left': x(reference.year),
      'bottom': `calc(0.625rem + ${level} * 0.9375rem)`,
      '--delay': `${index * STAGGER_MS}ms`,
    },
  }
})

const ticks = Array.from({ length: AXIS_LAST - AXIS_FIRST + 1 }, (_, i) => AXIS_FIRST + i).map((year) => ({
  year,
  left: x(year),
  labelled: year % 2 === 0,
  // Narrow figures label every fourth year counted back from 2026, so both ends stay labelled
  narrowLabel: (AXIS_LAST - year) % 4 === 0,
}))

const entranceMs = onlineText.length * STAGGER_MS
const oursStyle = { 'left': x(AXIS_LAST), '--delay': `${entranceMs + 160}ms` }
const ringStyle = { '--delay': `${entranceMs + 420}ms` }

const figure = ref<HTMLElement | null>(null)
const armed = ref(false)
const playing = ref(false)
let observer: IntersectionObserver | undefined
let settleTimer: number | undefined

onMounted(() => {
  const el = figure.value
  if (!el || !('IntersectionObserver' in window)) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  // Stage the entrance only when the figure starts below the fold; arming one already on screen would blink it out
  if (el.getBoundingClientRect().top < window.innerHeight) return
  armed.value = true
  observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return
    observer?.disconnect()
    playing.value = true
    // Drop the entrance classes afterwards so hover styles are no longer outranked
    settleTimer = window.setTimeout(() => {
      armed.value = false
      playing.value = false
    }, entranceMs + 1600)
  }, { threshold: 0.4 })
  observer.observe(el)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  window.clearTimeout(settleTimer)
})
</script>

<template>
  <figure ref="figure" class="lit" :class="{ 'is-armed': armed, 'is-playing': playing }">
    <figcaption class="lit-cap">Published acne studies using automated image or text analysis</figcaption>

    <div class="lit-row">
      <div class="lit-label">
        <span class="badge" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4.5 7.5h3l1.6-2.5h5.8l1.6 2.5h3a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18V9a1.5 1.5 0 0 1 1.5-1.5z" />
            <circle cx="12" cy="13.25" r="3.25" />
          </svg>
        </span>
        Images
      </div>
      <div class="lit-plot plot-bar">
        <div class="bar">
          <span><b>100+</b> studies used acne <span class="nowrap">images<sup><a :href="`#ref-${images.first}`">{{ images.first }}</a>,<a :href="`#ref-${images.last}`">{{ images.last }}</a></sup></span></span>
        </div>
      </div>
    </div>

    <div class="lit-row">
      <div class="lit-label">
        <span class="badge" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5.5 4.5h13a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H11l-4.5 3.5v-3.5h-1a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z" />
            <path d="M8 9h8M8 12h5" />
          </svg>
        </span>
        Online text
      </div>
      <p class="lit-desc">
        <b>{{ onlineText.length }}</b> studies used acne product reviews, forums, or social media <span class="nowrap">posts<sup><a :href="`#ref-${online.first}`">{{ online.first }}</a>-<a :href="`#ref-${online.last}`">{{ online.last }}</a></sup></span>
      </p>
      <div class="lit-plot plot-dots">
        <a
          v-for="dot in dots"
          :key="dot.poster"
          :href="`#ref-${dot.poster}`"
          class="dot"
          :class="{ 'tip-left': dot.tipLeft }"
          :style="dot.style"
          :data-label="dot.label"
          :aria-label="dot.label"
        />
      </div>
    </div>

    <div class="lit-row">
      <div class="lit-label">
        <span class="badge badge-ours" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
            <path d="M7 3.5h6.5L18.5 8.5v10.5a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5z" />
            <path d="M13.5 3.5v5h5" />
            <path d="M8.5 12.5h7M8.5 16h4.5" />
          </svg>
        </span>
        Clinical notes
      </div>
      <div class="lit-plot plot-ours">
        <span class="ours" :style="oursStyle">
          <span class="ours-text">
            <b>This study</b>
            <span>acne features in clinical notes</span>
          </span>
          <span class="ours-mark" :style="ringStyle" />
        </span>
      </div>
    </div>

    <div class="lit-axis">
      <div class="lit-plot" aria-hidden="true">
        <template v-for="tick in ticks" :key="tick.year">
          <span class="tick" :style="{ left: tick.left }" />
          <span v-if="tick.labelled" class="tick-label" :class="{ 'wide-only': !tick.narrowLabel }" :style="{ left: tick.left }">{{ tick.year }}</span>
        </template>
      </div>
    </div>

    <p class="lit-note">Each dot = one study. Click a dot to go to the study's reference.</p>
  </figure>
</template>

<style scoped>
/* A journal-table frame (heavy top and bottom rules, shaded stub column) around a dot plot */
.lit {
  container-type: inline-size;
  margin: 1.25rem 0 0;
}

.lit-cap {
  padding-bottom: 0.625rem;
  border-bottom: 1.5px solid var(--color-text-primary);
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.lit-row {
  display: grid;
  grid-template-areas: "label" "desc" "plot";
  padding: 0.875rem 0 0.75rem;
  border-bottom: 1px solid var(--color-border);
}

.lit-label {
  grid-area: label;
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 1.25;
  color: var(--color-text-primary);
}

.badge {
  display: inline-grid;
  place-items: center;
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: var(--color-text-secondary);
  color: var(--color-bg-primary);
}

.badge svg {
  width: 1.0625rem;
  height: 1.0625rem;
}

.badge-ours {
  background-color: var(--color-accent);
}

.lit-desc {
  grid-area: desc;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.45;
  color: var(--color-text-secondary);
  text-wrap: balance;
}

.lit-desc b,
.bar b {
  font-weight: 600;
}

.nowrap {
  white-space: nowrap;
}

/* Tailwind's reset already lifts sup by top: -0.5em; adding a vertical-align raise on top doubled it */
sup {
  margin-left: 0.0625rem;
  font-size: 0.6875rem;
}

.lit-plot {
  grid-area: plot;
  position: relative;
}

.plot-bar {
  padding-top: 0.625rem;
}

.bar {
  display: flex;
  align-items: center;
  height: 2.25rem;
  padding: 0 0.75rem;
  border-radius: 3px;
  background-color: var(--color-text-secondary);
  color: var(--color-bg-primary);
  font-size: 0.875rem;
  white-space: nowrap;
}

.bar a {
  color: var(--color-bg-primary);
  text-decoration: underline;
  text-decoration-color: oklch(99% 0.004 60 / 0.45);
  text-underline-offset: 2px;
}

.bar a:hover {
  color: var(--color-bg-primary);
  text-decoration-color: currentColor;
}

.plot-dots {
  height: 4.75rem;
}

.dot {
  position: absolute;
  width: 0.75rem;
  height: 0.75rem;
  margin-left: -0.375rem;
  border-radius: 50%;
  background-color: var(--color-text-secondary);
  transition: transform 180ms ease-out, background-color 180ms ease-out;
}

.dot:hover,
.dot:focus-visible {
  z-index: 2;
  background-color: var(--color-accent);
  text-decoration: none;
  transform: scale(1.3);
}

.dot::after {
  content: attr(data-label);
  position: absolute;
  bottom: calc(100% + 0.5rem);
  left: 50%;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background-color: var(--color-text-primary);
  color: var(--color-bg-primary);
  font-size: 0.75rem;
  line-height: 1.3;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transform: translateX(-50%);
  transition: opacity 120ms ease-out;
}

.dot.tip-left::after {
  right: -0.25rem;
  left: auto;
  transform: none;
}

.dot:hover::after,
.dot:focus-visible::after {
  opacity: 1;
}

.plot-ours {
  height: 3.5rem;
}

.ours {
  position: absolute;
  top: 50%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transform: translate(calc(-100% + 0.375rem), -50%);
}

.ours-text {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  line-height: 1.3;
  text-align: right;
  white-space: nowrap;
}

.ours-text b {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-accent);
}

.ours-text span {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
}

/* Same size as the study dots above: this study is one more study, set apart by color alone */
.ours-mark {
  position: relative;
  flex-shrink: 0;
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background-color: var(--color-accent);
}

.ours-mark::after {
  content: '';
  position: absolute;
  inset: 0;
  border: 2px solid var(--color-accent);
  border-radius: 50%;
  opacity: 0;
}

.lit-axis {
  display: grid;
  border-top: 1.5px solid var(--color-text-primary);
}

.lit-axis .lit-plot {
  grid-area: auto;
  height: 1.875rem;
}

.tick {
  position: absolute;
  top: 0;
  width: 1px;
  height: 0.3125rem;
  background-color: var(--color-text-muted);
}

.tick-label {
  position: absolute;
  top: 0.4375rem;
  font-size: 0.75rem;
  color: var(--color-text-muted);
  font-variant-numeric: tabular-nums;
  transform: translateX(-50%);
}

.tick-label.wide-only {
  display: none;
}

.lit-note {
  margin-top: 0.75rem;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

/* Wide figures become a table: a shaded stub column of row labels beside the plot */
@container (min-width: 34rem) {
  .lit-row {
    grid-template-columns: 11.25rem 1fr;
    grid-template-areas: "label desc" "label plot";
    padding: 0;
  }

  .lit-label {
    align-self: stretch;
    padding: 1rem 0.875rem;
    background-color: var(--color-bg-secondary);
    white-space: nowrap;
  }

  .lit-desc {
    margin: 0.875rem 1.25rem 0;
  }

  .lit-plot {
    margin: 0 1.25rem;
  }

  .plot-bar {
    padding: 0.875rem 1rem;
  }

  .plot-ours {
    height: 4.25rem;
  }

  .lit-axis {
    grid-template-columns: 11.25rem 1fr;
  }

  .lit-axis .lit-plot {
    grid-column: 2;
  }

  .tick-label.wide-only {
    display: block;
  }
}

/* The page's one authored moment: stacks build up year by year, then this study lands with a single ring */
@media (prefers-reduced-motion: no-preference) {
  .is-armed .dot {
    opacity: 0;
    transform: translateY(6px);
  }

  .is-armed .ours {
    opacity: 0;
    transform: translate(calc(-100% + 0.375rem), calc(-50% + 6px));
  }

  .is-armed.is-playing .dot,
  .is-armed.is-playing .ours {
    opacity: 1;
    transition: opacity 380ms cubic-bezier(0.22, 1, 0.36, 1), transform 380ms cubic-bezier(0.22, 1, 0.36, 1);
    transition-delay: var(--delay, 0ms);
  }

  .is-armed.is-playing .dot {
    transform: none;
  }

  .is-armed.is-playing .ours {
    transform: translate(calc(-100% + 0.375rem), -50%);
  }

  .is-armed.is-playing .ours-mark::after {
    animation: ours-ring 1100ms cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0ms) 1;
  }
}

@keyframes ours-ring {
  0% {
    opacity: 0.7;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(2.8);
  }
}
</style>
