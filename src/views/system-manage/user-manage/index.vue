<script lang="ts" setup>
import { getUserData, addUser } from '@/api/system-manage/user-manage';
import { onMounted, ref, nextTick } from 'vue';
import Dialog from './components/dialog/index.vue';
import Search from './components/search/index.vue';
import dayjs from 'dayjs';
import type { FormOption } from './type';
const columns = [
    {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
        align: 'center'
    },
    {
        title: '用户ID',
        dataIndex: 'userId',
        key: 'userId',
        align: 'center'
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
        align: 'center'
    },
    {
        title: '电话号码',
        dataIndex: 'phone',
        key: 'phone',
        align: 'center'
    },
    {
        title: '用户地址',
        dataIndex: 'address',
        key: 'address',
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
    },
    {
        title: '操作',
        dataIndex: 'edit',
        key: 'edit',
        align: 'center'
    }
];
const queryParams = ref({
    userId: '',
    username: '',
    startTime: '',
    endTime: '',
    pageNum: 1,
    pageSize: 10
});

const form = ref<FormOption>({
    username: '',
    email: '',
    phone: '',
    password: '',
    address: []
});

const isEdit = ref<boolean>(false);
const loading = ref<boolean>(false);
const tableData = ref<any>([]);
const dialogRef = ref();
const getTableData = async () => {
    try {
        loading.value = true;
        tableData.value = await getUserData(queryParams.value);
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
};

const createUser = () => {
    Object.assign(form.value, {
        username: '',
        email: '',
        phone: '',
        password: '',
        address: []
    });
    isEdit.value = false;
    dialogRef.value.showDialog();
};

const refresh = (val) => {
    queryParams.value = val;
    getTableData();
};

const edit = (record) => {
    const { username, email, phone, address } = record;
    const { province, city, area } = address;
    form.value = {
        username,
        email,
        phone,
        address: [province, city, area]
    };
    isEdit.value = true;
    dialogRef.value.showDialog();
};

onMounted(() => {
    getTableData();
});
</script>
<template>
    <Search :queryParams="queryParams" @refresh="refresh"></Search>
    <a-card>
        <a-button type="primary" style="margin-bottom: 20px" @click="createUser">创建用户</a-button>
        <a-table :columns="columns" :data-source="tableData" :loading="loading" bordered>
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'address'">
                    <a-tag v-for="(value, key) in record.address" :key="key">{{ value }} </a-tag>
                    <!-- <span>
                        {{ record.address.province }}-{{ record.address.city }}-
                        {{ record.address.area }}</span
                    > -->
                </template>
                <template v-if="column.key === 'edit'">
                    <a @click="edit(record)">编辑</a>
                </template>
            </template>
        </a-table>
        <Dialog ref="dialogRef" :form="form" @refresh="getTableData" :isEdit="isEdit"></Dialog>
    </a-card>
</template>
<style lang="scss" scoped></style>
