// https://nuxt.com/docs/api/configuration/nuxt-config
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  // SEO Configuration
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Ferremat - Ferretería Online | Herramientas y Materiales de Construcción',
      meta: [
        {
          name: 'description',
          content: 'Ferremat es tu ferretería online. Encuentra las mejores herramientas, materiales de construcción y productos de calidad. Envío gratis a partir de 50€.',
        },
        {
          name: 'keywords',
          content: 'ferretería, herramientas, materiales construcción, comprar online, herramientas de calidad',
        },
        {
          name: 'author',
          content: 'Ferremat',
        },
        {
          name: 'robots',
          content: 'index, follow',
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:site_name',
          content: 'Ferremat',
        },
        {
          property: 'og:locale',
          content: 'es_ES',
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:site',
          content: '@ferremat',
        },
      ],
      link: [
        {
          rel: 'icon',
          href: '/favicon.ico',
        },
        {
          rel: 'canonical',
          href: 'https://ferremat.es',
        },
        {
          rel: 'sitemap',
          href: '/sitemap.xml',
          type: 'application/xml',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://api.ferremat.es/',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://ferremat.es',
    },
  },

  vite: {
    plugins: [
      viteTsConfigPaths(),
    ],
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // Performance & Caching
  routeRules: {
    '/': { prerender: true },
    '/conocenos': { prerender: true },
    '/contactanos': { prerender: true },
    '/politicas': { prerender: true },
    '/carrito': { swr: 3600 },
    '/login': { swr: 3600 },
  },

  // Compression
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml', '/robots.txt'],
    },
  },
})
