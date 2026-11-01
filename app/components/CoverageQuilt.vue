<script setup lang="ts">
import type { CoverageReadout, IdentificationAges, IdentificationDataKind, IdentificationStudy } from '~/types'

// The entrance glides the slider from the first year to the last over this long
const SWEEP_MS = 3200

// A count in the copy that the study data no longer yields fails the prerender, and with it the build
if (import.meta.server) {
  const errors = wpath2026QuiltCountErrors()
  if (errors.length) {
    const message = `CoverageQuilt: the figure copy no longer matches wpath2026Studies: ${errors.join(' | ')}`
    // The prerender log shows only "[500] Server Error", so the reason is printed first
    console.error(message)
    throw new Error(message)
  }
}

const studies = wpath2026Studies
const yearFrom = wpath2026YearFrom
const yearTo = wpath2026YearTo

// A no-break space keeps "+" with its word, so a narrow head breaks as "Codes / + fields" and never strands the "+". The source group picks the column's poster color: purple single-source, orange multi-source
const kinds: { id: IdentificationDataKind; label: string; words: string; source: 'single' | 'multi' }[] = [
  { id: 'codes', label: 'Codes', words: 'diagnosis codes alone', source: 'single' },
  { id: 'otherCoded', label: 'Other fields', words: 'other fields alone', source: 'single' },
  { id: 'noteText', label: 'Notes', words: 'notes alone', source: 'single' },
  { id: 'codesWithOther', label: 'Codes +\u00a0fields', words: 'diagnosis codes with other fields', source: 'multi' },
  { id: 'codedWithNotes', label: 'Codes or fields +\u00a0notes', words: 'codes or other fields with notes', source: 'multi' },
]

const ages: { id: IdentificationAges; label: string; gloss?: string; words: string }[] = [
  { id: 'adults', label: 'Adults', gloss: '18 and older', words: 'adults' },
  { id: 'mixed', label: 'Mixed ages', gloss: 'adolescents included', words: 'mixed ages' },
  // Some of these studies give a median or mean age but none says whether adolescents were included, so the row is "unclear", not "not reported"
  { id: 'unreported', label: 'Ages unclear', gloss: 'adolescents not stated', words: 'ages unclear' },
  { id: 'youth', label: 'Youth', words: 'youth' },
]

const sentenceCase = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

const rows = ages.map((age) => ({
  age,
  cells: kinds.map((kind) => {
    const inCell = studies.filter((study) => study.ages === age.id && study.kinds.includes(kind.id))
    return {
      key: `${age.id}-${kind.id}`,
      age,
      kind,
      studies: inCell,
      marks: inCell.map((study) => ({ ref: study.ref, year: study.year })),
    }
  }),
}))
type QuiltCell = (typeof rows)[number]['cells'][number]

// One square or study is selected at a time; shallowRef keeps the stored objects raw so identity checks hold
type Selection = { type: 'cell'; cell: QuiltCell } | { type: 'study'; study: IdentificationStudy }
const selection = shallowRef<Selection | null>(null)
const active = computed(() => {
  const current = selection.value
  return current?.type === 'cell' ? current.cell : current?.study
})
const litStudy = computed(() => (selection.value?.type === 'study' ? selection.value.study : undefined))

// A selected study, or the studies of a selected square, light up on the year ticks and in the study list as well
const litRefs = computed(() => {
  const current = selection.value
  if (!current) return []
  return current.type === 'study' ? [current.study.ref] : current.cell.studies.map((study) => study.ref)
})

function isOn(cell: QuiltCell): boolean {
  const current = selection.value
  if (current?.type === 'cell') return current.cell === cell
  if (current?.type === 'study') return cell.studies.includes(current.study)
  return false
}

// The slider starts at the last year, so the server-rendered quilt is complete
const year = ref(yearTo)
const yearTotal = computed(() => wpath2026StudiesBy(year.value).length)
const yearText = computed(() => `${year.value}, ${yearTotal.value} ${yearTotal.value === 1 ? 'study' : 'studies'}`)

// A cell's spoken count follows the slider, so it never announces studies the grid is not showing
function cellLabel(cell: QuiltCell): string {
  const shown = cell.studies.filter((study) => study.year <= year.value).length
  const by = year.value < yearTo ? ` by ${year.value}` : ''
  return `${sentenceCase(cell.kind.words)}, ${cell.age.words}: ${shown} ${shown === 1 ? 'study' : 'studies'}${by}`
}

// Thumb centres run from half a 44px thumb in at each end, so the ticks, end labels and filled track share that inset
const yearPosition = (value: number) => `calc(1.375rem + (100% - 2.75rem) * ${(value - yearFrom) / (yearTo - yearFrom)})`
// Each tick is the study's own mark, entering with its first grid mark
const yearTicks = [...new Set(studies.map((study) => study.year))].map((value) => ({
  year: value,
  left: yearPosition(value),
  studies: studies.filter((study) => study.year === value).map((study) => ({ ref: study.ref, hollow: study.ages === 'unreported' })),
}))

// The live text follows the reader's last action: the intro until then, the year after the slider moves, a square or study after a selection
const lastAction = ref<'none' | 'year' | 'select'>('none')

const readout = computed(() => {
  const current = selection.value
  if (lastAction.value === 'select' && current?.type === 'cell') {
    const links = current.cell.studies.map((study) => ({ ref: study.ref, text: `${study.name} ${study.year}` }))
    return { lead: `${sentenceCase(current.cell.kind.words)}, ${current.cell.age.words}.`, text: '', tail: '', cite: undefined, after: '', links }
  }
  if (lastAction.value === 'select' && current?.type === 'study') {
    const { study } = current
    const age = ages.find((row) => row.id === study.ages)?.words
    // Columns are the 2026 review's classification of each study's models, not every sub-analysis a paper reports, so the readout says "classified as" rather than "tested"
    const classified = wpath2026JoinWords(kinds.filter((kind) => study.kinds.includes(kind.id)).map((kind) => kind.words))
    // The lead already names the study, so its link names the reference instead
    return { lead: `${study.name} ${study.year}`, text: `, ${age}; classified as ${classified}.`, tail: '', cite: undefined, after: '', links: [{ ref: study.ref, text: `Reference ${study.ref}` }] }
  }
  const { lead, text, cite, after }: CoverageReadout = lastAction.value === 'year' ? wpath2026YearReadout(year.value) : { text: wpath2026QuiltIntro }
  // A citation keeps the word before it on its line
  const split = cite ? text.lastIndexOf(' ') + 1 : text.length
  return { lead, text: text.slice(0, split), tail: text.slice(split), cite, after: after ?? '', links: [] }
})

// Selecting and scrubbing the years are separate ways in: a selection shows the full quilt so its marks are all visible, a second press or Escape clears it, and moving the slider drops it
function select(next: Selection) {
  stopSweep()
  selection.value = active.value === (next.type === 'cell' ? next.cell : next.study) ? null : next
  lastAction.value = 'select'
  year.value = yearTo
}

function clearSelection() {
  selection.value = null
}

// Before the last year the patch shows only its pencilled stitch; reaching the last year again sews the accent stitch over it, a new key restarting the animation on a fresh element
const patchPending = computed(() => year.value < yearTo)
const stitchRun = ref(0)
watch(year, (now, before) => {
  if (now === yearTo && before < yearTo) stitchRun.value++
})

const figure = ref<HTMLElement | null>(null)
const grid = ref<HTMLElement | null>(null)
const slider = ref<HTMLInputElement | null>(null)
const landed = ref(false)
// The handle's position while the entrance glides it, between whole years; null at rest, when the slider shows the year itself
const sweepPos = ref<number | null>(null)
const sliderValue = computed(() => sweepPos.value ?? year.value)
let observer: IntersectionObserver | undefined
let cueObserver: IntersectionObserver | undefined
let sweepFrame: number | undefined
let landTimer: number | undefined
let cueTimer: number | undefined
let cueSpent = false

// Quadratic rather than cubic: a cubic start held the handle near 2016 for a full second, which read as nothing happening
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2)

// The entrance: the handle glides from the first year to the last, easing in and out, one frame at a time; each year's studies arrive as the handle passes their tick, so the quilt fills in print order and shows what the slider is for. Reaching the last year sews the This study patch (the year watch) and rings the lone youth study's cell, then the figure is simply at rest
function sweep() {
  const start = performance.now()
  const frame = (now: number) => {
    const t = Math.min(1, (now - start) / SWEEP_MS)
    const pos = yearFrom + (yearTo - yearFrom) * easeInOut(t)
    sweepPos.value = pos
    year.value = Math.floor(pos + 1e-6)
    if (t < 1) {
      sweepFrame = requestAnimationFrame(frame)
      return
    }
    stopSweep()
    landed.value = true
    // Long enough for both pings of the ring (2 x 950ms)
    landTimer = window.setTimeout(() => (landed.value = false), 2100)
  }
  sweepFrame = requestAnimationFrame(frame)
}

// Any touch, key or selection ends the entrance where it stands, so the reader is never fighting it
function stopSweep() {
  if (sweepFrame !== undefined) cancelAnimationFrame(sweepFrame)
  sweepFrame = undefined
  sweepPos.value = null
}

// Two nudges of 600ms each, matching the CSS animation
const CUE_MS = 1200

// The slider's handle nudges once per page load, when the whole slider is in view, so a first-time reader sees that it moves. The class is set on the element directly, so the server markup carries no trace of it
function cueWhenVisible() {
  const input = slider.value
  if (!input || cueSpent) return
  cueObserver = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return
    cueObserver?.disconnect()
    input.classList.add('is-cueing')
    cueTimer = window.setTimeout(stopCue, CUE_MS)
  }, { threshold: 1 })
  cueObserver.observe(input)
}

// Touching, dragging or focusing the slider ends the cue, and any entrance still playing, for good
function stopCue() {
  stopSweep()
  cueSpent = true
  slider.value?.classList.remove('is-cueing')
  cueObserver?.disconnect()
  window.clearTimeout(cueTimer)
}

function onYearInput(event: Event) {
  year.value = Math.round(Number((event.target as HTMLInputElement).value))
  selection.value = null
  lastAction.value = 'year'
  stopCue()
}

// On a phone the study list is one swipeable row; an edge fades only while studies remain beyond it, so the reader sees which way the row continues and when it ends
const chipList = ref<HTMLElement | null>(null)
const chipsAtStart = ref(true)
const chipsAtEnd = ref(true)
let chipResize: ResizeObserver | undefined

function updateChipEdges() {
  const list = chipList.value
  if (!list) return
  chipsAtStart.value = list.scrollLeft <= 1
  chipsAtEnd.value = list.scrollLeft + list.clientWidth >= list.scrollWidth - 1
}

// A chip tapped while half under a fade slides fully into view
function revealChip(event: MouseEvent) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ;(event.currentTarget as HTMLElement).scrollIntoView({ inline: 'nearest', block: 'nearest', behavior: reduce ? 'auto' : 'smooth' })
}

onMounted(() => {
  if (chipList.value && 'ResizeObserver' in window) {
    chipResize = new ResizeObserver(updateChipEdges)
    chipResize.observe(chipList.value)
  }
  const el = figure.value
  const quilt = grid.value
  if (!el || !quilt || !('IntersectionObserver' in window)) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  // Play the entrance only when the figure starts below the fold, so nobody watches it rewind; a figure already on screen stays whole and gets the handle cue instead
  if (el.getBoundingClientRect().top < window.innerHeight) {
    cueWhenVisible()
    return
  }
  year.value = yearFrom
  observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return
    observer?.disconnect()
    sweep()
  }, { threshold: 0.6 })
  observer.observe(quilt)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  cueObserver?.disconnect()
  chipResize?.disconnect()
  stopSweep()
  window.clearTimeout(landTimer)
  window.clearTimeout(cueTimer)
})
</script>

<template>
  <!-- The summary is read in place as the figure's first line; pointing aria-describedby at it as well read it twice -->
  <figure ref="figure" class="quilt" :class="{ 'is-landed': landed }" @keydown.esc="clearSelection">
    <p class="sr-only">{{ wpath2026QuiltSummary }}</p>

    <div ref="grid" class="q" :class="{ 'is-focused': selection }">
      <!-- Placed first by its explicit row span, the gutter holds its column empty, so the grid's other items flow around it -->
      <span class="q-gutter" aria-hidden="true" />
      <span aria-hidden="true" />
      <span class="q-group q-group-one"><span class="nowrap">Single-source</span> data</span>
      <span class="q-group q-group-two"><span class="nowrap">Multi-source</span> data</span>
      <span aria-hidden="true" />
      <span v-for="kind in kinds" :key="kind.id" class="q-head">{{ kind.label }}</span>

      <template v-for="row in rows" :key="row.age.id">
        <span class="q-row">{{ row.age.label }}<span v-if="row.age.gloss" class="q-gloss">{{ row.age.gloss }}</span></span>
        <template v-for="cell in row.cells" :key="cell.key">
          <button
            v-if="cell.studies.length"
            type="button"
            class="cell"
            :class="[cell.kind.source, { 'is-on': isOn(cell), 'is-youth': row.age.id === 'youth' }]"
            :aria-pressed="active === cell"
            :aria-label="cellLabel(cell)"
            @click="select({ type: 'cell', cell })"
          >
            <span class="marks" aria-hidden="true">
              <span
                v-for="mark in cell.marks"
                :key="mark.ref"
                class="mark"
                :class="{ 'hollow': row.age.id === 'unreported', 'is-lit': litStudy?.ref === mark.ref, 'is-future': mark.year > year }"
              />
            </span>
          </button>
          <span v-else class="cell empty" :class="[cell.kind.source, { 'is-on': isOn(cell) }]" aria-hidden="true" />
        </template>
      </template>

      <span class="q-foot-rule" aria-hidden="true" />
      <span class="q-row q-row-ours">This study</span>
      <span :key="stitchRun" class="patch" :class="{ 'is-pending': patchPending, 'is-stitching': stitchRun > 0 }">TGD adolescents<span class="patch-gloss">multi-source</span></span>

      <!-- The quilt's time axis: its label in the label column, the track across the data columns, so every year lines up with the squares above -->
      <div class="q-row years-label">
        <label for="quilt-year">Year in print</label>
        <span class="q-gloss years-value" aria-hidden="true">{{ year }}</span>
      </div>
      <div class="years">
        <!-- One mark per study at its year, stacked within a year: when the evidence arrived -->
        <div class="years-ticks" aria-hidden="true">
          <span v-for="tick in yearTicks" :key="tick.year" class="years-stack" :style="{ left: tick.left }">
            <span
              v-for="study in tick.studies"
              :key="study.ref"
              class="mark"
              :class="{ 'hollow': study.hollow, 'is-lit': litRefs.includes(study.ref), 'is-future': tick.year > year }"
            />
          </span>
        </div>
        <input
          id="quilt-year"
          ref="slider"
          type="range"
          :min="yearFrom"
          :max="yearTo"
          :step="sweepPos === null ? 1 : 'any'"
          :value="sliderValue"
          :aria-valuetext="yearText"
          :style="{ '--fill': yearPosition(sliderValue) }"
          @input="onYearInput"
          @pointerdown="stopCue"
          @focus="stopCue"
        >
        <div class="years-ends" aria-hidden="true">
          <span :style="{ left: yearPosition(yearFrom) }">{{ yearFrom }}</span>
          <span :style="{ left: yearPosition(yearTo) }">{{ yearTo }}</span>
        </div>
      </div>
    </div>

    <ul class="sr-only">
      <li v-for="row in rows" :key="row.age.id">
        {{ sentenceCase(row.age.words) }}
        <ul>
          <template v-for="cell in row.cells" :key="cell.key">
            <li v-if="cell.studies.length">{{ sentenceCase(cell.kind.words) }}: {{ cell.studies.map((study) => `${study.name} ${study.year}`).join(', ') }}</li>
          </template>
        </ul>
      </li>
      <li>This study: TGD adolescents, multi-source</li>
    </ul>

    <!-- Every control (grid, slider, study list) comes before the readout, so a growing readout never moves a control under the reader's finger -->
    <details class="index" @toggle="updateChipEdges">
      <summary>
        <span class="summary-text">Browse the {{ studies.length }} studies</span>
        <svg class="chevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 4.5 6 7.5 9 4.5" /></svg>
      </summary>
      <ul ref="chipList" class="chips" :class="{ 'fade-start': !chipsAtStart, 'fade-end': !chipsAtEnd }" @scroll.passive="updateChipEdges">
        <li v-for="study in studies" :key="study.ref">
          <button type="button" :class="{ 'is-future': study.year > year }" :aria-pressed="active === study" @click="select({ type: 'study', study }); revealChip($event)">
            <span class="mark" :class="{ 'hollow': study.ages === 'unreported', 'is-lit': litRefs.includes(study.ref), 'is-future': study.year > year }" aria-hidden="true" />{{ study.name }} <span class="chip-year">{{ study.year }}</span>
          </button>
        </li>
      </ul>
    </details>

    <div class="tour">
      <div class="tour-text" aria-live="polite">
        <p><b v-if="readout.lead">{{ readout.lead }}</b>{{ readout.text }}<span v-if="readout.cite" class="nowrap">{{ readout.tail }}<sup><a :href="`#ref-${readout.cite}`">{{ readout.cite }}</a></sup></span>{{ readout.after }}</p>
        <ul v-if="readout.links.length" class="tour-links">
          <li v-for="link in readout.links" :key="link.ref">
            <a :href="`#ref-${link.ref}`">{{ link.text }}</a>
          </li>
        </ul>
      </div>
    </div>
  </figure>
</template>

<style scoped>
/* Ages run down, data sources run across from single-source to multi-source, and this study is a patch at the foot */
.quilt {
  container-type: inline-size;
  margin: 1.5rem 0 0;
}

p {
  max-width: none;
}

.nowrap {
  white-space: nowrap;
}

/* Tailwind's reset already lifts sup by top: -0.5em; adding a vertical-align raise on top doubled it */
sup {
  margin-left: 0.0625rem;
  font-size: 0.6875rem;
}

/* A 44px target for the citation: the padding is cancelled by an equal negative margin, so the digit and the line stay where they were */
sup a {
  display: inline-block;
  min-width: 2.75rem;
  min-height: 2.75rem;
  padding: 1.375rem 1.25rem;
  margin: -1.375rem -1.25rem;
}

/* The label column gives way before the cells do, so every cell stays a 44px target at 360px; the narrow fifth track is the gutter between single-source and multi-source */
/* Labels never drop below 4.375rem, the width "adolescents" needs; below the grid's minimum width (those labels, five 2.75rem cells, the 0.5rem seam and six 2px gaps) the grid widens evenly into the page gutters instead of running off the right edge, as it did at 320px */
.q {
  display: grid;
  grid-template-columns: minmax(4.375rem, 5.75rem) repeat(3, minmax(2.75rem, 1fr)) 0.5rem repeat(2, minmax(2.75rem, 1fr));
  gap: 2px;
  margin-inline: min(0px, (100cqw - (18.625rem + 12px)) / 2);
}

.q-gutter {
  grid-row: 1 / span 6;
  grid-column: 5;
}

/* The hyphenated word never breaks, but "data" may drop to a second line over the two narrow multi-source columns on a phone; each head sits at the foot of its grid row, so a one-line and a two-line head share the same rule line. Plain inline text, not flex, so the words can wrap */
.q-group {
  align-self: end;
  padding-bottom: 0.25rem;
  border-bottom: 1.5px solid var(--color-text-primary);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-secondary);
}

/* The group heads are the color key: each names its columns in their color, over a rule of the same */
.q-group-one {
  grid-column: 2 / span 3;
  border-bottom-color: var(--color-source-single);
  color: var(--color-source-single);
}

.q-group-two {
  grid-column: 6 / span 2;
  border-bottom-color: var(--color-source-multi);
  color: var(--color-source-multi);
}

.q-head {
  display: flex;
  align-items: flex-end;
  min-height: 2.5rem;
  padding: 0.25rem 0.125rem 0.375rem;
  font-size: 0.75rem;
  line-height: 1.2;
  color: var(--color-text-muted);
}

.q-row {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 3rem;
  padding-right: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.2;
  color: var(--color-text-primary);
}

.q-gloss {
  font-weight: 400;
  color: var(--color-text-muted);
}

.q-row-ours {
  color: var(--color-accent);
}

.q-foot-rule {
  grid-column: 1 / -1;
  margin-top: 0.375rem;
  border-top: 1px solid var(--color-text-primary);
}

/* Square cells on a 2px knockout grid: each source group reads as one continuous field of color ruled by fine lines of the band showing through, as a printed figure would set it, not as a set of separate rounded tiles. An empty cell carries no placeholder; its emptiness is the finding */
.cell {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 3rem;
  border: 0;
  border-radius: 0;
  background-color: var(--color-bg-primary);
  transition: opacity 200ms ease-out, box-shadow 150ms ease-out;
}

/* Columns wear the poster's Venn tints, lavender for single-source and peach for multi-source, while every mark stays ink, so a study looks the same in the grid, on the year ticks and in the study list; the group heads and positions carry the same split, so color is never the only cue */
.cell.single {
  background-color: var(--color-source-single-tint);
}

.cell.multi {
  background-color: var(--color-source-multi-tint);
}

button.cell {
  cursor: pointer;
}

button.cell:hover,
button.cell:focus-visible {
  box-shadow: inset 0 0 0 1px var(--color-text-muted);
}

button.cell:focus-visible {
  z-index: 1;
}

.marks {
  display: grid;
  grid-template-columns: repeat(2, 0.5rem);
  gap: 0.25rem;
}

.mark {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 1px;
  background-color: var(--color-text-secondary);
  transition: background-color 150ms ease-out, opacity 320ms cubic-bezier(0.22, 1, 0.36, 1), transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
}

/* Hollow marks are the studies that did not state whether adolescents were included, so the row reads by shape as well as position */
.mark.hollow {
  background-color: transparent;
  box-shadow: inset 0 0 0 1.25px var(--color-text-secondary);
}

.mark.is-lit {
  background-color: var(--color-text-primary);
  transform: scale(1.35);
}

.mark.hollow.is-lit {
  background-color: var(--color-bg-primary);
  box-shadow: inset 0 0 0 2px var(--color-text-primary);
}

/* Stacked ticks would fuse if lit ones grew, so on the axis a lit tick keeps its size and the others step back like unselected cells */
.years .mark.is-lit {
  transform: none;
}

.q.is-focused .years .mark:not(.is-lit, .is-future) {
  opacity: 0.3;
}

/* Studies published after the slider's year leave the way they entered, in the grid and on the ticks; the extra class outranks the entrance should the two overlap */
.quilt .q .mark.is-future {
  opacity: 0;
  transform: scale(0.4);
}

/* In the study list a future study's mark only fades: a vanished mark left its gap and made the chip look indented */
.quilt .chips .mark.is-future {
  opacity: 0.35;
}

/* This study is a cream square like the others, across every data column so it names no data source, marked by a fine running stitch sewn just inside its edge and by its label: the stitch is pencilled in grey (::before) and sewn over in accent (::after) */
.patch {
  position: relative;
  grid-column: 2 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 3rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0;
  background-color: var(--color-bg-primary);
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.2;
  text-align: center;
  color: var(--color-accent);
  transition: color 200ms ease-out;
}

.patch-gloss {
  font-weight: 400;
}

.patch::before,
.patch::after {
  content: '';
  position: absolute;
  inset: 3px;
  border: 1px dashed var(--color-border);
  pointer-events: none;
}

/* The two stitches share an inset and width, so their dashes fall in the same places and the accent covers the pencil exactly */
.patch::after {
  border-color: var(--color-accent);
  transition: opacity 200ms ease-out;
}

/* Whatever the reader picked stays at full strength and the rest steps back */
.q.is-focused .cell:not(.is-on),
.q.is-focused .patch::after {
  opacity: 0.3;
}

/* The label turns muted rather than fading, so it keeps AA contrast on the cream */
.q.is-focused .patch,
.patch.is-pending {
  color: var(--color-text-muted);
}

/* Before the last year only the pencilled stitch shows */
.patch.is-pending::after {
  clip-path: inset(0 100% 0 0);
}

.q.is-focused .cell.is-on:not(.empty) {
  box-shadow: inset 0 0 0 1px var(--color-text-muted);
}

.q.is-focused .cell[aria-pressed='true'] {
  box-shadow: inset 0 0 0 2px var(--color-text-primary);
}

.tour {
  margin-top: 0.25rem;
}

/* The axis label sits level with the track: the bottom padding is the end labels plus half the input, less half the label */
.years-label {
  justify-content: flex-end;
  margin-top: 0.5rem;
  padding-bottom: 0.75rem;
}

.years-value {
  font-variant-numeric: tabular-nums;
}

.years {
  grid-column: 2 / -1;
  margin-top: 0.5rem;
}

/* The ticks sit just above the track; the negative margin tucks them into the top of the input's 44px box, 3px clear of the 22px handle */
.years-ticks {
  position: relative;
  height: 3rem;
  margin-bottom: -0.5rem;
  pointer-events: none;
}

.years-stack {
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column-reverse;
  gap: 2px;
  transform: translateX(-50%);
}

/* Only the 44px thumb takes pointer and touch input: a phone swipe that lands on the full-width track scrolls the page instead of jumping the year. Keyboard input is unaffected */
.years input {
  display: block;
  width: 100%;
  height: 2.75rem;
  margin: 0;
  background: transparent;
  pointer-events: none;
  appearance: none;
}

/* iOS Safari before 15.4 knows only the prefixed property; inline beside the unprefixed one, the minifier drops it as redundant for its targets */
@supports not (appearance: none) {
  .years input,
  .years input::-webkit-slider-thumb {
    -webkit-appearance: none;
  }
}

.years input::-webkit-slider-runnable-track {
  height: 2px;
  background: linear-gradient(to right, var(--color-text-primary) var(--fill), var(--color-border) var(--fill));
}

/* The handle is a 12 by 22px ink pill with two cream grip lines: transparent borders pad its box out to the 44px target, and the elliptical radius leaves a 6px round end inside them */
.years input::-webkit-slider-thumb {
  box-sizing: border-box;
  width: 2.75rem;
  height: 2.75rem;
  margin-top: calc(1px - 1.375rem);
  border: solid transparent;
  border-width: 11px 16px;
  border-radius: 22px / 17px;
  background: linear-gradient(var(--color-bg-primary), var(--color-bg-primary)) 4px center / 1px 0.5rem no-repeat padding-box, linear-gradient(var(--color-bg-primary), var(--color-bg-primary)) 7px center / 1px 0.5rem no-repeat padding-box, var(--color-text-primary) padding-box;
  cursor: grab;
  pointer-events: auto;
  appearance: none;
}

.years input:active::-webkit-slider-thumb {
  cursor: grabbing;
}

.years input::-moz-range-track {
  height: 2px;
  background-color: var(--color-border);
}

.years input::-moz-range-progress {
  height: 2px;
  background-color: var(--color-text-primary);
}

.years input::-moz-range-thumb {
  box-sizing: border-box;
  width: 2.75rem;
  height: 2.75rem;
  border: solid transparent;
  border-width: 11px 16px;
  border-radius: 22px / 17px;
  background: linear-gradient(var(--color-bg-primary), var(--color-bg-primary)) 4px center / 1px 0.5rem no-repeat padding-box, linear-gradient(var(--color-bg-primary), var(--color-bg-primary)) 7px center / 1px 0.5rem no-repeat padding-box, var(--color-text-primary) padding-box;
  cursor: grab;
  pointer-events: auto;
}

.years input:active::-moz-range-thumb {
  cursor: grabbing;
}

.years-ends {
  position: relative;
  height: 1.125rem;
  margin-top: -0.625rem;
  font-size: 0.75rem;
  line-height: 1.45;
  color: var(--color-text-muted);
  font-variant-numeric: tabular-nums;
}

.years-ends span {
  position: absolute;
  top: 0;
  transform: translateX(-50%);
}

/* No reserved height: the readout sits below every control, so its changing length moves only the footnote */
.tour-text {
  margin-top: 0.875rem;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--color-text-primary);
}

.tour-text b {
  font-weight: 600;
}

.tour-links {
  display: flex;
  flex-wrap: wrap;
  column-gap: 1.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.tour-links a {
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  color: var(--color-text-secondary);
  text-decoration: underline;
  text-decoration-color: color-mix(in oklch, currentColor 35%, transparent);
  text-underline-offset: 3px;
}

.tour-links a:hover,
.tour-links a:focus-visible {
  color: var(--color-text-primary);
  text-decoration-color: var(--color-accent);
}

.index {
  margin-top: 1rem;
  border-top: 1px solid var(--color-border);
}

/* The disclosure reads as a link, the page's own sign of something to press: link color, the quiet underline the references use, darkening on hover, beside a chevron that turns as it opens */
.index summary {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  min-height: 2.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-accent);
  cursor: pointer;
}

.summary-text {
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
  text-decoration-color: color-mix(in oklch, currentColor 40%, transparent);
  transition: text-decoration-color 150ms ease-out;
}

.index summary:hover {
  color: var(--color-accent-hover);
}

.index summary:hover .summary-text {
  text-decoration-color: currentColor;
}

/* The flex summary loses the native marker in most browsers; Safari keeps its own unless it is hidden */
.index summary::-webkit-details-marker {
  display: none;
}

.chevron {
  width: 0.75rem;
  height: 0.75rem;
  color: currentColor;
  transition: transform 150ms ease-out;
}

.index[open] .chevron {
  transform: rotate(180deg);
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin: 0.25rem 0 0;
  padding: 0;
  list-style: none;
}

/* Plain inline content keeps a word space between name and year; a flex button would trim it, and the native button already centres its text */
.chips button {
  min-height: 2.75rem;
  padding: 0 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background-color: var(--color-bg-primary);
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  cursor: pointer;
}

.chips button:hover {
  border-color: var(--color-text-muted);
  color: var(--color-text-primary);
}

.chips button[aria-pressed='true'] {
  border-color: var(--color-text-primary);
  box-shadow: inset 0 0 0 1px var(--color-text-primary);
  color: var(--color-text-primary);
}

.chip-year {
  color: var(--color-text-muted);
  font-variant-numeric: tabular-nums;
}

.chips .mark {
  display: inline-block;
  margin-right: 0.4375rem;
  vertical-align: 0.0625rem;
}

/* A study not yet published at the slider's year loses its mark and steps back, but its text keeps AA contrast because the chip stays a working control */
.chips button.is-future {
  border-color: var(--color-border-subtle);
  background-color: transparent;
  color: var(--color-text-muted);
}

/* Registered so the edge fades ease in and out instead of snapping */
@property --fade-start {
  syntax: '<length>';
  inherits: false;
  initial-value: 0px;
}

@property --fade-end {
  syntax: '<length>';
  inherits: false;
  initial-value: 0px;
}

/* On a phone the open list wrapped to seven rows (344px), so a tapped study lit marks in a grid already scrolled off screen; one swipeable row keeps the grid, slider and list on one screen. The row runs out to the screen edges through the page gutter (Container's clamp, kept in step by hand) while its chips rest on the text column, and each fade fills exactly that gutter, so a resting or revealed chip is never under one */
@container (max-width: 33.99rem) {
  .chips {
    --gutter: clamp(1.5rem, 5vw, 3rem);
    flex-wrap: nowrap;
    margin-inline: calc(var(--gutter) * -1);
    padding: 0.125rem var(--gutter) 0.375rem;
    scroll-padding-inline: var(--gutter);
    /* No scroll snap: with chips of uneven width it pulled a small reveal straight back to the start */
    overflow-x: auto;
    overscroll-behavior-x: contain;
    scrollbar-width: none;
    mask-image: linear-gradient(to right, transparent, #000 var(--fade-start), #000 calc(100% - var(--fade-end)), transparent);
    transition: --fade-start 200ms ease-out, --fade-end 200ms ease-out;
  }

  .chips.fade-start {
    --fade-start: var(--gutter);
  }

  .chips.fade-end {
    --fade-end: var(--gutter);
  }

  .chips::-webkit-scrollbar {
    display: none;
  }

  .chips li {
    flex: none;
  }

  /* In the reading font (ReadingFontToggle) the grid labels drop its extra spacing and step down to 11px, or "adolescents" and "+ fields" overrun their 44px columns on a phone; Lexend's taller x-height keeps 11px legible */
  :root[data-reading-font='lexend'] .q-head,
  :root[data-reading-font='lexend'] .q-row {
    font-size: 0.6875rem;
    letter-spacing: normal;
    word-spacing: normal;
  }

  /* A mouse has no swipe, so a narrow desktop window keeps a thin scrollbar in the border color */
  @media (pointer: fine) {
    .chips {
      scrollbar-width: thin;
      scrollbar-color: var(--color-border) transparent;
    }

    .chips::-webkit-scrollbar {
      display: block;
      height: 6px;
    }

    .chips::-webkit-scrollbar-thumb {
      border-radius: 3px;
      background-color: var(--color-border);
    }
  }
}

@container (min-width: 34rem) {
  .q {
    grid-template-columns: 11rem repeat(3, minmax(0, 1fr)) 1rem repeat(2, minmax(0, 1fr));
  }

  .q-row,
  .cell,
  .patch {
    min-height: 3.75rem;
  }

  .q-row {
    font-size: 0.875rem;
  }

  .q-group,
  .q-gloss,
  .q-head,
  .patch {
    font-size: 0.8125rem;
  }

  .marks {
    grid-template-columns: repeat(2, 0.625rem);
  }

  /* The ticks and list marks keep the narrow size, so five stacked ticks stay short */
  .q .marks .mark {
    width: 0.625rem;
    height: 0.625rem;
  }
}

/* The page's one authored moment, played by the slider itself (see sweep): each year's marks drop onto the quilt with a small spring, the lone youth study's cell rings once when it lands, and the patch is stitched across. Scrubbing the slider later gets the same spring, so the entrance and the control feel like one thing */
@media (prefers-reduced-motion: no-preference) {
  /* A short drop and a gentle back-out ease (about 5% overshoot): the mark settles into place rather than bouncing */
  .quilt .q .mark {
    transition: background-color 150ms ease-out, opacity 320ms cubic-bezier(0.22, 1, 0.36, 1), transform 560ms cubic-bezier(0.34, 1.3, 0.64, 1);
  }

  .quilt .q .mark.is-future {
    transform: translateY(-0.375rem) scale(0.6);
  }

  /* A crisp square ping, like a sonar return, off the one youth study as it lands */
  .is-landed .cell.is-youth:not(.empty)::before {
    content: '';
    position: absolute;
    inset: 0;
    border: 2px solid var(--color-accent);
    pointer-events: none;
    animation: youth-ring 950ms cubic-bezier(0.3, 0.5, 0.4, 1) 2 forwards;
  }

  .patch.is-stitching::after {
    animation: stitch 900ms cubic-bezier(0.65, 0, 0.35, 1);
  }

  /* The arrival cue: the handle alone nudges left and back, twice; the value, track and ticks stay still */
  .years input.is-cueing::-webkit-slider-thumb {
    animation: thumb-nudge 600ms ease-in-out 2;
  }

  .years input.is-cueing::-moz-range-thumb {
    animation: thumb-nudge 600ms ease-in-out 2;
  }
}

/* Held at full strength for the first beat, then spreading as it fades, so each of the two pings is long enough to catch */
@keyframes youth-ring {
  0% {
    opacity: 1;
    transform: scale(1);
  }

  25% {
    opacity: 0.9;
    transform: scale(1.08);
  }

  100% {
    opacity: 0;
    transform: scale(1.5);
  }
}

@keyframes thumb-nudge {
  50% {
    transform: translateX(-6px);
  }
}

@keyframes stitch {
  from {
    clip-path: inset(0 100% 0 0);
  }
  to {
    clip-path: inset(0);
  }
}
</style>
