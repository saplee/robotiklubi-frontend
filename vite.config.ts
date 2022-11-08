import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api/': {
        // This proxy is only used when developing, proxying in the server is handled by NginX.
        target: 'http://localhost:8082/',
        changeOrigin: true,
        rewrite: (path) => path.substring(4)
      },
    }
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
