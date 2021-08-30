<template>
  <nav
    class="navbar navbar-expand-md navbar-light fixed-bottom"
    style="background-color: #e3f2fd;"
  >
    <div class="container-fluid">
      <span class="navbar-brand text-dark"
        ><i :class="[totalPrice > 0 ? 'bi-cart-check-fill' : 'bi bi-cart']"></i>
        Total amount: {{ totalPrice.toFixed(2) }} €</span
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#CartBarCollapse"
        aria-controls="CartBarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="bi bi-list-check"></i>
      </button>
      <div class="collapse navbar-collapse" id="CartBarCollapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <button
              @click="clearCart"
              class="btn btn-warning mt-2  my-md-0 mx-md-2"
            >
              <i class="bi bi-recycle"></i>
              CLEAR SHOPPING CART
            </button>
          </li>
          <li class="nav-item" v-show="$route.name != 'Checkout'">
            <router-link
              class="btn btn-success mt-2 my-md-0 mx-md-2"
              to="/checkout"
            >
              <i class="bi bi-bag-check"></i>
              GO TO CKECKOUT
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CartBar",
  props: {
    msg: String,
  },
  components: {},
  computed: {
    ...mapGetters(["productList", "isLoading", "totalPrice"]),
  },
  methods: {
    ...mapActions(["fetchAllProducts", "addToCart", "clearCart"]),
    getResults() {
      this.fetchAllProducts(this.query);
    },
    searchProducts() {
      this.fetchAllProducts(this.query);
    },
  },

  created() {
    this.fetchAllProducts();
  },
};
</script>
