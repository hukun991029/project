<script lang="ts" setup>
const props = withDefaults(defineProps<{ isCollapse: boolean }>(), { isCollapse: false })
const emit = defineEmits(['update:isCollapse'])
const toggleCollapsed = (): void => {
    emit('update:isCollapse', !props.isCollapse)
}
</script>
<template>
    <div
        class="collapse-wrap"
        :style="{ width: isCollapse ? 80 + 'px' : 200 + 'px' }"
        @click="toggleCollapsed"
    >
        <i v-if="isCollapse" class="iconfont icon-zhankai"></i>
        <i v-else class="iconfont icon-shousuo"></i>
    </div>
</template>
<style lang="scss" scoped>
.collapse-wrap {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
    bottom: 0;
    cursor: pointer;
    background-color: #fff;
}
</style>
