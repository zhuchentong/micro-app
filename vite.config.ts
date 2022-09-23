import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import ssr from 'vite-ssr/plugin';

// https://vitejs.dev/config/
export default defineConfig({
  ssr: {
    external: ['reflect-metadata'],
  },
  plugins: [ssr(), vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
