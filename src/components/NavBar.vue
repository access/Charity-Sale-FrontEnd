<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand text-info fw-bold" to="/">Charity Sale</router-link >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <router-link class="nav-link"  to="/">Products</router-link>
          </li>
          <li class="nav-item">
            <router-link  class="nav-link"  to="/checkout">Checkout</router-link>
          </li>
          <li class="nav-item">
            <router-link  class="nav-link"  to="/add">Add product</router-link>
          </li>
          <li class="nav-item">
            <router-link  class="nav-link"  to="/manage-products">Stock</router-link>
          </li>
          <li class="nav-item">
            <router-link  class="nav-link"  to="/bonus">Bonus</router-link>
          </li>
          <li class="nav-item">
            <button  class="btn btn-link nav-link" @click="openSwagger">Swagger</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>

export default ({
  methods:{
    openSwagger(){
      window.open(process.env.VUE_APP_BACKEND_SERVER_BASE+'/swagger');
    }
  }
})
</script>


<style scoped>
.active{
  font-weight: bold;
}
</style>
