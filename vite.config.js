import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
  ],
  resolve: {
    alias: {
      find: './runtimeConfig',
      replacement: './runtimeConfig.browser',
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      "./runtimeConfig": "./runtimeConfig.browser", //fix production build
    },
  },
  build: {
    minify: true
  }
})
