<script lang="ts" setup>
import type { ColumnsOptions, PageOptions } from './type'
import { PropType } from 'vue'
const props = defineProps({
    // 表格列配置
    columns: {
        type: Array as PropType<ColumnsOptions[]>,
        dafaule: () => [],
        required: true
    },
    // 表格数据
    tableData: {
        type: Array,
        default: () => [],
        required: false
    },
    // 接口请求Api
    api: {
        type: Function,
        required: false
    },
    // 是否立即执行接口
    isImmediate: {
        type: Boolean,
        default: true,
        required: false
    },
    // 页码配置
    pageData: {
        type: Object as PropType<PageOptions>,
        default: {
            pageNum: 1,
            pageSize: 10
        },
        required: true
    },
    // 查询参数配置
    queryParams: {
        type: Object,
        default: () => {},
        required: false
    },
    pagination: {
        type: Object,
        default: () => {},
        required: false
    }
})
const emits = defineEmits(['pageChange'])
const loading = ref(false)
const data = ref(props.tableData)
const total = ref(0)
const paginationOption = computed(() => {
    const { pageData, pagination } = toRefs(props)
    return Object.assign(
        {
            current: pageData.value.pageNum,
            pageSize: pageData.value.pageSize,
            total: total.value,
            showTotal: (total) => `共 ${total} 条`,
            pageSizeOptions: ['10', '20', '30', '40'],
            hideOnSinglePage: true,
            howQuickJumper: true,
            showSizeChanger: true,
            showLessItems: true
        },
        pagination.value
    )
})

const getTableData = async () => {
    const { api, pageData, queryParams } = toRefs(props)
    const params = {
        ...pageData.value,
        ...queryParams.value
    }
    if (api) {
        try {
            loading.value = true
            const res = await api.value(params)
            data.value = res.rows
            total.value = res.total
        } catch (error) {
            console.log(error)
        } finally {
            loading.value = false
        }
    }
}
const handleChange = (pagination, filters, sorter, { currentDataSource }) => {
    emits('pageChange', pagination, filters, sorter, currentDataSource)
}
onMounted(() => {
    props.isImmediate && getTableData()
    console.log(paginationOption.value)
})
defineExpose({
    getTableData
})
</script>
<template>
    <div>
        <a-table
            v-bind="$attrs"
            :data-source="data"
            :columns="columns"
            :loading="loading"
            bordered
            :pagination="paginationOption"
            :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)"
            @change="handleChange"
        >
            <template #headerCell="{ column }">
                <slot name="header" :column="column"></slot>
            </template>
            <template #bodyCell="{ column, record }">
                <slot name="body" :column="column" :record="record"></slot>
            </template>
        </a-table>
    </div>
</template>
<style lang="scss" scoped></style>
