<template>
    <NavBar />

  <router-view />
</template>

<script>
import NavBar from "@/components/NavBar.vue";
export default {
  components: {
    NavBar,
  },
  mounted() {
    document.title = "Charity Store";
  },
};
</script>

<style></style>
