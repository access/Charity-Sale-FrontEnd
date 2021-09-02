<template>
  <div class="container">
    <div
      class="row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 "
    >
      <template v-for="product in productList" :key="product.id">
        <ManageProductItem
          :product="product"
          :addToCart="addToCart"
          :getCategoryName="getCategoryName"
          :setCurrentManagedProduct="setCurrentManagedProduct"
        />
      </template>

      <ManageItemModal
        modalTarget="ManageProductModal"
        message="Are you sure you want to publish this new product?"
        actionButtonName="Confirm changes"
        :product="currentManagedProduct"
        :getCategoryName="getCategoryName"
        :increaseCount="increaseCount"
        :decreaseCount="decreaseCount"
        :setCount="setCount"
        :changeProduct="changeProduct"
      />
    </div>
  </div>
</template>

<script>
import ManageProductItem from "@/components/ManageProductItem.vue";
import { mapGetters, mapActions } from "vuex";
import ManageItemModal from "@/components/ManageItemModal.vue";

export default {
  name: "ManageProductList",
  components: { ManageProductItem, ManageItemModal },
  data() {
    return {
      currentManagedProduct: {
        id: 0,
        categoryId: -1,
        name: "",
        previewImageFileName: "",
        price: 0,
        count: null,
        reserved: 0,
        imageFile: null,
      },
    };
  },
  computed: {
    ...mapGetters(["productList", "isLoading", "getCategoryName"]),
  },
  methods: {
    ...mapActions([
      "fetchAllProducts",
      "addToCart",
      "changeProduct",
      "setManagmentMode",
    ]),
    setCurrentManagedProduct(product) {
      const clonedProduct = {
        ...product,
      };
      this.currentManagedProduct = clonedProduct;
    },
    increaseCount() {
      this.currentManagedProduct.count++;
    },
    decreaseCount() {
      if (this.currentManagedProduct.count - 1 >= 0)
        this.currentManagedProduct.count--;
    },
    setCount(count) {
      if (count >= 0) this.currentManagedProduct.count = count;
    },
  },
  created() {
    this.fetchAllProducts();
    this.setManagmentMode(true);
  },
  unmount() {
  },
  beforeUnmount() {
    this.setManagmentMode(false);
  },
};
</script>

<style scoped></style>
