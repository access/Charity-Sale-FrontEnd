<template>
  <tr class="text-nowrap">
    <th scope="row">{{ index + 1 }}</th>
    <td>
      <span class="fw-bold text-dark"
        >{{ product.name }}
        <span
          :class="[
            productAvailableCount(product) > 0
              ? 'badge rounded-pill bg-success'
              : 'badge rounded-pill bg-warning',
          ]"
        >
          {{ productAvailableCount(product) }}</span
        >
      </span>
    </td>
    <td>{{ product.price.toFixed(2) }} €</td>
    <td>
      <button class="btn btn-lg m-0 p-0" @click="removeFromCart(product)">
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
    </td>
    <td>{{ (product.count * product.price).toFixed(2) }} €</td>
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
    removeFromCart: Function,
  },
  methods: {
    isOutOfStock() {
      return this.product.count <= 0;
    },
  },
};
</script>
