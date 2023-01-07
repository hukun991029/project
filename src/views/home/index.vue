<script lang="ts" setup>
import MainHeader from '@/components/GlobalMain/MainHeader.vue';
import MainContent from '@/components/GlobalMain/MainContent.vue';
import MainSlide from '@/components/GlobalMain/MainSlide.vue';
import MainFooter from '@/components/GlobalMain/MainFooter.vue';
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
