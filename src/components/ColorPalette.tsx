/**
 * Design system reference component displaying all color tokens.
 * For development use only - not intended for production pages.
 */

import { colors } from '@/lib/colors';

interface SwatchProps {
  name: string;
  value: string;
  usage: string;
}

function Swatch({ name, value, usage }: SwatchProps) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-16 w-full rounded-md border border-border"
        style={{ backgroundColor: value }}
      />
      <div className="space-y-1">
        <p className="font-medium text-sm">{name}</p>
        <p className="text-xs font-mono text-text-secondary">{value}</p>
        <p className="text-xs text-text-muted">{usage}</p>
      </div>
    </div>
  );
}

interface ColorGroupProps {
  title: string;
  children: React.ReactNode;
}

function ColorGroup({ title, children }: ColorGroupProps) {
  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold border-b border-border pb-2">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {children}
      </div>
    </section>
  );
}

export default function ColorPalette() {
  return (
    <div className="space-y-10">
      <ColorGroup title="Text Colors">
        <Swatch
          name="text.primary"
          value={colors.text.primary}
          usage="Headings, body text, nav links"
        />
        <Swatch
          name="text.secondary"
          value={colors.text.secondary}
          usage="Captions, journal names, metadata"
        />
        <Swatch
          name="text.muted"
          value={colors.text.muted}
          usage="Dates, years, less important info"
        />
      </ColorGroup>

      <ColorGroup title="Background Colors">
        <Swatch
          name="bg.primary"
          value={colors.bg.primary}
          usage="Main page background"
        />
        <Swatch
          name="bg.secondary"
          value={colors.bg.secondary}
          usage="Cards, pillar cards, project cards"
        />
        <Swatch
          name="bg.hero"
          value={colors.bg.hero}
          usage="Hero section background"
        />
      </ColorGroup>

      <ColorGroup title="Accent Colors">
        <Swatch
          name="accent.DEFAULT"
          value={colors.accent.DEFAULT}
          usage="Links, active nav, interactive elements"
        />
        <Swatch
          name="accent.hover"
          value={colors.accent.hover}
          usage="Link hover states"
        />
        <Swatch
          name="accent.subtle"
          value={colors.accent.subtle}
          usage="Tag backgrounds, filter pills"
        />
      </ColorGroup>

      <ColorGroup title="Border Colors">
        <Swatch
          name="border.DEFAULT"
          value={colors.border.DEFAULT}
          usage="Card borders, section dividers"
        />
        <Swatch
          name="border.subtle"
          value={colors.border.subtle}
          usage="Subtle borders, light separators"
        />
      </ColorGroup>

      <ColorGroup title="Semantic Colors">
        <Swatch
          name="highlight"
          value={colors.highlight}
          usage="First-author publication rows"
        />
        <Swatch
          name="focusRing"
          value={colors.focusRing}
          usage="Keyboard focus outlines"
        />
        <Swatch
          name="success"
          value={colors.success}
          usage="Success states, confirmations"
        />
        <Swatch
          name="error"
          value={colors.error}
          usage="Error states, validation"
        />
      </ColorGroup>
    </div>
  );
}
