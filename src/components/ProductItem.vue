<template>
  <div class="col my-3">
    <div
      :class="[
        isOutOfStock()
          ? 'card border-dark out-of-stock h-100'
          : 'card border-dark h-100',
      ]"
      @click="addToCart(product)"
    >
      <div class="mobile-overlay" v-show="!isOutOfStock()">
        <button class="mobile-icon btn btn-sm btn-link">
          <span class="bi bi-plus-circle-dotted"></span>
        </button>
      </div>

      <div class="container m-0 p-0 product-image">
        <img
          :src="[
            !!product.previewImageFileName
              ? imagesUrl
              : '/images/product-item.png',
          ]"
          class="mx-auto d-block product-item"
        />
        <div
          class="product-overlay text-center"
          v-show="!isOutOfStock()"
          title="ADD TO SHOPPING CART"
        >
          <button class="product-icon btn btn-link">
            <span class="bi bi-plus-circle-dotted"></span>
          </button>
          <span class="text-light fw-bold text-center add-to-cart-text"
            >ADD TO SHOPPING CART</span
          >
        </div>
      </div>
      <div class="card-body d-flex flex-column">
        <div class="mt-auto">
          <p class="h6 card-title text-nowrap mb-0">
            {{ product.name }}
          </p>
          <small class="text-nowrap text-info m-0 p-0">
            {{
              getCategoryName(product.categoryId).length
                ? getCategoryName(product.categoryId)
                : "&nbsp;"
            }}
          </small>
          <p class="h4 fw-bold mt-3 mb-0">{{ product.price.toFixed(2) }} €</p>
        </div>
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
  data() {
    return {
      imagesUrl:
        process.env.VUE_APP_STORE_IMAGES + this.product.previewImageFileName,
    };
  },
  props: {
    product: {
      id: Number,
      name: String,
      categoryId: Number,
      previewImageFileName: String,
      price: Number,
      count: Number,
    },
    addToCart: Function,
    getCategoryName: Function,
  },
  methods: {
    isOutOfStock() {
      return this.product.count <= 0;
    },
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

.mobile-overlay {
  display: none;
}

@media only screen and (max-width: 768px) {
  .mobile-overlay {
    position: absolute;
    bottom: 100px;
    right: 60px;
    display: block;
    background-color: rgb(2, 2, 2);
    visibility: visible;
    transform: scale(0.8);
  }

  .product-overlay {
    display: none;
  }

  .mobile-icon {
    color: rgb(0, 0, 0);
    font-size: 100px;
    position: absolute;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;
  }

  .add-to-cart-text {
    display: none;
  }
}
</style>
