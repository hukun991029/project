import request from '@/utils/axios'

export const getRoleList = () => {
    return request({
        url: '/role/list',
        method: 'GET'
    })
}

export const roleOperate = (data) => {
    return request({
        url: '/role/operate',
        method: 'POST',
        data
    })
}
