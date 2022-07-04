import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
interface errData {
    code: string;
}
class Request {
    instance: AxiosInstance;
    constructor(options: AxiosRequestConfig) {
        this.instance = axios.create(options);
        this.instance.interceptors.request.use(
            (res: AxiosRequestConfig) => {
                const token: string = localStorage.getItem('Authorization') || '';
                if (token) {
                    this.instance.defaults.headers.common['Authorization'] = token;
                }
                console.log('全局请求拦截器');
                return res;
            },
            (err: errData) => err
        );
        this.instance.interceptors.response.use(
            // 因为我们接口的数据都在res.data下，所以我们直接返回res.data
            (res: AxiosResponse) => {
                console.log('全局响应拦截器');
                return res.data;
            },
            (err: errData) => {
                switch (err.code) {
                    case '400':
                }
            }
        );
    }
    request<T>(config: AxiosRequestConfig<T>): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.instance
                .request<any, T>(config)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}
export default Request;
