import axios from 'axios';
import { notify } from "@kyvg/vue3-notification";

const notice = (title, message, type = '') => {
  notify({
    title: title,
    text: message,
    duration: 5000,
    type: type
  });
};

const Products = {
  state: () => ({
    products: [],
    categories: [],
    isLoading: false,
    cart: [],
    totalPrice: 0,
    managmentMode: false,
  }),

  getters: {
    productList: state => state.products,
    isLoading: state => state.isLoading,
    totalPrice: state => state.totalPrice,
    cartList: state => state.cart,
    productAvailableCount: state => (productInCart) => {
      for (const item of state.products) {
        if (item.id == productInCart.id) {
          return item.count;
        }
      }
      return 0;
    },
    getCategoryName: state => (categoryId) => {
      for (const item of state.categories) {
        if (item.id == categoryId) {
          return item.name;
        }
      }
      return '';
    },
    categoryList: state => state.categories,
    managmentMode: state => state.managmentMode,
  },

  actions: {
    // POST: api/BulkUpload
    async productsBulkUpload({ commit }, fileContent) {
      const url = `${process.env.VUE_APP_API_BULK_UPLOAD}`;
      const params = new URLSearchParams()
      params.append('bulkdata', fileContent);
      await axios.post(url, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
        .then(res => {
          if (res.status == 204) {
            notice("Bulk upload", "Upload succesful complete!", 'success');
            commit("OK");
          }
          else {
            notice("Bulk upload", `${res.status} An error has occurred!`, 'warn');
          }
        }).catch(err => {
          notice("Bulk upload", `${err}`, 'error');
        });
    },

    setManagmentMode({ commit }, mode = false) {
      commit('setManagmentMode', mode);
    },

    async changeProduct({ commit, dispatch }, product) {
      // PUT: api/ProductItems/5
      const url = `${process.env.VUE_APP_API_PRODUCT_ITEMS}/${product.id}`;

      await axios.put(url, product)
        .then(async res => {
          await dispatch('fetchAllProducts');
          if (res.status == 204) {
            notice("Stock manage", "Changes have been applied!", 'success');
            commit("OK");
          }
          else {
            notice("Stock manage", `${res.status} An error has occurred!`, 'warn');
          }
          commit("OK");
          //const products = res.data;
          //commit('setProducts', products);
        }).catch(err => {
          notice("Stock manage", `${err}`, 'error');
        });
    },
    // POST: api/ProductItems
    async postNewProduct({ commit }, product) {
      const url = `${process.env.VUE_APP_API_PRODUCT_ITEMS}`;
      await axios.post(url, product)
        .then(res => {
          if (res.status == 201) {
            notice("Publish product", "Your publish is complete!", 'success');
            commit("OK");
          }
          else {
            notice("Publish product", `${res.status} An error has occurred!`, 'warn');
          }
          commit("OK");
        }).catch(err => {
          notice("Publish product", `${err}`, 'error');
        });
    },
    // PUT: api/ProductItems -> [FromBody] ProductItem[] productItems
    async confirmOrder({ commit }, cartList) {
      const url = `${process.env.VUE_APP_API_PRODUCT_ITEMS}`;
      await axios.put(url, cartList)
        .then(res => {
          if (res.status == 204) {
            notice("Checkout", "Your order is complete!", 'success');
            commit('clearCart');
          }
          else {
            notice("Checkout", `${res.status} An error has occurred!`, 'warn');
          }
        }).catch(err => {
          notice("Checkout", `${err}`, 'error');
        });

    },

    async fetchAllProducts({ commit, dispatch }) {
      dispatch('fetchAllCategories');
      const url = `${process.env.VUE_APP_API_PRODUCT_ITEMS}`;
      await axios.get(url, {
        headers: { 'Cache-Control': 'no-cache' }
      })
        .then(res => {
          const products = res.data;
          commit('setProducts', products);
          commit('calculateTotalPrice');
        }).catch(err => {
          notice("Retrieving data", `${err}`, 'error');
        });
    },

    async fetchAllCategories({ commit }) {
      const url = `${process.env.VUE_APP_API_CATEGORIES}`;
      await axios.get(url)
        .then(async res => {
          const categories = res.data;
          commit('setCategories', await categories);
        }).catch(err => {
          notice("Retrieving data", `${err}`, 'error');
        });
    },

    async addToCart({ commit, dispatch }, product) {
      // await dispatch('fetchProductInfo', product);
      await dispatch('fetchAllProducts');
      commit('addProductToCart', product);
      commit('calculateTotalPrice');
    },

    async removeOneFromCart({ commit, dispatch }, product) {
      commit('removeProductFromCart', product);
      await dispatch('fetchAllProducts');
      commit('calculateTotalPrice');
    },

    async clearCart({ commit, dispatch }) {
      commit('clearCart');
      notice("Shopping cart", `Your shopping cart is empty!`, 'warn');
      await dispatch('fetchAllProducts');
      commit('calculateTotalPrice');
    },

    // async fetchProductInfo({ commit }, product) {
    //   await axios.get(`${process.env.VUE_APP_API_PRODUCT_ITEMS}/${product.id}`)
    //     .then(async res => {
    //       commit('OK');
    //     }).catch(err => {
    //       notice("Retrieving data", `${err}`, 'error');
    //     });
    // },
  },

  mutations: {
    setManagmentMode: (state, mode) => {
      state.managmentMode = mode;
    },

    setCategories: (state, categories) => {
      state.categories = categories;
    },

    setProducts: (state, products) => {
      //if (!state.managmentMode) 
      if (!state.managmentMode) {
        // check if Cart already filled
        // then recalculate products...
        for (const [idxInCart, productItemInCart] of state.cart.entries()) {
          for (const [idxFetchedProduct, productFetched] of products.entries()) {
            if (productItemInCart.id == productFetched.id) {
              const fetchedProductCount = productFetched.count;
              const cartProductCount = state.cart[idxInCart].count;
              // Calculated store items balance
              const availableQuantity = fetchedProductCount - cartProductCount;
              products[idxFetchedProduct].count = availableQuantity;
            }
          }
        }
      }
      products.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
      state.products = products;
    },

    removeProductFromCart(state, product) {
      for (const [idx, productItemInCart] of state.cart.entries()) {
        if (productItemInCart.id == product.id) {
          if (state.cart[idx].count - 1 > 0) {
            state.cart[idx].count--;
          } else {
            state.cart.splice(idx, 1);
          }
        }
      }
    },

    addProductToCart(state, product) {
      // work with count of item in each object...
      // lets find needed product-object...
      for (const [index, item] of state.products.entries()) {
        if (item.id == product.id) {
          // OK! We found it.. 
          // Let's check the count of items and remove one.
          if (item.count > 0) {
            // decrease clicked product count
            state.products[index].count--;
            // check Cart for existing the same product
            // if exists, then increase count, else add new product to Cart
            let foundedProductInCart = false;
            for (const [idx, productItemInCart] of state.cart.entries()) {
              if (productItemInCart.id == product.id) {
                foundedProductInCart = true;
                state.cart[idx].count++;
                break;
              }
            }
            if (!foundedProductInCart) {
              const newCartItem = {
                ...product,
                count: 1
              };
              state.cart.push(newCartItem);
            }
          }
          break;
        }
      }
    },

    calculateTotalPrice(state) {
      // calculate the Total price...
      let amount = 0;
      for (const cartItem of state.cart) {
        // check if missing in stock, then ignore calculate
        let canCalculate = false;
        for (const product of state.products) {
          if (product.id == cartItem.id && product.count >= 0) {
            canCalculate = true;
            break;
          }
        }
        if (canCalculate)
          amount += cartItem.price * cartItem.count;
      }
      state.totalPrice = amount;
    },

    clearCart(state) {
      state.cart = [];
      state.totalPrice = 0;
    },

    // setProductInfo(state, product) {
    //   console.log("fetchProductInfo: ", state, product);
    //   // for (const [index, item] of state.products.entries()) {
    //   //   if (item.id == product.id) {

    //   //     //state.products[index] = product;
    //   //     //console.log("founded: ", state.products[index].count);
    //   //     break;
    //   //   }
    //   // }
    // },
    OK() {

    }
  }
}

export default Products;