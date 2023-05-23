export interface PageOptions {
    pageNum: number
    pageSize: number
    total: number
}
export interface TableOptions {
    pageData?: PageOptions //分页
    queryParams?: Record<string, any> //查询条件
    requestApi: () => Promise<void> //接口
    init: boolean
}
