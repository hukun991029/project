import request from '@/utils/axios'
export const addAndEditMenu = (data: Record<string, any>) => {
    return request({
        url: '/menu/addAndEdit',
        method: 'POST',
        data
    })
}

export const getList = () => {
    return request({
        url: '/menu/list',
        method: 'GET'
    })
}
export const getMenuTree = () => {
    return request({
        url: '/menu/tree',
        method: 'GET'
    })
}
