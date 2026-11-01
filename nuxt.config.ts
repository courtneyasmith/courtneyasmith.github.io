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
      script: [
        // Applies a saved reading-font choice before first paint so a returning reader never sees Literata flash; storage access throws when it is blocked
        { innerHTML: "try{if(localStorage.getItem('reading-font')==='lexend')document.documentElement.dataset.readingFont='lexend'}catch{}" },
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
      routes: ['/', '/pedra2026', '/wpath2026'], // /pedra2026 and /wpath2026 are reached only through the posters' QR codes, so the crawler would never find them
    },
  },
  $production: {
    app: {
      head: {
        meta: [
          // 'unsafe-inline': scripts for the inline window.__NUXT__ config and importmap, whose per-build buildId would change any hash every build; styles for Nuxt's inlined component <style> blocks and server-rendered :style attributes; nothing loads from other hosts, so the rest stays 'self'
          {
            'http-equiv': 'content-security-policy', // lowercase is what unhead matches to sort it ahead of every script
            content: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data:",
              "font-src 'self'",
              "connect-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              'upgrade-insecure-requests',
            ].join('; '),
          },
        ],
      },
    },
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
