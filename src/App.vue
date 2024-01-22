<template>
  <div id="app">
    <header-box></header-box>
    <router-view />
  </div>
</template>

<script>
import headerBox from "./components/header";

export default {
  name: "App",
  components: {
    headerBox
  },
  mounted() {
    // this.$router.push({
    //   path: "/Barracks",
    //   query: { label: "营区A" }
    // });
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
}
</style>
