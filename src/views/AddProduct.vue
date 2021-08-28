<template>
  <div class="container">
    <div
      class="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center"
    >
      <div class="m-3 p-3 col">
        <div class="mb-3">
          <select
            v-model="categoryId"
            class="form-select"
            aria-label="Default select example"
          >
            <option value="0" selected>Select product category</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="productName" class="form-label">Product name</label>
          <input
            v-model="name"
            type="text"
            class="form-control"
            id="productName"
            aria-describedby="productNameHelp"
          />
          <div id="productNameHelp" class="form-text">
            Name for the specified item for example: Shorts
          </div>
        </div>
        <label for="productPrice" class="form-label">Product price</label>
        <div class="input-group">
          <input
            v-model="price"
            type="number"
            class="form-control"
            id="productPrice"
            aria-describedby="productPriceHelp"
            min="0.00"
            step="0.01"
          />
          <span class="input-group-text">€</span>
        </div>
        <div id="productPriceHelp" class="form-text mb-3">
          Price for the specified product for example: 0.12
        </div>
        <div class="mb-3">
          <label for="productCount" class="form-label">Product count</label>
          <input
            v-model="count"
            type="number"
            class="form-control"
            id="productCount"
            aria-describedby="productCountHelp"
            step="1"
          />
          <div id="productCountHelp" class="form-text">
            The quantity of the specified product (cannot be 0 or less) for
            example: 22
          </div>
        </div>

        <div class="input-group mb-3">
          <input
            type="file"
            @change="onFileChange"
            class="form-control"
            id="productImage"
            accept="image/x-png,image/gif,image/jpeg"
          />
          <label class="input-group-text" for="productImage"
            >Upload Preview Image</label
          >
        </div>

        <button
          @click="addProduct"
          class="btn btn-sm-lg btn-outline-primary mt-4"
        >
          Add product
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddProduct",
  props: {},
  data() {
    return {
      categoryId: 0,
      name: "",
      price: null,
      count: null,
      imageFile: null,
      image: new Image(),
    };
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var reader = new FileReader();

      reader.onload = (e) => {
        this.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function() {
      this.image = "";
    },
    addProduct() {
      const product = {
        categoryId: this.categoryId,
        name: this.name,
        price: this.price,
        count: this.count,
        imageFile: this.image,
      };
      console.log("Product: ", product);
    },
  },
};
</script>
