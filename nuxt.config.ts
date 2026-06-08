// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-06-07',
  ssr: true, // SSG: `nuxi generate` pre-renders all linked routes to static HTML
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/', // user-pages repo deploys at root
    head: {
      htmlAttrs: { lang: 'en' },
      link: [
        {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          href: '/fonts/literata-400.woff2',
          crossorigin: '',
        },
      ],
    },
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },
  devtools: { enabled: true },
})
