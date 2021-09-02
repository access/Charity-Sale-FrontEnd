<template>
  <NavBar />
  <CartBar />
  <notifications position="bottom right" max="3" />
  <router-view />
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import CartBar from "@/components/CartBar.vue";

export default {
  components: {
    NavBar,
    CartBar,
  },
  mounted() {
    document.title = process.env.VUE_APP_TITLE;
  },
};
</script>

<style></style>
