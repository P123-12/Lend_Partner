import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        home: fileURLToPath(new URL('./index.html', import.meta.url)),
        services: fileURLToPath(new URL('./services.html', import.meta.url)),
        insights: fileURLToPath(new URL('./insights.html', import.meta.url)),
        about: fileURLToPath(new URL('./about.html', import.meta.url)),
        contact: fileURLToPath(new URL('./contact.html', import.meta.url)),
        privacy: fileURLToPath(new URL('./privacy.html', import.meta.url)),
        terms: fileURLToPath(new URL('./terms.html', import.meta.url)),
        complaints: fileURLToPath(new URL('./complaints.html', import.meta.url)),
        serviceCommercial: fileURLToPath(new URL('./service-commercial.html', import.meta.url)),
        serviceDevelopment: fileURLToPath(new URL('./service-development.html', import.meta.url)),
        serviceBusiness: fileURLToPath(new URL('./service-business.html', import.meta.url)),
        serviceResidential: fileURLToPath(new URL('./service-residential.html', import.meta.url)),
        serviceAsset: fileURLToPath(new URL('./service-asset.html', import.meta.url)),
      },
    },
  },
})
