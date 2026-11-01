<script setup lang="ts">
const title = 'PeDRA 2026 References'
const description = 'References for Extracting Pediatric Acne Features from Clinical Notes: Design and Validation Protocol, presented at PeDRA 2026 by Courtney A. Smith, MD, MS.'

useSeoMeta({ title, description, ogTitle: title, ogDescription: description })

const referenceGroups = pedra2026ReferenceGroups.map((group) => ({
  ...group,
  references: pedra2026ReferencesIn(group),
}))

// From desktop width the column widens to 42rem of text, the figure's width, so text and figure share both edges
const columnClass = 'lg:max-w-[48rem]'
</script>

<template>
  <div>
    <Container size="prose" :class="columnClass">
      <header class="pt-12">
        <h1 class="title">Extracting Pediatric Acne Features from Clinical Notes</h1>
        <p class="subtitle">Design and Validation Protocol</p>
        <p class="authors">
          <NuxtLink to="/about" class="nowrap">Courtney A. Smith, MD, MS</NuxtLink>, <span class="nowrap">Marcia Hogeling, MD</span>
        </p>
        <p class="affiliation">UCLA Division of Dermatology</p>
        <dl class="facts event">
          <dt>Poster</dt>
          <dd>PeDRA Annual Conference, <span class="nowrap">October 15, 2026</span></dd>
          <dt>Talk</dt>
          <dd>PeDRA NextGen Research Forum, <span class="nowrap">October 17, 2026</span></dd>
          <dt>Location</dt>
          <dd>Alexandria, Virginia</dd>
        </dl>
      </header>

      <p class="summary">
        Clinicians document acne, sequelae, and treatment response in <strong>clinical notes</strong>. This study compares a <strong>rule-based natural language processing</strong> system with a <strong>machine learning classifier</strong> for extracting acne features from pediatric dermatology notes at UCLA Health. Our design avoids costly computation to improve feasibility of use within <strong>resource-limited settings</strong>.
      </p>

      <section class="figure-section" aria-labelledby="literature-heading">
        <h2 id="literature-heading" class="section-heading">Acne data extraction literature</h2>
        <LiteratureDotPlot />
      </section>

      <section class="references" aria-labelledby="references-heading">
        <h2 id="references-heading" class="references-heading">References</h2>
        <p class="lede">Numbers per the poster (blue) with talk reference numbers underneath (gray).</p>
        <div v-for="group in referenceGroups" :key="group.title" class="group">
          <h3 class="group-heading">{{ group.title }}</h3>
          <ol class="group-list">
            <PosterReference v-for="reference in group.references" :key="reference.poster" :reference="reference" :talk="pedra2026TalkNumber(reference.poster)" />
          </ol>
        </div>
      </section>

      <section class="acknowledgements" aria-labelledby="acknowledgements-heading">
        <h2 id="acknowledgements-heading" class="section-heading">Acknowledgements</h2>
        <dl class="facts">
          <dt>Mentor</dt>
          <dd>Marcia Hogeling, MD</dd>
          <dt>Funding</dt>
          <dd>2026 Emerging Investigator Research Grant from the Pediatric Dermatology Research Alliance (PeDRA)</dd>
          <dt>Travel</dt>
          <dd>2026 Travel Stipend from the Pediatric Dermatology Research Alliance (PeDRA)</dd>
        </dl>
      </section>
    </Container>

    <PosterClosing :column-class="columnClass" />
  </div>
</template>

<style scoped>
/* The global 65ch cap would stop paragraphs short of the figure's right edge; here the column is the measure */
p {
  max-width: none;
}

.title {
  font-size: clamp(1.75rem, 4.6vw, 2.5rem);
  letter-spacing: -0.012em;
  text-wrap: balance;
}

.subtitle {
  margin-top: 0.5rem;
  font-size: clamp(1.125rem, 2.6vw, 1.3125rem);
  color: var(--color-text-secondary);
}

.authors {
  margin-top: 1.5rem;
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

.nowrap {
  white-space: nowrap;
}

.facts {
  display: grid;
  grid-template-columns: 4.5rem 1fr;
  column-gap: 0.75rem;
  row-gap: 0.25rem;
  margin: 1rem 0 0;
  font-size: 0.9375rem;
}

.facts dt {
  padding-top: 0.0625rem;
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.facts dd {
  margin: 0;
  color: var(--color-text-secondary);
}

.event {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border-subtle);
}

.summary {
  margin-top: 2.25rem;
  font-size: 1.0625rem;
  line-height: 1.75;
}

.summary strong {
  font-weight: 600;
  color: var(--color-text-primary);
}

.figure-section {
  margin-top: 3.5rem;
}

.section-heading {
  font-size: clamp(1.1875rem, 3vw, 1.375rem);
}

.references {
  margin-top: 4rem;
}

.references-heading {
  font-size: clamp(1.25rem, 3vw, 1.625rem);
}

.lede {
  margin-top: 0.5rem;
  font-size: 0.9375rem;
  color: var(--color-text-muted);
}

.group {
  margin-top: 2.5rem;
}

.group-heading {
  padding-bottom: 0.625rem;
  border-bottom: 1px solid var(--color-border-subtle);
  font-size: 1.0625rem;
  font-weight: 600;
}

.group-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.acknowledgements {
  margin-top: 4rem;
}

.acknowledgements .facts {
  row-gap: 0.5rem;
}
</style>
