// https://nuxt.com/docs/api/configuration/nuxt-config
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://api.ferremat.es/',
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
})
