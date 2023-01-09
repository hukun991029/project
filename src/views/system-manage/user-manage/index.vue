<script lang="ts" setup>
import { getUserData } from '@/api/system-manage/user-manage';
import { log } from 'console';
import { onMounted, ref, watch } from 'vue';
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
const timeValue = ref([]);
const tableData = ref([]);
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

const timeChange = (val) => {
    if (val) {
        queryParams.value.startTime = val[0];
        queryParams.value.endTime = val[1];
    } else {
        queryParams.value.startTime = queryParams.value.endTime = '';
    }
};
const onFinish = () => {
    getTableData();
};
const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};
onMounted(() => {
    getTableData();
});
</script>
<template>
    <a-card style="margin-bottom: 20px">
        <a-form
            layout="inline"
            :model="queryParams"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
        >
            <a-form-item label="用户名" name="username">
                <a-input v-model:value="queryParams.username" placeholder="请输入用户名" />
            </a-form-item>
            <a-form-item label="用户Id" name="userId">
                <a-input v-model:value="queryParams.userId" placeholder="请输入用户Id" />
            </a-form-item>
            <a-form-item label="时间筛选" name="timeValue">
                <a-range-picker
                    v-model:value="timeValue"
                    format="YYYY-MM-DD"
                    valueFormat="YYYY-MM-DD"
                    @change="timeChange"
                />
            </a-form-item>
            <a-form-item>
                <a-button type="primary" html-type="submit">查询</a-button>
                <a-button style="margin-left: 10px">重置</a-button>
            </a-form-item>
        </a-form>
    </a-card>
    <a-card>
        <a-button type="primary" style="margin-bottom: 20px">创建用户</a-button>
        <a-table :columns="columns" :data-source="tableData" :loading="loading"></a-table>
    </a-card>
</template>
<style lang="scss" scoped></style>
