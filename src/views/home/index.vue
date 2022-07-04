<script lang="ts" setup>
import MainHeader from '../main/MainHeader.vue';
import MainContent from '../main/MainContent.vue';
import MainSlide from '../main/MainSlide.vue';
import MainFooter from '../main/MainFooter.vue';
</script>
<template>
    <a-layout>
        <MainHeader></MainHeader>
    </a-layout>
    <a-layout>
        <MainSlide></MainSlide>
        <MainContent></MainContent>
    </a-layout>
    <MainFooter></MainFooter>
</template>
<style lang="scss" scoped></style>
