<template>
    <nav
      class="navbar navbar-expand-md navbar-light fixed-bottom"
      style="background-color: #e3f2fd;"
    >
      <div class="container-fluid">
        <span class="navbar-brand text-dark">Cart: </span>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#CartBarCollapse"
          aria-controls="CartBarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="bi bi-cart4"></i>
        </button>
        <div class="collapse navbar-collapse" id="CartBarCollapse">
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Total amount: {{productList.length}}</router-link>
            </li>
            <li class="nav-item">
              <button class="btn btn-warning">Reset order</button>
            </li>
            <li class="nav-item">
              <button class="btn btn-success">Checkout</button>
            </li>
          </ul>
          <form class="d-flex">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
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
  components: {  },
  computed: {
    ...mapGetters(["productList", "isLoading"]),
  },
  methods: {
    ...mapActions(["fetchAllProducts", "addToCart"]),
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
