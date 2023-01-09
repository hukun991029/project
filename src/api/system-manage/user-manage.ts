import request from '@/utils/axios';
export const getUserData = (data) => {
    return request({
        url: '/user/list',
        method: 'GET',
        data
    });
};
