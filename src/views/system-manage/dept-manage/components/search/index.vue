<script lang="ts" setup>
import { ref } from 'vue';
const deptName = ref('');
</script>
<template>
    <a-card style="margin-bottom: 10px">
        <a-row type="flex" align="middle">
            <a-col> <span>部门名称：</span></a-col>
            <a-col :span="6">
                <a-input v-model:value="deptName" placeholder="请输入部门名称"></a-input>
            </a-col>
            <a-button type="primary" style="margin: 0 10px">查询</a-button>
            <a-button>重置</a-button>
        </a-row>
    </a-card>
</template>
<style lang="scss" scoped></style>
