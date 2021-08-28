<template>
  <div class="col">
    <div
      class="card my-3 border-dark"
      :style="[count < 3 ? 'background-color:#F0F0F0;opacity:0.4;' : '']"
    >
        <img src="@/assets/logo.png" class="mx-auto d-block" />
      <div class="card-body">
        <p class="h6 card-title text-nowrap mb-4">
          Brownie
        </p>
        <p class="h4 fw-bold">0.65 €</p>
      </div>
      <div class="card-footer text-center">
        <span
          :class="[
            count > 2
              ? 'bi bi-check-lg text-success'
              : 'bi bi-x-lg text-warning',
          ]"
        ></span>

        <span class="text-muted">
          In stock:
          <span
            :class="[
              count > 2
                ? 'badge rounded-pill bg-success'
                : 'badge rounded-pill bg-warning',
            ]"
            >{{ count }}</span
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
    id: Number,
    name: String,
    categoryId: Number,
    imageUrl: String,
    price: Number,
    count: Number,
    reserved: Number,
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

img.resize {
  height: auto;
}
</style>
