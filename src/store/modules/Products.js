import axios from 'axios';

const Products = {
  state: () => ({
    products: [],
    productsPaginatedData: null,
    product: null,
    isLoading: false,
    isCreating: false,
    createdData: null,
    isUpdating: false,
    updatedData: null,
    isDeleting: false,
    deletedData: null,
    cart: []
  }),

  getters: {
    productList: state => state.products,
    productsPaginatedData: state => state.productsPaginatedData,
    product: state => state.product,
    isLoading: state => state.isLoading,
    isCreating: state => state.isCreating,
    isUpdating: state => state.isUpdating,
    createdData: state => state.createdData,
    updatedData: state => state.updatedData,

    isDeleting: state => state.isDeleting,
    deletedData: state => state.deletedData
  },

  actions: {
    async fetchAllProducts({ commit }) {
      commit('setProductIsLoading', true);
      let url = `${process.env.VUE_APP_API_URL}ProductItems`;
      await axios.get(url)
        .then(res => {
          //console.log('ress:  ', res);
          const products = res.data;
          commit('setProducts', products);
          commit('setProductIsLoading', false);
        }).catch(err => {
          console.log('error', err);
          commit('setProductIsLoading', false);
        });
    },

    addToCart({ commit }, product) {
      commit('addProductToCart', product);
      //console.log('addProductToCart', product);
    },

    async fetchDetailProduct({ commit }, id) {
      commit('setProductIsLoading', true);
      await axios.get(`${process.env.API_URL}products/${id}`)
        .then(res => {
          commit('setProductDetail', res.data.data);
          commit('setProductIsLoading', false);
        }).catch(err => {
          console.log('error', err);
          commit('setProductIsLoading', false);
        });
    },

    async storeProduct({ commit }, product) {
      commit('setProductIsCreating', true);
      await axios.post(`${process.env.API_URL}products`, product)
        .then(res => {
          commit('saveNewProducts', res.data.data);
          commit('setProductIsCreating', false);
        }).catch(err => {
          console.log('error', err);
          commit('setProductIsCreating', false);
        });
    },

    async updateProduct({ commit }, product) {
      commit('setProductIsUpdating', true);
      commit('setProductIsUpdating', true);
      await axios.post(`${process.env.API_URL}products/${product.id}?_method=PUT`, product)
        .then(res => {
          commit('saveUpdatedProduct', res.data.data);
          commit('setProductIsUpdating', false);
        }).catch(err => {
          console.log('error', err);
          commit('setProductIsUpdating', false);
        });
    },

    async deleteProduct({ commit }, id) {
      commit('setProductIsDeleting', true);
      await axios.delete(`${process.env.API_URL}products/${id}`)
        .then(res => {
          commit('setDeleteProduct', res.data.data.id);
          commit('setProductIsDeleting', false);
        }).catch(err => {
          console.log('error', err);
          commit('setProductIsDeleting', false);
        });
    },

    updateProductInput({ commit }, e) {
      commit('setProductDetailInput', e);
    }
  },

  mutations: {
    setProducts: (state, products) => {
      state.products = products
    },

    setProductsPaginated: (state, productsPaginatedData) => {
      state.productsPaginatedData = productsPaginatedData
    },

    setProductDetail: (state, product) => {
      state.product = product
    },

    setDeleteProduct: (state, id) => {
      state.productsPaginatedData.data.filter(x => x.id !== id);
    },

    setProductDetailInput: (state, e) => {
      let product = state.product;
      product[e.target.name] = e.target.value;
      state.product = product
    },

    saveNewProducts: (state, product) => {
      state.products.unshift(product)
      state.createdData = product;
    },

    saveUpdatedProduct: (state, product) => {
      state.products.unshift(product)
      state.updatedData = product;
    },

    setProductIsLoading(state, isLoading) {
      state.isLoading = isLoading
    },

    setProductIsCreating(state, isCreating) {
      state.isCreating = isCreating
    },

    setProductIsUpdating(state, isUpdating) {
      state.isUpdating = isUpdating
    },

    setProductIsDeleting(state, isDeleting) {
      state.isDeleting = isDeleting
    },

    addProductToCart(state, product) {
      // console.log('state.products: ', state.products);
      // let filtered = state.products.filter(function (item) {
      //   return item.id != product.id;
      // });
      // console.log('filtered: ', filtered);

      // work with count of product in each object...
      // lets find needed product-object...
      let idx = -1;
      for (const [index, item] of state.products.entries()) {
          console.log('finded,index: ', item,index);
        if (item == product) {
          idx = index;
          // OK! We found it.. 
          // Let's check the count of items and remove one.
          console.log('finded: ', item);
          if (item.count > 0) {
            //item.count--;
            state.products[idx].count--;
          }

          break;
        }
      }


      //state.products = filtered;
      //state.products.filter(item => item.id !== product.id);
      //state.cart.push(product);
    },

  }
}

export default Products;