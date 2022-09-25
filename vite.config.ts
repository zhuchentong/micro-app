import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import jsx from '@vitejs/plugin-vue-jsx';
import ssr from 'vite-ssr/plugin';
import pages from 'vite-plugin-pages';
import layouts from 'vite-plugin-vue-layouts';
import autoImport from 'unplugin-auto-import/vite';
import components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import unocss from 'unocss/vite';
import extractorPug from '@unocss/extractor-pug';
import { extractorSplit } from '@unocss/core';
import icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

// https://vitejs.dev/config/
export default defineConfig({
  ssr: {
    external: ['reflect-metadata'],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "@/styles/element.scss" as *;
        @use "@/styles/variable.scss" as *;`,
      },
    },
  },
  plugins: [
    ssr(),
    vue(),
    jsx(),
    autoImport({
      imports: ['vue', 'vue-router', 'vue/macros'],
      dts: 'src/types/auto-imports.d.ts',
      dirs: [],
      vueTemplate: true,
      eslintrc: {
        enabled: true,
      },
      resolvers: [ElementPlusResolver()],
      include: [/\.vue$/, /\.vue\?vue/],
    }),
    components({
      dts: 'src/types/components.d.ts',
      include: [/\.vue$/, /\.vue\?vue/],
      resolvers: [
        ElementPlusResolver({ ssr: true, importStyle: 'sass' }),
        IconsResolver({
          prefix: 'icon',
          alias: {
            'park-outline': 'icon-park-outline',
          },
          enabledCollections: ['icon-park-outline'],
        }),
      ],
    }),
    // 自动路由插件配置
    pages({
      pagesDir: [{ dir: 'src/views', baseRoute: '' }],
      exclude: ['**/components/*.vue'],
      extensions: ['vue'],
      routeStyle: 'nuxt',
    }),
    // 自动布局插件配置
    layouts({
      layoutsDirs: 'src/layouts',
      defaultLayout: 'blank',
    }),
    unocss({
      extractors: [extractorPug(), extractorSplit],
    }),
    icons({
      scale: 1.5,
    }),
  ],
});
