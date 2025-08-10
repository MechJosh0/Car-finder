export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  pages: true,
  modules: ["@nuxtjs/tailwindcss"],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
  // runtimeConfig: {
  //   databaseUrl: process.env.DATABASE_URL,
  //   public: {
  //     apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api'
  //   }
  // }
});
