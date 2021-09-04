<template>
  <div class="container">
    <div
      class="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center"
    >
      <div class="m-3 p-3 col">
        <div class="mb-3">
          <select
            v-model="product.categoryId"
            :class="[
              product.categoryId >= 0
                ? 'form-select is-valid'
                : 'form-select is-invalid',
            ]"
            aria-label="Default select example"
          >
            <option value="-1" selected>Select product category</option>
            <option
              v-for="category in categoryList"
              :key="category.id"
              :value="category.id"
              >{{ category.name }}</option
            >
          </select>
        </div>
        <div class="mb-3">
          <label for="productName" class="form-label">Product name</label>
          <input
            v-model="product.name"
            type="text"
            :class="[
              !!product.name
                ? 'form-control is-valid'
                : 'form-control is-invalid',
            ]"
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
            v-model="product.price"
            type="number"
            :class="[
              product.price >= 0 &&
              product.price != null &&
              product.price !== ''
                ? 'form-control is-valid'
                : 'form-control is-invalid',
            ]"
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
            v-model="product.count"
            type="number"
            :class="[
              product.count > 0 && product.count != null && product.count !== ''
                ? 'form-control is-valid'
                : 'form-control is-invalid',
            ]"
            id="productCount"
            aria-describedby="productCountHelp"
            step="1"
            min="0"
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

        <div class="m-3 p-3 col text-center">
          <button
            :class="[
              isValidProduct()
                ? 'btn btn-lg btn-success mt-4'
                : 'btn btn-lg btn-secondary disabled mt-4',
            ]"
            data-bs-toggle="modal"
            data-bs-target="#addNewProduct"
          >
            Publish new product
          </button>

          <Modal
            :action="addNewProduct"
            modalTarget="addNewProduct"
            message="Are you sure you want to publish this new product?"
            title="Confirm publication"
            actionButtonName="Confirm publication!"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Modal from "@/components/Modal.vue";

export default {
  name: "AddProduct",
  props: {},
  components: { Modal },
  data() {
    return {
      product: {
        id: 0,
        categoryId: -1,
        name: "",
        previewImageFileName: "",
        price: null,
        count: null,
        reserved: 0,
        imageFile: null,
      },
      image: new Image(),
    };
  },
  computed: {
    ...mapGetters(["categoryList"]),
  },

  methods: {
    ...mapActions(["postNewProduct"]),

    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var reader = new FileReader();

      reader.onload = (e) => {
        this.product.imageFile = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function() {
      this.image = "";
    },
    addNewProduct() {
      if (this.isValidProduct()) {
        this.postNewProduct(this.product);
      }
    },
    isValidProduct() {
      return (
        this.product.categoryId >= 0 &&
        !!this.product.name &&
        this.product.price >= 0 &&
        this.product.price != null &&
        this.product.price !== "" &&
        this.product.count > 0 &&
        this.product.count != null &&
        this.product.count !== ""
      );
    },
  },
};
</script>
