/**
 * Design System Reference Page
 *
 * DEV TOOL ONLY - NOT FOR PRODUCTION
 * This page documents the design tokens and components for development reference.
 * Remove or restrict access before deploying to production.
 */

import ColorPalette from '@/components/ColorPalette';
import { Container, Section } from '@/components';

export const metadata = {
  title: 'Design System | Dev Reference',
  robots: 'noindex, nofollow',
};

function TypographySample({
  label,
  className,
  specs,
}: {
  label: string;
  className: string;
  specs: string;
}) {
  return (
    <div className="border-b border-border-subtle py-4 last:border-b-0">
      <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
        <span className="text-xs font-mono text-text-muted w-20 shrink-0">{label}</span>
        <p className={className}>The quick brown fox jumps over the lazy dog</p>
      </div>
      <p className="text-xs font-mono text-text-secondary mt-2 ml-0 sm:ml-[6.5rem]">{specs}</p>
    </div>
  );
}

function ComponentExample({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-text-secondary">{title}</h4>
      <div className="p-6 bg-bg-secondary rounded-lg border border-border-subtle">
        {children}
      </div>
    </div>
  );
}

function SpacingBlock({ size, label }: { size: string; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <div
        className="bg-accent shrink-0"
        style={{ width: size, height: size }}
      />
      <span className="text-sm font-mono">{label}</span>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <main className="py-12 px-6 max-w-5xl mx-auto">
      {/* Warning Banner */}
      <div className="mb-10 p-4 rounded-lg border-2 border-error/30 bg-error/5">
        <p className="text-sm font-medium text-error">
          Development Reference Only
        </p>
        <p className="text-sm text-text-secondary mt-1">
          This page documents the design system for development purposes.
          It should not be deployed to production or linked from the main site.
        </p>
      </div>

      <h1 className="text-3xl font-bold mb-2">Design System</h1>
      <p className="text-text-secondary mb-12">
        Color tokens, typography scale, and component examples for the Courtney A. Smith website.
      </p>

      {/* Color Palette Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Color Palette</h2>
        <p className="text-text-secondary mb-8">
          All colors use OKLCH for perceptual uniformity. Neutrals are warm-tinted (hue ~60)
          to support the &ldquo;precise, warm, substantive&rdquo; brand personality.
        </p>
        <ColorPalette />
      </section>

      {/* Typography Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Typography Scale</h2>
        <p className="text-text-secondary mb-8">
          Using Literata Variable with a 1.25 ratio scale. Fluid sizing for headings
          ensures readability across viewport sizes.
        </p>
        <div className="border border-border rounded-lg p-6 bg-bg-secondary">
          <TypographySample
            label="Display"
            className="text-display font-bold"
            specs="clamp(2rem, 5vw, 3rem) / 700 / 1.1 line-height"
          />
          <TypographySample
            label="H1"
            className="text-h1 font-semibold"
            specs="clamp(1.75rem, 4vw, 2.5rem) / 600 / 1.2 line-height"
          />
          <TypographySample
            label="H2"
            className="text-h2 font-semibold"
            specs="clamp(1.25rem, 3vw, 1.75rem) / 600 / 1.3 line-height"
          />
          <TypographySample
            label="H3"
            className="text-h3 font-medium"
            specs="1.125rem / 500 / 1.4 line-height"
          />
          <TypographySample
            label="Body"
            className="text-base"
            specs="1rem (16px) / 400 / 1.65 line-height"
          />
          <TypographySample
            label="Caption"
            className="text-caption"
            specs="0.875rem / 400 / 1.5 line-height"
          />
          <TypographySample
            label="Small"
            className="text-small"
            specs="0.75rem / 400 / 1.4 line-height"
          />
        </div>
      </section>

      {/* Component Examples Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Component Examples</h2>
        <p className="text-text-secondary mb-8">
          Core UI components with their styling patterns.
        </p>

        <div className="space-y-8">
          <ComponentExample title=".card">
            <div className="card max-w-sm">
              <h3 className="text-h3 font-medium mb-2">Card Title</h3>
              <p className="text-text-secondary text-sm mb-4">
                A brief description that explains the card content in two lines or less.
              </p>
              <span className="text-accent text-sm">Learn more &rarr;</span>
            </div>
          </ComponentExample>

          <ComponentExample title=".btn-primary">
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary">Primary Button</button>
              <button className="btn-primary" disabled>Disabled</button>
            </div>
          </ComponentExample>

          <ComponentExample title=".btn-secondary">
            <div className="flex flex-wrap gap-4">
              <button className="btn-secondary">Secondary Button</button>
              <button className="btn-secondary" disabled>Disabled</button>
            </div>
          </ComponentExample>

          <ComponentExample title=".filter-pill">
            <div className="flex flex-wrap gap-2">
              <button className="filter-pill filter-pill-active">All</button>
              <button className="filter-pill">Epidemiology</button>
              <button className="filter-pill">Informatics</button>
              <button className="filter-pill">Health Equity</button>
            </div>
          </ComponentExample>

          <ComponentExample title=".nav-link">
            <nav className="flex flex-wrap gap-2">
              <a href="#" className="nav-link nav-link-active">Home</a>
              <a href="#" className="nav-link">Research</a>
              <a href="#" className="nav-link">Publications</a>
              <a href="#" className="nav-link">Code</a>
              <a href="#" className="nav-link">About</a>
              <a href="#" className="nav-link">CV</a>
            </nav>
          </ComponentExample>
        </div>
      </section>

      {/* Layout Components Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Layout Components</h2>
        <p className="text-text-secondary mb-8">
          Foundational layout primitives for consistent horizontal margins and vertical rhythm.
        </p>

        <div className="space-y-8">
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-text-secondary">Container Sizes</h4>
            <div className="border border-border rounded-lg overflow-hidden bg-bg-secondary">
              <div className="p-4 border-b border-border-subtle">
                <span className="text-xs font-mono text-text-muted">size=&quot;prose&quot; (42rem / 672px)</span>
              </div>
              <Container size="prose" className="py-4 bg-accent-subtle">
                <p className="text-sm text-text-secondary">
                  Optimal for text-heavy pages like About or Blog posts. Line length stays comfortable for reading.
                </p>
              </Container>
            </div>

            <div className="border border-border rounded-lg overflow-hidden bg-bg-secondary">
              <div className="p-4 border-b border-border-subtle">
                <span className="text-xs font-mono text-text-muted">size=&quot;content&quot; (56rem / 896px) — default</span>
              </div>
              <Container size="content" className="py-4 bg-accent-subtle">
                <p className="text-sm text-text-secondary">
                  Mixed content pages like Research or CV. Room for sidebars or wider elements.
                </p>
              </Container>
            </div>

            <div className="border border-border rounded-lg overflow-hidden bg-bg-secondary">
              <div className="p-4 border-b border-border-subtle">
                <span className="text-xs font-mono text-text-muted">size=&quot;full&quot; (64rem / 1024px)</span>
              </div>
              <Container size="full" className="py-4 bg-accent-subtle">
                <p className="text-sm text-text-secondary">
                  Grid layouts like Publications or Code. Maximum content width.
                </p>
              </Container>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-text-secondary">Section with Title</h4>
            <div className="border border-border rounded-lg overflow-hidden bg-bg-secondary">
              <Section title="Example Section" className="!py-8">
                <p className="text-text-secondary">
                  Section provides py-16 padding by default. The title prop renders a styled h2 with proper
                  font sizing (clamp) and bottom margin. Use the id prop for anchor links.
                </p>
              </Section>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-text-secondary">Section without Title</h4>
            <div className="border border-border rounded-lg overflow-hidden bg-bg-secondary">
              <Section className="!py-8">
                <p className="text-text-secondary">
                  When no title is provided, Section just provides consistent vertical padding.
                  Content determines the internal structure.
                </p>
              </Section>
            </div>
          </div>
        </div>
      </section>

      {/* Spacing Scale Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Spacing Scale</h2>
        <p className="text-text-secondary mb-8">
          4pt base scale with semantic token names. All spacing values are multiples of 4px.
        </p>
        <div className="border border-border rounded-lg p-6 bg-bg-secondary space-y-4">
          <SpacingBlock size="0.25rem" label="xs: 0.25rem (4px)" />
          <SpacingBlock size="0.5rem" label="sm: 0.5rem (8px)" />
          <SpacingBlock size="0.75rem" label="md: 0.75rem (12px)" />
          <SpacingBlock size="1rem" label="lg: 1rem (16px)" />
          <SpacingBlock size="1.5rem" label="xl: 1.5rem (24px)" />
          <SpacingBlock size="2rem" label="2xl: 2rem (32px)" />
          <SpacingBlock size="3rem" label="3xl: 3rem (48px)" />
          <SpacingBlock size="4rem" label="4xl: 4rem (64px)" />
          <SpacingBlock size="6rem" label="5xl: 6rem (96px)" />
        </div>
      </section>

      {/* Usage Guidelines */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Usage Guidelines</h2>
        <div className="prose prose-sm max-w-none">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h4 className="font-medium">Spacing Application</h4>
              <ul className="text-sm text-text-secondary space-y-1 list-disc list-inside">
                <li>Section padding: py-16 to py-24 (4-6rem)</li>
                <li>Card padding: p-6 (1.5rem)</li>
                <li>Element gaps (tight): gap-4 (1rem)</li>
                <li>Element gaps (standard): gap-6 (1.5rem)</li>
                <li>Element gaps (loose): gap-8 (2rem)</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Typography Rules</h4>
              <ul className="text-sm text-text-secondary space-y-1 list-disc list-inside">
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
    </main>
  );
}
