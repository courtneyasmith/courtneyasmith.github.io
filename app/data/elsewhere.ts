import type { Favorite, Influence } from '~/types'

// Roles are deliberately neutral one-liners; the names carry the section, the roles just orient a reader who doesn't know one.
export const influences: Influence[] = [
  { name: 'Terence Tao', role: 'mathematician' },
  { name: 'Eileen Gu', role: 'freeskier' },
  { name: 'Maya Angelou', role: 'author' },
  { name: 'Alysa Liu', role: 'figure skater' },
  { name: 'Boris Cherny', role: 'co-creator of Claude Code' },
  { name: 'Ilya Sutskever', role: 'AI researcher' },
  { name: 'Ryan Coogler', role: 'filmmaker' },
  { name: 'Law Roach', role: 'stylist' },
]

export const favorites: Favorite[] = [
  { label: 'Pets', detail: 'My cat, Moo-Cow.' },
  { label: 'Playing', detail: 'Kingdom Hearts and Detroit: Become Human.' },
  { label: 'Watching', detail: 'Sinners, I Am Legend, The Butterfly Effect.' },
  {
    label: 'Listening',
    detail: "Panic! at the Disco's A Fever You Can't Sweat Out, Lady Gaga, Kingdom Hearts orchestral music, and the Doja Cat playlist I write every manuscript and grant to.",
  },
  { label: 'Eating', detail: 'Boiled peanuts and Oaxacan food, especially enchiladas.' },
]
