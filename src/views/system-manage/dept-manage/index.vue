<script lang="ts" setup>
import Search from './components/search/index.vue';
import dayjs from 'dayjs';
const columns = [
    {
        title: '部门名称',
        dataIndex: 'deptName',
        key: 'deptName',
        align: 'center'
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        align: 'center',
        customRender: ({ text }) => dayjs(text).format('YYYY-MM-DD HH:mm:ss')
    },
    {
        title: '更新时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        align: 'center',
        customRender: ({ text }) => dayjs(text).format('YYYY-MM-DD HH:mm:ss')
    }
];
</script>
<template>
    <Search></Search>
    <el-card> <a-table :columns="columns"> </a-table></el-card>
</template>
<style lang="scss" scoped></style>
