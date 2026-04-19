/**
 * Color token system for the Courtney A. Smith professional website.
 * All colors use OKLCH for perceptual uniformity.
 * Neutrals are warm-tinted (hue ~60) to reinforce "warm" brand attribute.
 */

export const colors = {
  text: {
    primary: 'oklch(18% 0.01 60)',
    secondary: 'oklch(42% 0.01 60)',
    muted: 'oklch(55% 0.008 60)',
  },
  bg: {
    primary: 'oklch(99% 0.004 60)',
    secondary: 'oklch(96.5% 0.008 60)',
    hero: 'oklch(97.5% 0.006 60)',
  },
  accent: {
    DEFAULT: 'oklch(50% 0.14 250)',
    hover: 'oklch(43% 0.16 250)',
    subtle: 'oklch(95% 0.04 250)',
  },
  border: {
    DEFAULT: 'oklch(90% 0.01 60)',
    subtle: 'oklch(94% 0.006 60)',
  },
  highlight: 'oklch(96% 0.04 85)',
  focusRing: 'oklch(55% 0.18 250)',
  success: 'oklch(55% 0.15 145)',
  error: 'oklch(55% 0.2 25)',
} as const;

export type ColorToken = typeof colors;
