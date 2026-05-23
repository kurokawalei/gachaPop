import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/gachaPop/',
  plugins: [vue()],
  server: {
    watch: {
      usePolling: true,
    },
  },
})
