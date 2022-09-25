import App from './App.vue';
import { routes } from './router';
import { ID_INJECTION_KEY } from 'element-plus';
import createSSR from 'vite-ssr';
import store from './store';
import './styles/index.scss';

export default createSSR(
  App,
  {
    routes,
    pageProps: { passToPage: false },
    transformState(state) {
      return import.meta.env.SSR ? JSON.stringify(state) : state;
    },
  },
  ({ app, router, initialState, isClient }) => {
    if (!isClient) {
      app.provide(ID_INJECTION_KEY, {
        prefix: Math.floor(Math.random() * 10000),
        current: 0,
      });
    }

    // 安装pinia
    store.install(app, initialState);
  },
);
