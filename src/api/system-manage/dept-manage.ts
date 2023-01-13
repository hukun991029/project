import request from '@/utils/axios'

export const getAllUser = () => {
    return request({
        url: '/dept/getAllUser',
        method: 'GET'
    })
}

export const getDeptData = (data) => {
    return request({
        url: '/dept/list',
        method: 'GET',
        data
    })
}
export const addDept = (data) => {
    return request({
        url: '/dept/add',
        method: 'POST',
        data
    })
}
export const updateDept = (data) => {
    return request({
        url: '/dept/update',
        method: 'POST',
        data
    })
}
export const delDept = (data) => {
    return request({
        url: '/dept/del',
        method: 'GET',
        data
    })
}
export const getTreeList = () => {
    return request({
        url: '/dept/tree',
        method: 'GET'
    })
}
