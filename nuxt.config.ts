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
      routes: ['/', '/pedra2026'], // /pedra2026 is reached only through the PeDRA poster QR code, so the crawler would never find it
    },
  },
  $production: {
    hooks: {
      // /design-system is a developer reference: `npm run dev` serves it, production builds drop the route so the public URL 404s
      'pages:extend'(pages) {
        const index = pages.findIndex((page) => page.path === '/design-system')
        if (index !== -1) pages.splice(index, 1)
      },
    },
  },
  devtools: { enabled: false }, // off while npm audit flags @nuxt/devtools through simple-git (GHSA-x6jw-m9v5-85vh); no fix short of downgrading Nuxt
})
