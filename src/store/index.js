import { createStore, createLogger } from 'vuex'
import Products from './modules/Products'

const debug = process.env.NODE_ENV !== 'production';
export default createStore({
  state: {
  },
  getters: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    Products
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})