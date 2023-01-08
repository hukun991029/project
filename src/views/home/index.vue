<script lang="ts" setup>
import MainHeader from '@/components/GlobalMain/MainHeader.vue';
import MainContent from '@/components/GlobalMain/MainContent.vue';
import MainSlide from '@/components/GlobalMain/MainSlide.vue';
import MainFooter from '@/components/GlobalMain/MainFooter.vue';
</script>
<template>
    <div class="home">
        <a-layout>
            <MainHeader></MainHeader>
            <a-layout>
                <MainSlide></MainSlide>
                <MainContent><router-view></router-view></MainContent>
                <!-- <MainFooter></MainFooter> -->
            </a-layout>
        </a-layout>
    </div>

    <!--  -->
</template>
<style lang="scss" scoped>
.home {
    background-color: red !important;
}
</style>
