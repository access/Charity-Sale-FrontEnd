<template>
  <div class="container">
    <div class="row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 ">
      <template v-for="index in 7" :key="index">
      <ProductItem :count="index"/>
      </template>
    </div>
  </div>
</template>

<script>
import ProductItem from "@/components/ProductItem.vue";

export default {
  name: "ProductList",
  props: {
    msg: String,
  },
  components: { ProductItem },
};
</script>

<style scoped></style>
