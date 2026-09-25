import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  devtools: { enabled: false },
  css: [
    '~/assets/css/main.css',
    '~/assets/css/theme.css',
    '~/assets/css/makeover.css',
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  nitro: {
    prerender: {
      routes: ['/'],
    },
  },
  typescript: {
    typeCheck: true,
  },
})
