<script setup lang="ts">
// Design System Reference Page — DEV TOOL ONLY, NOT FOR PRODUCTION.
useSeoMeta({
  title: 'Design System | Dev Reference',
  robots: 'noindex, nofollow',
})

const typographySamples = [
  { label: 'Display', class: 'text-display font-bold', specs: 'clamp(2rem, 5vw, 3rem) / 700 / 1.1 line-height' },
  { label: 'H1', class: 'text-h1 font-semibold', specs: 'clamp(1.75rem, 4vw, 2.5rem) / 600 / 1.2 line-height' },
  { label: 'H2', class: 'text-h2 font-semibold', specs: 'clamp(1.25rem, 3vw, 1.75rem) / 600 / 1.3 line-height' },
  { label: 'H3', class: 'text-h3 font-medium', specs: '1.125rem / 500 / 1.4 line-height' },
  { label: 'Body', class: 'text-base', specs: '1rem (16px) / 400 / 1.65 line-height' },
  { label: 'Caption', class: 'text-caption', specs: '0.875rem / 400 / 1.5 line-height' },
  { label: 'Small', class: 'text-small', specs: '0.75rem / 400 / 1.4 line-height' },
]

const spacingBlocks = [
  { size: '0.25rem', label: 'xs: 0.25rem (4px)' },
  { size: '0.5rem', label: 'sm: 0.5rem (8px)' },
  { size: '0.75rem', label: 'md: 0.75rem (12px)' },
  { size: '1rem', label: 'lg: 1rem (16px)' },
  { size: '1.5rem', label: 'xl: 1.5rem (24px)' },
  { size: '2rem', label: '2xl: 2rem (32px)' },
  { size: '3rem', label: '3xl: 3rem (48px)' },
  { size: '4rem', label: '4xl: 4rem (64px)' },
  { size: '6rem', label: '5xl: 6rem (96px)' },
]
</script>

<template>
  <div class="py-12 px-6 max-w-[64rem] mx-auto">
    <div class="mb-10 p-4 rounded-lg border-2 border-error/30 bg-error/5">
      <p class="text-sm font-medium text-error">Development Reference Only</p>
      <p class="text-sm text-text-secondary mt-1">
        This page documents the design system for development purposes.
        It should not be deployed to production or linked from the main site.
      </p>
    </div>

    <h1 class="text-3xl font-bold mb-2">Design System</h1>
    <p class="text-text-secondary mb-12">
      Color tokens, typography scale, and component examples for the Courtney A. Smith website.
    </p>

    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-6">Color Palette</h2>
      <p class="text-text-secondary mb-8">
        All colors use OKLCH for perceptual uniformity. Neutrals are warm-tinted (hue ~60)
        to support the &ldquo;precise, warm, substantive&rdquo; brand personality.
      </p>
      <ColorPalette />
    </section>

    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-6">Typography Scale</h2>
      <p class="text-text-secondary mb-8">
        Using Literata Variable with a 1.25 ratio scale. Fluid sizing for headings
        ensures readability across viewport sizes.
      </p>
      <div class="border border-border rounded-lg p-6 bg-bg-secondary">
        <div
          v-for="sample in typographySamples"
          :key="sample.label"
          class="border-b border-border-subtle py-4 last:border-b-0"
        >
          <div class="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
            <span class="text-xs font-mono text-text-muted w-20 shrink-0">{{ sample.label }}</span>
            <p :class="sample.class">The quick brown fox jumps over the lazy dog</p>
          </div>
          <p class="text-xs font-mono text-text-secondary mt-2 ml-0 sm:ml-[6.5rem]">{{ sample.specs }}</p>
        </div>
      </div>
    </section>

    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-6">Component Examples</h2>
      <p class="text-text-secondary mb-8">Core UI components with their styling patterns.</p>

      <div class="space-y-8">
        <div class="space-y-3">
          <h4 class="text-sm font-medium text-text-secondary">.card</h4>
          <div class="p-6 bg-bg-secondary rounded-lg border border-border-subtle">
            <div class="card max-w-[24rem]">
              <h3 class="text-h3 font-medium mb-2">Card Title</h3>
              <p class="text-text-secondary text-sm mb-4">
                A brief description that explains the card content in two lines or less.
              </p>
              <span class="text-accent text-sm">Learn more &rarr;</span>
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <h4 class="text-sm font-medium text-text-secondary">.btn-primary</h4>
          <div class="p-6 bg-bg-secondary rounded-lg border border-border-subtle">
            <div class="flex flex-wrap gap-4">
              <button class="btn-primary">Primary Button</button>
              <button class="btn-primary" disabled>Disabled</button>
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <h4 class="text-sm font-medium text-text-secondary">.btn-secondary</h4>
          <div class="p-6 bg-bg-secondary rounded-lg border border-border-subtle">
            <div class="flex flex-wrap gap-4">
              <button class="btn-secondary">Secondary Button</button>
              <button class="btn-secondary" disabled>Disabled</button>
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <h4 class="text-sm font-medium text-text-secondary">.filter-pill</h4>
          <div class="p-6 bg-bg-secondary rounded-lg border border-border-subtle">
            <div class="flex flex-wrap gap-2">
              <button class="filter-pill filter-pill-active">All</button>
              <button class="filter-pill">Epidemiology</button>
              <button class="filter-pill">Informatics</button>
              <button class="filter-pill">Health Equity</button>
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <h4 class="text-sm font-medium text-text-secondary">.nav-link</h4>
          <div class="p-6 bg-bg-secondary rounded-lg border border-border-subtle">
            <nav class="flex flex-wrap gap-2">
              <a href="#" class="nav-link nav-link-active">Home</a>
              <a href="#" class="nav-link">Research</a>
              <a href="#" class="nav-link">Publications</a>
              <a href="#" class="nav-link">Code</a>
              <a href="#" class="nav-link">About</a>
              <a href="#" class="nav-link">CV</a>
            </nav>
          </div>
        </div>
      </div>
    </section>

    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-6">Layout Components</h2>
      <p class="text-text-secondary mb-8">
        Foundational layout primitives for consistent horizontal margins and vertical rhythm.
      </p>

      <div class="space-y-8">
        <div class="space-y-3">
          <h4 class="text-sm font-medium text-text-secondary">Container Sizes</h4>
          <div class="border border-border rounded-lg overflow-hidden bg-bg-secondary">
            <div class="p-4 border-b border-border-subtle">
              <span class="text-xs font-mono text-text-muted">size=&quot;prose&quot; (42rem / 672px)</span>
            </div>
            <Container size="prose" class="py-4 bg-accent-subtle">
              <p class="text-sm text-text-secondary">
                Optimal for text-heavy pages like About or Blog posts. Line length stays comfortable for reading.
              </p>
            </Container>
          </div>

          <div class="border border-border rounded-lg overflow-hidden bg-bg-secondary">
            <div class="p-4 border-b border-border-subtle">
              <span class="text-xs font-mono text-text-muted">size=&quot;content&quot; (56rem / 896px) — default</span>
            </div>
            <Container size="content" class="py-4 bg-accent-subtle">
              <p class="text-sm text-text-secondary">
                Mixed content pages like Research or CV. Room for sidebars or wider elements.
              </p>
            </Container>
          </div>

          <div class="border border-border rounded-lg overflow-hidden bg-bg-secondary">
            <div class="p-4 border-b border-border-subtle">
              <span class="text-xs font-mono text-text-muted">size=&quot;full&quot; (64rem / 1024px)</span>
            </div>
            <Container size="full" class="py-4 bg-accent-subtle">
              <p class="text-sm text-text-secondary">
                Grid layouts like Publications or Code. Maximum content width.
              </p>
            </Container>
          </div>
        </div>

        <div class="space-y-3">
          <h4 class="text-sm font-medium text-text-secondary">Section with Title</h4>
          <div class="border border-border rounded-lg overflow-hidden bg-bg-secondary">
            <Section title="Example Section" class="!py-8">
              <p class="text-text-secondary">
                Section provides py-16 padding by default. The title prop renders a styled h2 with proper
                font sizing (clamp) and bottom margin. Use the id prop for anchor links.
              </p>
            </Section>
          </div>
        </div>

        <div class="space-y-3">
          <h4 class="text-sm font-medium text-text-secondary">Section without Title</h4>
          <div class="border border-border rounded-lg overflow-hidden bg-bg-secondary">
            <Section class="!py-8">
              <p class="text-text-secondary">
                When no title is provided, Section just provides consistent vertical padding.
                Content determines the internal structure.
              </p>
            </Section>
          </div>
        </div>
      </div>
    </section>

    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-6">Spacing Scale</h2>
      <p class="text-text-secondary mb-8">
        4pt base scale with semantic token names. All spacing values are multiples of 4px.
      </p>
      <div class="border border-border rounded-lg p-6 bg-bg-secondary space-y-4">
        <div v-for="block in spacingBlocks" :key="block.label" class="flex items-center gap-4">
          <div class="bg-accent shrink-0" :style="{ width: block.size, height: block.size }" />
          <span class="text-sm font-mono">{{ block.label }}</span>
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">Usage Guidelines</h2>
      <div class="prose prose-sm max-w-none">
        <div class="grid md:grid-cols-2 gap-8">
          <div class="space-y-3">
            <h4 class="font-medium">Spacing Application</h4>
            <ul class="text-sm text-text-secondary space-y-1 list-disc list-inside">
              <li>Section padding: py-16 to py-24 (4-6rem)</li>
              <li>Card padding: p-6 (1.5rem)</li>
              <li>Element gaps (tight): gap-4 (1rem)</li>
              <li>Element gaps (standard): gap-6 (1.5rem)</li>
              <li>Element gaps (loose): gap-8 (2rem)</li>
            </ul>
          </div>
          <div class="space-y-3">
            <h4 class="font-medium">Typography Rules</h4>
            <ul class="text-sm text-text-secondary space-y-1 list-disc list-inside">
              <li>Line length: max-width 65ch</li>
              <li>Paragraph spacing: space-y-4 (1rem)</li>
              <li>Headings: 2x space above, 0.5x below</li>
              <li>No all-caps for body text</li>
              <li>Links: underline on hover only</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
