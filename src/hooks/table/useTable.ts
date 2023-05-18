import { onMounted, ref, toRefs } from 'vue'
import { TableOptions } from './type'
export const useTable = (options: TableOptions) => {
    const tableData = ref([])
    const loading = ref(false)
    const { pageData, requestApi, queryParams, init } = toRefs(options)
    pageData.value = pageData?.value || {
        pageNum: 1,
        pageSize: 10,
        total: 0
    }
    const getTableData = async () => {
        try {
            loading.value = true
            const params = {
                pageNum: pageData.value.pageNum,
                pageSize: pageData.value.pageSize,
                ...queryParams
            }
            const res = await requestApi(params)
            tableData.value = res.data
            pageData.value?.total = res.data.total
        } catch (error) {
            console.log(error)
        } finally {
            loading.value = false
        }
    }
    onMounted(() => {
        init.value && getTableData()
    })
    return {
        tableData: tableData.value,
        pageData: pageData.value,
        loading: loading.value,
        getTableData
    }
}
