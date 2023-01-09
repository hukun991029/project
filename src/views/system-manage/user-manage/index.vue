<script lang="ts" setup>
import { getUserData } from '@/api/system-manage/user-manage';
import { onMounted, ref, watch } from 'vue';
import Dialog from './components/dialog/index.vue';
import Search from './components/search/index.vue';
const columns = [
    {
        title: '用户名',
        dataIndex: 'username',
        key: 'username'
    },
    {
        title: '用户ID',
        dataIndex: 'userId',
        key: 'userId'
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email'
    },
    {
        title: '电话号码',
        dataIndex: 'phone',
        key: 'phone'
    },
    {
        title: '用户地址',
        dataIndex: 'address',
        key: 'address'
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime'
    },
    {
        title: '更新时间',
        dataIndex: 'updateTime',
        key: 'updateTime'
    }
];
const queryParams = ref({
    userId: '',
    username: '',
    startTime: '',
    endTime: ''
});
const loading = ref<boolean>(false);

const tableData = ref([]);
const dialogRef = ref();
const getTableData = async () => {
    try {
        loading.value = true;
        const res: any = await getUserData(queryParams.value);
        tableData.value = res;
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
};

const createUser = () => {
    dialogRef.value.showDialog();
};

const refresh = (val) => {
    queryParams.value = val;
    getTableData();
};
onMounted(() => {
    getTableData();
});
</script>
<template>
    <Search :queryParams="queryParams" @refresh="refresh"></Search>
    <a-card>
        <a-button type="primary" style="margin-bottom: 20px" @click="createUser">创建用户</a-button>
        <a-table :columns="columns" :data-source="tableData" :loading="loading"></a-table>
        <Dialog ref="dialogRef"></Dialog>>
    </a-card>
</template>
<style lang="scss" scoped></style>
