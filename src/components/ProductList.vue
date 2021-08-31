<template>
  <div class="container">
    <div
      class="row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 "
    >
      <template v-for="product in productList" :key="product.id">
        <ProductItem
          :product="product"
          :addToCart="addToCart"
          :getCategoryName="getCategoryName"
        />
      </template>
    </div>
  </div>
</template>

<script>
import ProductItem from "@/components/ProductItem.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ProductList",
  components: { ProductItem },
  computed: {
    ...mapGetters(["productList", "isLoading","getCategoryName"]),
  },
  methods: {
    ...mapActions(["fetchAllProducts", "addToCart"]),
  },
  created() {
    this.fetchAllProducts();
  },
};
</script>

<style scoped></style>
