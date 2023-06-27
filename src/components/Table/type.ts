export interface ColumnsOptions {
    title: string
    dataIndex: string
    key: string
    customRender?: (params: any) => any
    fixed?: 'left' | 'right'
    align?: 'left' | 'right' | 'center'
    minWidth?: string | number
    width?: string | number
    maxWidth?: string | number
    sorter?: boolean
    filters?: Array<Record<string, string>>
    ellipsis?: boolean
}

export interface PageOptions {
    pageNum: number
    pageSize: number
}
export interface ApiOption {
    api: (params: Record<string, any>) => any
}
