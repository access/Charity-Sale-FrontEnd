<template>
  <div class="container">
    <div
      class="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center"
    >
      <div class="m-3 p-3 col">
        <div class="alert alert-primary" role="alert">
          Download sample configuration files for bulk uploading data to
          database:
          <ul>
            <li class="my-2">
              <a class="alert-link" href="/products.json" download
                >JSON format</a
              >
            </li>
            <li>
              <a class="alert-link" href="/products.xml" download>XML format</a>
            </li>
          </ul>
        </div>

        <div class="input-group mb-3">
          <input
            type="file"
            @change="onFileChange"
            class="form-control"
            id="productImage"
            accept=".json,.xml"
          />
          <label class="input-group-text" for="productImage"
            >Upload data to database</label
          >
        </div>

        <div class="m-3 p-3 col text-center">
          <button
            @click="productsBulkUpload(file)"
            :class="[
              fileLoaded
                ? 'btn btn-lg btn-success mt-4'
                : 'btn btn-lg btn-secondary disabled mt-4',
            ]"
          >
            Upload items data
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Bonus",
  props: {},
  data() {
    return {
      file: null,
      fileLoaded: false,
    };
  },
  methods: {
    ...mapActions(["productsBulkUpload"]),
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        this.fileLoaded = false;
        return;
      }
      this.loadContent(files[0]);
    },
    loadContent(file) {
      var reader = new FileReader();

      reader.onload = (e) => {
        this.file = e.target.result;
        this.fileLoaded = true;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>
