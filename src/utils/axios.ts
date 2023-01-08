/*
 * @Author: hukun 1228836483@qq.com
 * @Date: 2022-07-31 01:24:09
 * @LastEditors: Ikun
 * @LastEditTime: 2023-01-08 01:53:31
 * @FilePath: /code/project/src/utils/axios.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios';
import config from '../config/index';
import { message } from 'ant-design-vue';
const CODE = {
    PARAMS_ERROR: '请求参数错误', // 参数错误
    USER_VALID_ERROR: '账号或密码错误', // 用户账号或密码错误
    USER_LOGIN_ERROR: 'token校验失败', // 用户未登录
    REQUEST_ERROR: '网络错误', // 请求错误
    OTHER_ERROR: '其他错误' // 其他错误
};

const instance = axios.create({
    baseURL: config.baseUrl,
    timeout: 5000
});
instance.interceptors.request.use((req) => {
    if (req.headers && !req.headers.Authorization) {
        let userInfo = localStorage.getItem('userInfo');
        req.headers.Authorization = userInfo ? 'Bearer ' + JSON.parse(userInfo).token : '';
    }
    return req;
});
instance.interceptors.response.use((res) => {
    const { data, msg, code } = res.data;
    switch (code) {
        case 200:
            return data;
        case 10001:
            message.error(msg || CODE.PARAMS_ERROR);
            return Promise.reject(msg || CODE.PARAMS_ERROR);
        case 30001:
            message.error(msg || CODE.USER_LOGIN_ERROR);
            return Promise.reject(msg || CODE.USER_LOGIN_ERROR);
    }
});

function request(options) {
    options.method = options.method || 'get';
    if (options.method.toLowerCase() === 'get') {
        options.params = options.data;
    }
    let mockFlag = options.mock || false;

    if (config.ENV === 'production') {
        instance.defaults.baseURL = config.baseURL;
    } else {
        instance.defaults.baseURL = config.mock || mockFlag ? config.mockUrl : config.baseUrl;
    }
    return instance(options);
}
export default request;
