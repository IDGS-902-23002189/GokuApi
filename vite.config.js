
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),

    // Configuración de la PWA
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],

      manifest: {
        name: 'Goku Api',
        short_name: 'Goku Api',
        description: 'Api de goku',
        theme_color: '#ff933b',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',

        icons: [
          {
            src: 'goku192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'goku512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'goku512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
    }),
  ],
})
