import vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import Products from './modules/Products'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default vuex.createStore({
  modules: {
    Products
  },
  plugins: [vuexLocal.plugin]
})