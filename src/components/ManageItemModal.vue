<template>
  <!-- Modal -->
  <div
    class="modal fade"
    :id="modalTarget"
    tabindex="-1"
    aria-labelledby="modalTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalTitle">{{ product.name }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body h5">
          <div class="card border-dark h-100">
            <div class="container m-0 p-0 product-image">
              <img
                :src="[
                  !!product.previewImageFileName
                    ? imagesUrl + product.previewImageFileName
                    : '/images/product-item.png',
                ]"
                class="mx-auto d-block product-item"
              />
            </div>
            <div class="card-body d-flex flex-column">
              <div class="mt-auto">
                <p class="h4 fw-bold mt-3 mb-0">
                  {{ product.price.toFixed(2) }} €
                </p>
              </div>
            </div>
            <div class="card-footer text-center">
              <label for="productPrice" class="form-label">In stock:</label>
              <div class="input-group">
                <button class="btn btn-lg btn-outline-secondary" type="button" @click="decreaseCount">
                  <i class="bi bi-dash-circle"></i>
                </button>
                <input
                  type="number"
                  @change="setCount($event.target.value)"
                  :value="product.count"
                  class="form-control"
                  id="productPrice"
                  aria-describedby="productPriceHelp"
                  min="0.00"
                  step="1"
                />
                <button class="btn btn-lg btn-outline-secondary" type="button" @click="increaseCount">
                  <i class="bi bi-plus-circle"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="action"
          >
            {{ actionButtonName }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ManageModal",
  props: {
    setCount: Function,
    increaseCount: Function,
    decreaseCount: Function,
    getCategoryName: Function,
    action: Function,
    modalTarget: String,
    message: String,
    title: String,
    actionButtonName: String,
    product: {
      id: Number,
      name: String,
      categoryId: Number,
      previewImageFileName: String,
      price: Number,
      count: Number,
    },
  },
  data() {
    return {
      imagesUrl: process.env.VUE_APP_STORE_IMAGES,
    };
  },
  methods: {
    isOutOfStock() {
      return this.product.count <= 0;
    },
  },

};
</script>

<style scoped>
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
