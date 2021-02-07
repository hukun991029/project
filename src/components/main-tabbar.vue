<template>

    <tabbar>
      <tabbaritem path="/home">
        <template v-slot:item-icon>
          <img src="@/assets/img/tabbar/home.svg" alt="" />
        </template>
        <template v-slot:item-icon-active>
          <img src="@/assets/img/tabbar/home_active.svg" alt="" />
        </template>
        <template v-slot:item-text>
          <p>首页</p>
        </template>
      </tabbaritem>
      <tabbaritem path="/category">
        <template v-slot:item-icon>
          <img src="@/assets/img/tabbar/category.svg" alt="" />
        </template>
        <template v-slot:item-icon-active>
          <img src="@/assets/img/tabbar/category_active.svg" alt="" />
        </template>
        <template v-slot:item-text>
          <p>分类</p>
        </template>
      </tabbaritem>
      <tabbaritem path="/cart">
        <template v-slot:item-icon>
          <img src="@/assets/img/tabbar/shopcart.svg" alt="" />
        </template>
        <template v-slot:item-icon-active>
          <img src="@/assets/img/tabbar/shopcart_active.svg" alt="" />
        </template>
        <template v-slot:item-text>
          <p>购物车</p>
        </template>
      </tabbaritem>
      <tabbaritem path="profile">
        <template v-slot:item-icon>
          <img src="@/assets/img/tabbar/profile.svg" alt="" />
        </template>
        <template v-slot:item-icon-active>
          <img src="@/assets/img/tabbar/profile_active.svg" alt="" />
        </template>
        <template v-slot:item-text>
          <p>我的</p>
        </template>
      </tabbaritem>
    </tabbar>

</template>

<script>
import tabbar from "@/components/tabbar";
import tabbaritem from "@/components/tabbar-item";
export default {
  name: "maintabbar",
  components: {
    tabbar,
    tabbaritem,
  },
};
</script>

<style></style>
