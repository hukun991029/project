<script lang="ts" setup></script>
<template>
    <a-card>
        <a-form :wrapper-col="{ span: 16 }" layout="inline">
            <a-form-item label="角色查询">
                <a-input placeholder="请输入角色名称"></a-input>
            </a-form-item>
            <a-button type="primary" style="margin-right: 10px">查询</a-button>
            <a-button>重置</a-button>
        </a-form>
    </a-card>
</template>
<style lang="scss" scoped></style>
