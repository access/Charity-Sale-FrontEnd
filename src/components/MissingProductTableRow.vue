<template>
  <tr class="text-nowrap table-danger">
    <th scope="row">{{ index + 1 }}</th>
    <td>
      <div class="d-flex justify-content-between">
        <span class="ml-3 fw-bold text-dark">{{ product.name }} </span>
      </div>
    </td>
    <td>{{ product.price.toFixed(2) }} €</td>
    <td>
      <span class="text-danger fw-bold">
        missing
        <button class="btn btn-sm btn-danger" @click="removeMissing(product)">
          <i class="bi bi-trash"></i></button
      ></span>
    </td>
    <td></td>
  </tr>
</template>

<script>
export default {
  name: "MissingProductItem",
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
    removeMissing: Function,
  },
  methods: {
    isOutOfStock() {
      return this.product.count <= 0;
    },
  },
};
</script>
