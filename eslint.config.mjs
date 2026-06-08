import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // Single-word presentational component names (Hero, Section, Container)
    // are intentional and unambiguous under Nuxt's filename-based auto-import.
    'vue/multi-word-component-names': 'off',
    // Optional props are typed via TypeScript; explicit defaults are redundant.
    'vue/require-default-prop': 'off',
  },
})
