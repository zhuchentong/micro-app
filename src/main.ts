import App from './App.vue';
import { routes } from './router';

import createSSR from 'vite-ssr';
import store from './store';
export default createSSR(
  App,
  {
    routes,
    pageProps: { passToPage: false },
    transformState(state) {
      return import.meta.env.SSR ? JSON.stringify(state) : state;
    },
  },
  ({ app, router, initialState }) => {
    // 安装pinia
    store.install(app, initialState);
  },
);
