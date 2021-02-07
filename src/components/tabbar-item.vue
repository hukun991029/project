<template>
  <div class="tabbar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "tabbaritem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red",
    },
  },
  data() {
    return {};
  },
  computed: {
    isActive() {
      return this.$route.path.includes(this.path) == true;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path).catch(() => {});
    },
  },
};
</script>

<style lang="less">
.tabbar-item {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 49px;
  img {
    width: 24px;
    height: 24px;
  }
}
// .activeColor {
//   color: red;
// }
</style>
