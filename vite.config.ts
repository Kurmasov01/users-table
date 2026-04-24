import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        //additionalData: `@use "@/styles/_variables.scss" as *; @use "@/styles/_mixins.scss" as *;` глобальное подключение переменных и функций стилей (на будущее)
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
