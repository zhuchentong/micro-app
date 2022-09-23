import {
  type Store,
  type StoreDefinition,
  type StateTree,
  createPinia,
} from 'pinia';
import type { App } from 'vue';
import { store as appStore } from './app.store';
import { store as menuStore } from './menu.store';
import * as R from 'ramda';

const pinia = createPinia();

const stores = {
  app: appStore,
  menu: menuStore,
};

export function useStore<ID extends string, S extends StateTree, G, A>(
  select: (store: typeof stores) => StoreDefinition<ID, S, G, A>,
): Store<ID, S, G, A> {
  const store = select(stores);
  return store();
}

export default {
  install(app: App<Element>, initialState: Record<string, any>) {
    app.use(pinia);

    if (import.meta.env.SSR) {
      pinia.state.value = R.mergeDeepRight(pinia.state.value, {
        app: {
          services: initialState.services,
        },
      });

      initialState.pinia = pinia.state.value;
    } else {
      pinia.state.value = initialState.pinia || {};
    }
  },
};
