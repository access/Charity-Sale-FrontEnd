import { createStore, createLogger } from 'vuex'
//import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import Products from './modules/Products'
//import createPersistedState from "vuex-persistedstate";
const debug = process.env.NODE_ENV !== 'production';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  // reducer: state => ({
  //   products: state.products,
  //   cart: state.cart
  // })
  //modules: ["Products"]
});

export default createStore({
  modules: {
    Products
  },
  //strict: debug,
   plugins: debug ? [createLogger(), vuexLocal.plugin] : [vuexLocal.plugin]
  //plugins: [vuexLocal.plugin]
  //plugins: [createPersistedState()]
})