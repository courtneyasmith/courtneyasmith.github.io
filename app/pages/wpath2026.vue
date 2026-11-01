<script setup lang="ts">
const title = 'WPATH 2026 References'
const description = 'Validation of a Multi-Source Electronic Health Record Algorithm for Transgender and Gender-Diverse Adolescent Cohorts, presented at the WPATH 29th Scientific Symposium by Courtney A. Smith, MD, MS.'

useSeoMeta({ title, description, ogTitle: title, ogDescription: description })

const coauthors = ['Amy Villanueva', 'Jorge Arcos Flautero, MD', 'Maliha Khan, MD', 'Jayden Galamgam, MD', 'Carol E. Cheng, MD', 'Marcia Hogeling, MD']

// From desktop width the column widens to 42rem of text, the figure's width, so text and figure share both edges
const columnClass = 'lg:max-w-[48rem]'
</script>

<template>
  <div class="wpath">
    <Container size="prose" :class="columnClass">
      <header class="pt-14">
        <!-- Hyphenated compounds stay whole: a break after the hyphen strands "Diverse" or "Source" at a line start -->
        <h1 class="title">Validation of a <span class="nowrap">Multi-Source</span> Electronic Health Record Algorithm for Transgender and <span class="nowrap">Gender-Diverse</span> Adolescent Cohorts</h1>
        <p class="authors">
          <NuxtLink to="/about" class="nowrap">Courtney A. Smith, MD, MS</NuxtLink><template v-for="name in coauthors" :key="name">, <span class="nowrap">{{ name }}</span></template>
        </p>
        <p class="affiliation">UCLA Division of Dermatology and Department of Medicine</p>
        <dl class="ticket">
          <div>
            <dt>Poster</dt>
            <dd>WPATH 29th Scientific Symposium, <span class="nowrap">November 12, 2026</span></dd>
          </div>
          <div>
            <dt>Session</dt>
            <dd>Moderated poster session MP14, <span class="nowrap">Regency F,</span> <span class="nowrap">10:15 to 10:45 AM</span></dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>Mexico City, Mexico</dd>
          </div>
        </dl>
      </header>

      <p class="summary">
        Research on the care and health needs of <strong>transgender and <span class="nowrap">gender-diverse</span> (TGD) adolescents</strong> often relies on cohorts built from <strong>electronic health record (EHR) data</strong>. This study investigates how an algorithm using <strong><span class="nowrap">multi-source</span> instead of <span class="nowrap">single-source</span> EHR data</strong> performs in constructing TGD adolescent cohorts.
      </p>
      <p class="availability">The full poster is in the WPATH 2026 app.</p>

      <section class="why" aria-labelledby="why-heading">
        <h2 id="why-heading" class="section-heading">Why was this study needed?</h2>
        <ol class="chain">
          <li>
            <h3>Performance differs by data source</h3>
            <p>Models requiring structured and note data averaged a 97.1% positive predictive value <span class="nowrap">(PPV).<sup><a href="#ref-1">1</a></sup></span></p>
            <span class="arrow" aria-hidden="true"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2v8M2.5 6.5 6 10l3.5-3.5" /></svg></span>
          </li>
          <li>
            <h3>Single indicators vary in performance</h3>
            <p>Sex and gender field discordance alone had PPVs of <span class="nowrap">0%<sup><a href="#ref-3">3</a></sup></span> and <span class="nowrap">84.4%.<sup><a href="#ref-4">4</a></sup></span></p>
            <span class="arrow" aria-hidden="true"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2v8M2.5 6.5 6 10l3.5-3.5" /></svg></span>
          </li>
          <li>
            <h3>Adolescents may need distinct algorithms</h3>
            <p>Electronic health record data underrepresent TGD youth compared with survey <span class="nowrap">data,<sup><a href="#ref-5">5</a></sup></span> accuracy can vary by <span class="nowrap">age,<sup><a href="#ref-6">6</a></sup></span> and algorithms validated in adults may not <span class="nowrap">generalize.<sup><a href="#ref-2">2</a></sup></span></p>
          </li>
        </ol>
      </section>
    </Container>

    <section class="band" aria-labelledby="quilt-heading">
      <Container size="prose" :class="columnClass">
        <h2 id="quilt-heading" class="section-heading">Prior validations by age and data</h2>
        <p class="caption">Each mark is a study, placed in its age row under each source its models used.</p>
        <CoverageQuilt aria-labelledby="quilt-heading" />
        <!-- One journal-style footnote holds every definition, so nothing but the caption stands between the heading and the figure -->
        <p class="figure-note"><b>Codes</b>, gender-related diagnosis codes; <b>Other fields</b>, other coded data such as sex or gender fields, prescriptions or procedures; <b>Notes</b>, words or phrases in clinicians' notes. Open marks are studies that did not state whether adolescents were included. Prior validations used different populations and reference standards. Categories are based on the 2026 scoping <span class="nowrap">review;<sup><a href="#ref-1">1</a></sup></span> literature as of October 2026.</p>
      </Container>
    </section>

    <Container size="prose" :class="columnClass">
      <section class="references" aria-labelledby="references-heading">
        <h2 id="references-heading" class="references-heading">References</h2>
        <ol class="reference-list">
          <PosterReference v-for="reference in wpath2026References" :key="reference.poster" :reference="reference" />
        </ol>
      </section>
    </Container>

    <PosterClosing :column-class="columnClass" vcard="/courtney-a-smith-wpath2026.vcf" />
  </div>
</template>

<style scoped>
/* The page wears its poster's teal in place of the site blue, so links, focus rings, selection and the figure's "This study" seam all follow it */
.wpath {
  --color-accent: var(--color-wpath-teal);
  --color-accent-hover: var(--color-wpath-teal-hover);
  --color-accent-subtle: var(--color-wpath-teal-subtle);
  --color-focus-ring: var(--color-wpath-teal);
}

.wpath ::selection {
  background-color: var(--color-wpath-teal-subtle);
}

/* The global 65ch cap would stop paragraphs short of the figure's right edge; here the column is the measure */
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

/* The title stays in ink for legibility at display size; the section heads below carry the poster's teal */
.title {
  font-size: clamp(1.875rem, 5.4vw, 2.875rem);
  line-height: 1.1;
  letter-spacing: -0.018em;
  text-wrap: balance;
  color: var(--color-text-primary);
}

.authors {
  margin-top: 1.25rem;
  font-size: 0.9375rem;
  line-height: 1.55;
  color: var(--color-text-primary);
}

.authors a {
  font-weight: 500;
  color: var(--color-text-primary);
}

.authors a:hover {
  color: var(--color-accent);
}

.affiliation {
  font-size: 0.9375rem;
  color: var(--color-text-muted);
}

/* The event reads as a ticket: three labelled stubs between two hairlines, side by side once there is room */
.ticket {
  display: grid;
  gap: 0.875rem;
  margin: 1.75rem 0 0;
  padding: 1rem 0;
  border-block: 1px solid var(--color-border);
}

.ticket div {
  display: grid;
  align-content: start;
  gap: 0.125rem;
}

.ticket dt {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-accent);
}

/* Balanced lines keep a short word such as "Symposium," from ending up alone on a line */
.ticket dd {
  margin: 0;
  text-wrap: balance;
  font-size: 0.9375rem;
  line-height: 1.45;
  color: var(--color-text-secondary);
}

.summary {
  margin-top: 2rem;
  font-size: 1.0625rem;
  line-height: 1.75;
}

/* Key phrases stay in bold ink: on this page teal means a link, so teal emphasis read as links */
.summary strong {
  font-weight: 600;
  color: var(--color-text-primary);
}

.availability {
  margin-top: 1rem;
  font-size: 0.9375rem;
  color: var(--color-text-muted);
}

.section-heading {
  font-size: clamp(1.25rem, 3.4vw, 1.5rem);
  color: var(--color-accent);
}

.why {
  margin-top: 3rem;
}

/* Three claims read as a chain into the figure: stacked on a phone, side by side from tablet width */
.chain {
  display: grid;
  margin: 1.25rem 0 0;
  padding: 0;
  list-style: none;
}

.chain li {
  position: relative;
  padding: 1rem 0;
  border-top: 1px solid var(--color-border);
}

.chain li:first-child {
  border-top: 1.5px solid var(--color-accent);
}

/* Balanced so a two-line claim never strands its last word */
.chain h3 {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.35;
  text-wrap: balance;
}

.chain p {
  margin-top: 0.375rem;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

/* The chip sits on the divider below its claim, cut out of the rule by the page ground */
.arrow {
  position: absolute;
  bottom: -0.5625rem;
  left: 0;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 50%;
  background-color: var(--color-bg-primary);
  color: var(--color-accent);
}

.arrow svg {
  width: 0.75rem;
  height: 0.75rem;
}

.band {
  margin-top: 3.5rem;
  padding-block: 2.75rem 3rem;
  border-block: 1px solid var(--color-border-subtle);
  background-color: var(--color-bg-secondary);
}

/* The figure's heading stays ink so the purple and orange below it are the band's only color */
.band .section-heading {
  color: var(--color-text-primary);
}

.caption {
  margin-top: 0.5rem;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: var(--color-text-secondary);
}

.figure-note {
  margin-top: 1rem;
  font-size: 0.8125rem;
  line-height: 1.5;
  color: var(--color-text-muted);
}

.figure-note b {
  font-weight: 600;
  color: var(--color-text-secondary);
}

.references {
  margin-top: 3.5rem;
}

.references-heading {
  font-size: clamp(1.25rem, 3vw, 1.625rem);
  color: var(--color-accent);
}

.reference-list {
  margin: 1rem 0 0;
  padding: 0;
  list-style: none;
}

/* The references read as quiet footnotes here: smaller text, titles in the body grey, tighter rows and PubMed on the DOI's line. PosterReference itself stays as /pedra2026 uses it */
.reference-list :deep(.ref) {
  --ref-gutter: 2rem;
  padding-block: 0.5rem;
}

.reference-list :deep(.num-poster) {
  font-size: 0.8125rem;
}

/* The citation and its PubMed link now share line boxes, so their wrapper sets the size and leading; set on the inline text alone, the wrapper's 16px line would still space every line */
.reference-list :deep(.ref > :last-child) {
  font-size: 0.8125rem;
  line-height: 1.5;
}

.reference-list :deep(.cite) {
  font-size: inherit;
  line-height: inherit;
}

.reference-list :deep(.cite-title) {
  color: var(--color-text-secondary);
}

.reference-list :deep(.cite),
.reference-list :deep(.links) {
  display: inline;
}

/* A word space widened into a small gap between the DOI and PubMed; at a line break it hangs, so a wrapped PubMed link starts flush */
.reference-list :deep(.links)::before {
  content: ' ';
  word-spacing: 0.375rem;
}

/* Now inside the running text, PubMed needs more than color to read as a link (WCAG 1.4.1), so it takes the DOI's quiet underline */
.reference-list :deep(.links a) {
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
  text-decoration-color: color-mix(in oklch, currentColor 40%, transparent);
}

.reference-list :deep(.links a:hover) {
  text-decoration-color: currentColor;
}

@media (min-width: 640px) {
  /* The location track takes its content width, so "Mexico City, Mexico" stays on one line; the session gets a little more of the rest so "Regency F," never strands its letter */
  .ticket {
    grid-template-columns: 1fr 1.2fr auto;
    gap: 0;
  }

  .ticket div {
    padding: 0 1.25rem;
    border-left: 1px solid var(--color-border);
  }

  .ticket div:first-child {
    padding-left: 0;
    border-left: 0;
  }

  .ticket div:last-child {
    padding-right: 0;
  }
}

@media (min-width: 768px) {
  .chain {
    grid-template-columns: repeat(3, 1fr);
    border-top: 1.5px solid var(--color-accent);
  }

  .chain li,
  .chain li:first-child {
    padding: 1rem 1.5rem 0.25rem 0;
    border-top: 0;
  }

  .chain li + li {
    padding-left: 1.5rem;
    border-left: 1px solid var(--color-border);
  }

  .arrow {
    top: 1.125rem;
    right: -0.5625rem;
    bottom: auto;
    left: auto;
    transform: rotate(-90deg);
  }
}
</style>
