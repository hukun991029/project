import request from '@/utils/axios'
export const getUserData = (data) => {
    return request({
        url: '/user/list',
        method: 'GET',
        data
    })
}
export const addUser = (data) => {
    return request({
        url: '/user/add',
        method: 'POST',
        data
    })
}
export const updateUser = (data) => {
    return request({
        url: '/user/update',
        method: 'POST',
        data
    })
}
export const delUser = (data) => {
    return request({
        url: '/user/del',
        method: 'GET',
        data
    })
}

export const getDeptList = () => {
    return request({
        url: '/dept/tree',
        method: 'GET'
    })
}
