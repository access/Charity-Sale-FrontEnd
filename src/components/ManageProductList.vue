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
        :product="currentManagedProduct"
        actionButtonName="Confirm changes"
        :getCategoryName="getCategoryName"
        :increaseCount="increaseCount"
        :decreaseCount="decreaseCount"
         :setCount="setCount"
     />
    </div>
  </div>
</template>

<script>
import ManageProductItem from "@/components/ManageProductItem.vue";
import { mapGetters, mapActions } from "vuex";
import ManageItemModal from "@/components/ManageItemModal.vue";

export default {
  name: "ProductList",
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
    ...mapActions(["fetchAllProducts", "addToCart"]),
    setCurrentManagedProduct(product) {
      const clonedProduct = {
        ...product
      };
      this.currentManagedProduct = clonedProduct;
    },
    increaseCount(){
      this.currentManagedProduct.count++;
    },
    decreaseCount(){
      if(this.currentManagedProduct.count-1>=0)
      this.currentManagedProduct.count--;
    },
    setCount(count){
      console.log('count: ',count)
      if(count>=0)
      this.currentManagedProduct.count=count;
    }

  },
  created() {
    this.fetchAllProducts();
  },
};
</script>

<style scoped></style>
