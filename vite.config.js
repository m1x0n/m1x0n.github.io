import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { ViteMinifyPlugin } from 'vite-plugin-minify'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), ViteMinifyPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      external: ['petite-vue'],
      output: {
        format: 'es',
        paths: {
          "petite-vue": 'https://unpkg.com/petite-vue@0.4.1/dist/petite-vue.es.js',
        }
      }
    }
  }
})
