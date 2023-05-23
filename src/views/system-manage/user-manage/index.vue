<script lang="ts" setup>
import { getUserData, delUser } from '@/api/system-manage/user-manage'
import { computed, onMounted, ref } from 'vue'
import Dialog from './components/dialog/index.vue'
import Search from './components/search/index.vue'
import dayjs from 'dayjs'
import { message } from 'ant-design-vue'
import type { FormOption } from './type'

const columns = [
    {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
        align: 'center',
        fixed: 'left'
    },
    {
        title: '用户ID',
        dataIndex: 'userId',
        key: 'userId',
        align: 'center',
        fixed: 'left'
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
        align: 'center',
        width: 250
    },
    {
        title: '用户地址',
        dataIndex: 'address',
        key: 'address',
        align: 'center',
        width: 250
    },
    {
        title: '部门名称',
        dataIndex: 'deptName',
        key: 'deptName',
        align: 'center',
        width: 250
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        align: 'center',
        customRender: ({ text }) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
        width: 250
    },
    {
        title: '更新时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        align: 'center',
        customRender: ({ text }) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
        width: 250
    },
    {
        title: '操作',
        dataIndex: 'edit',
        key: 'edit',
        align: 'center',
        fixed: 'right',
        width: 150
    }
]
const queryParams = ref({
    userId: '',
    username: '',
    startTime: '',
    endTime: '',
    pageNum: 1,
    pageSize: 10
})

const form = ref<FormOption>({
    username: '',
    email: '',
    phone: '',
    password: '',
    address: [],
    deptList: []
})

const isEdit = ref<boolean>(false)
const loading = ref<boolean>(false)
const tableData = ref<any>([])
const dialogRef = ref()
const total = ref<number>()
const tagColor = {
    province: 'orange',
    city: 'blue',
    area: 'cyan'
}

const pagination = computed(() => ({
    total,
    current: queryParams.value.pageNum,
    pageSize: queryParams.value.pageSize,
    howQuickJumper: true,
    showSizeChanger: true,
    showLessItems: true,
    showTotal: (total) => `共 ${total} 条`
}))

const getTableData = async () => {
    try {
        loading.value = true
        const res: any = await getUserData(queryParams.value)
        tableData.value = res.rows
        total.value = res.total
        loading.value = false
    } catch (error) {
        // console.log(loading.value)
        console.log(error)
    } finally {
        loading.value = false
    }
}

const createUser = () => {
    Object.assign(form.value, {
        username: '',
        email: '',
        phone: '',
        password: '',
        address: [],
        deptList: []
    })
    isEdit.value = false
    dialogRef.value.showDialog()
}

const refresh = (val) => {
    queryParams.value = val
    getTableData()
}

const handelEdit = (record) => {
    const { username, email, phone, address, deptList } = record
    const { province, city, area } = address
    form.value = {
        username,
        email,
        phone,
        address: [province, city, area],
        deptList
    }
    isEdit.value = true
    dialogRef.value.showDialog()
}
const handelDel = async (record) => {
    const params = {
        userId: record.userId
    }
    await delUser(params)
    message.success('删除成功')
    getTableData()
}
const pageChange = (pagination) => {
    const { current, pageSize } = pagination
    queryParams.value.pageNum = current
    queryParams.value.pageSize = pageSize
    getTableData()
}
onMounted(() => {
    getTableData()
})
</script>
<template>
    <Search :queryParams="queryParams" @refresh="refresh"></Search>
    <a-card>
        <a-button type="primary" style="margin-bottom: 20px" @click="createUser">创建用户</a-button>
        <a-table
            class="ant-table-striped"
            :columns="columns"
            :data-source="tableData"
            :loading="loading"
            :pagination="pagination"
            bordered
            rowKey="_id"
            :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)"
            :scroll="{ x: 1800, y: 1000, scrollToFirstRowOnChange: true }"
            @change="pageChange"
        >
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'address'">
                    <template v-for="(value, key, index) in record.address" :key="key">
                        <a-tag v-if="index < 3 && key !== '_id'" :color="tagColor[key]">
                            {{ value }}
                        </a-tag>
                    </template>
                </template>
                <template v-if="column.key === 'edit'">
                    <a @click="handelEdit(record)">编辑</a>
                    <a-divider type="vertical" />
                    <a @click="handelDel(record)">删除</a>
                </template>
            </template>
        </a-table>
        <Dialog
            ref="dialogRef"
            :form="form"
            @refresh="getTableData"
            :isEdit="isEdit"
            :dialogVisible="false"
        >
        </Dialog>
    </a-card>
</template>
<style lang="scss" scoped>
.ant-table-striped ::v-deep(.table-striped) td {
    background-color: #fafafa;
}
.img-wrap {
    width: 200px;
    height: 200px;
}
</style>
