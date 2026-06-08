import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-06-07',
  modules: ['@nuxt/eslint'],
  ssr: true, // SSG: `nuxi generate` pre-renders all linked routes to static HTML
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/', // user-pages repo deploys at root
    head: {
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' },
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
  imports: {
    dirs: ['data'],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      // /code and /design-system are not linked from nav, so list them explicitly
      routes: ['/', '/code', '/design-system'],
    },
  },
  devtools: { enabled: true },
})
