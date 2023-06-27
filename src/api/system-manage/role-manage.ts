import request from '@/utils/axios'

export const getRoleList = (params) => {
    return request({
        url: '/role/list',
        method: 'GET',
        params
    })
}

export const roleOperate = (data) => {
    return request({
        url: '/add/role',
        method: 'POST',
        data
    })
}
