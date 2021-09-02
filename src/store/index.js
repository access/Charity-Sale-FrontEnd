import vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import Products from './modules/Products'
//const debug = process.env.NODE_ENV !== 'production';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  // reducer: state => ({
  //   products: state.products,
  //   cart: state.cart
  // })
  //modules: ["Products"]
});

export default vuex.createStore({
  modules: {
    Products
  },
  //strict: debug,
  //plugins: debug ? [vuex.createLogger(), vuexLocal.plugin] : [vuexLocal.plugin]
  plugins: [vuexLocal.plugin]
})