<template>
  <div id="app">
    <maintabbar></maintabbar>
    <router-view></router-view>
    <button @click="prev">-</button>
    <button @click="next">+</button>
    <h1>{{ $store.state.counter }}</h1>
    <h1>{{ $store.getters.more20age }}</h1>
    <h1>{{ $store.getters.more20agelength(5) }}</h1>
    <button @click="changeInfo">更改信息</button>
    <h1>{{ $store.state.info }}</h1>
  </div>
</template>

<script>
import maintabbar from "./components/main-tabbar";
export default {
  name: "App",
  components: {
    maintabbar,
  },
  computed: {},
  methods: {
    prev() {
      this.$store.commit("prev");
    },
    next() {
      this.$store.commit("next");
    },
    changeInfo() {
      this.$store.commit("updateInfo");
    },
  },
};
</script>
<style lang="less">
@import url("./assets/common/normalize.css");
button {
  width: 30px;
}
</style>
