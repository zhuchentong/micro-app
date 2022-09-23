import { defineStore } from 'pinia';

const STORE_ID = 'app';

type State = {
  ready: boolean;
  loading: boolean;
  services: any[];
};

const initialState: State = {
  ready: false,
  loading: false,
  services: [],
};

export const store = defineStore(STORE_ID, {
  state: () => initialState,
  actions: {
    setReady() {
      this.ready = true;
    },
    setLoading(loading: boolean) {
      this.loading = loading;
    },
  },
});
