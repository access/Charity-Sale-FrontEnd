import axios from 'axios';

const Products = {
  state: () => ({
    products: [],
    isLoading: false,
    cart: [],
    totalPrice: 0
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
    }
  },

  actions: {
    async confirmOrder({ commit }, cartList) {
      let url = `${process.env.VUE_APP_API_URL}ProductItems`;
      await axios.put(url, cartList)
        .then(res => {
          //const products = res.data;
          //commit('setProducts', products);
          console.log("res: ", res);
          commit('clearCart');
        }).catch(err => {
          console.log('error', err);
        });

    },

    async fetchAllProducts({ commit }) {
      let url = `${process.env.VUE_APP_API_URL}ProductItems`;
      await axios.get(url)
        .then(res => {
          const products = res.data;
          commit('setProducts', products);
        }).catch(err => {
          console.log('error', err);
        });
    },

    async addToCart({ commit, dispatch }, product) {
      // await dispatch('fetchProductInfo', product);
      await dispatch('fetchAllProducts');
      commit('addProductToCart', product);
      commit('calculateTotalPrice');
      //console.log('addProductToCart', product);
    },

    async removeFromCart({ commit, dispatch }, product) {
      commit('removeProductFromCart', product);
      await dispatch('fetchAllProducts');
      commit('calculateTotalPrice');
    },

    async clearCart({ commit, dispatch }) {
      commit('clearCart');
      await dispatch('fetchAllProducts');
      commit('calculateTotalPrice');
    },

    async fetchProductInfo({ commit }, product) {
      await axios.get(`${process.env.VUE_APP_API_URL}ProductItems/${product.id}`)
        .then(async res => {
          commit('setProductInfo', await res.data);
        }).catch(err => {
          console.log('error', err);
        });
    },
  },

  mutations: {
    setProducts: (state, products) => {
      // check if Cart already filled
      // then recalculate products...
      for (const [idxInCart, productItemInCart] of state.cart.entries()) {
        for (const [idxFetchedProduct, productFetched] of products.entries()) {
          if (productItemInCart.id == productFetched.id) {
            const fetchedProductCount = productFetched.count;
            const cartProductCount = state.cart[idxInCart].count;
            products[idxFetchedProduct].count = fetchedProductCount - cartProductCount;
          }
        }
      }
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
        amount += cartItem.price * cartItem.count;
      }
      state.totalPrice = amount;
    },

    clearCart(state) {
      state.cart = [];
      state.totalPrice = 0;
    },

    setProductInfo(state, product) {
      //console.log("product: ", product);
      console.log("fetchProductInfo: ", state, product);
      // for (const [index, item] of state.products.entries()) {
      //   if (item.id == product.id) {

      //     //state.products[index] = product;
      //     //console.log("founded: ", state.products[index].count);
      //     break;
      //   }
      // }
    }
  }
}

export default Products;