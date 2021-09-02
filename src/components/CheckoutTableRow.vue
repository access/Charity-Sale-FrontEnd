<template>
  <tr :class="[isMissing() ? 'text-nowrap table-danger' : 'text-nowrap']">
    <th scope="row">{{ index + 1 }}</th>
    <td>
      <div class="d-flex justify-content-between">
        <span
          :class="[
            isMissing()
              ? 'ml-3 fw-bold text-muted'
              : 'ml-3 fw-bold text-success',
          ]"
          >{{ product.name }}
        </span>
        <span
          v-if="!isMissing()"
          :class="[
            productAvailableCount(product) > 0
              ? 'badge rounded-pill bg-success'
              : 'badge rounded-pill bg-warning',
          ]"
        >
          {{ productAvailableCount(product) }}</span
        >
        <span v-else class="badge rounded-pill bg-danger">missing: {{ Math.abs(productAvailableCount(product)) }}</span>
      </div>
    </td>
    <td>{{ product.price.toFixed(2) }} €</td>
    <td>
      <!-- <div v-if="isMissing()">
        <button class="btn btn-sm btn-danger m-0" @click="removeMissing(product)">
          <i class="bi bi-trash m-0"></i>
        </button>
      </div> -->
      <div>
        <button class="btn btn-lg m-0 p-0" @click="removeOneFromCart(product)">
          <i class="bi bi-dash-circle-dotted"></i>
        </button>
        {{ product.count }}
        <button
          class="btn btn-lg m-0 p-0"
          @click="addToCart(product)"
          v-show="productAvailableCount(product) > 0"
        >
          <i class="bi bi-plus-circle-dotted"></i>
        </button>
      </div>
    </td>
    <td><div v-show="!isMissing()">{{ (product.count * product.price).toFixed(2) }} €</div></td>
  </tr>
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
    index: Number,
    productAvailableCount: Function,
    removeOneFromCart: Function,
  },
  methods: {
    isOutOfStock() {
      return this.product.count <= 0;
    },
    isMissing() {
      return this.productAvailableCount(this.product) < 0;
    },
  },
};
</script>
