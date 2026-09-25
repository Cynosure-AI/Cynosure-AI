import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  devtools: { enabled: false },
  css: [
    '~/assets/css/main.css',
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
