<template>
  <div class="col">
    <div
      :class="[
        isOutOfStock()
          ? 'card my-3 border-dark out-of-stock'
          : 'card my-3 border-dark',
      ]"
      @click="addToCart(product)"
    >
      <div class="container m-0 p-0 product-image">
        <img
          :src="[
            !!product.previewImageFileName
              ? process.env.VUE_APP_STORE_IMAGES + product.previewImageFileName
              : '/images/product-item.png',
          ]"
          class="mx-auto d-block product-item"
        />
        <div class="product-overlay" v-show="!isOutOfStock()">
          <button class="product-icon btn btn-link">
            <span class="bi bi-plus-circle-dotted"></span>
          </button>
        </div>
      </div>
      <div class="card-body pt-2">
        <p class="h6 card-title text-nowrap mb-4">
          {{ product.name }}
        </p>
        <p class="h4 fw-bold">{{ product.price.toFixed(2) }} €</p>
      </div>
      <div class="card-footer text-center">
        <span
          :class="[
            isOutOfStock()
              ? 'bi bi-x-lg text-warning'
              : 'bi bi-check-lg text-success',
          ]"
        ></span>

        <span class="text-muted">
          In stock:
          <span
            :class="[
              isOutOfStock()
                ? 'badge rounded-pill bg-warning'
                : 'badge rounded-pill bg-success',
            ]"
            >{{ product.count }}</span
          >
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductItem",
  props: {
    product: {
      id: Number,
      name: String,
      categoryId: Number,
      previewImageFileName: String,
      price: Number,
      count: Number,
      reserved: Number,
    },
    addToCart: Function,
  },
  methods: {
    isOutOfStock() {
      return this.product.count <= 0;
    },
  },
  mounted() {
    //console.log("this.product: ", this.product);
  },
};
</script>

<style scoped>
.card:hover {
  transform: scale(1.025);
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.5), 1 4px 8px rgba(0, 0, 0, 0.06);
}
.card {
  box-shadow: 0 12px 10px rgba(0, 0, 0, 0.1), 0 0 6px rgba(0, 0, 0, 0.05);
}

.out-of-stock {
  background-color: #f0f0f0;
  opacity: 0.4;
}

.product-overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: 0.3s ease;
  background-color: rgb(66, 144, 66);
}

.product-image:hover .product-overlay {
  opacity: 0.5;
}

.product-icon {
  color: white;
  font-size: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}

.product-item {
  max-height: 250px;
  max-width: 200px;
}
</style>
