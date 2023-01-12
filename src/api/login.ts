/*
 * @Author: hukun 1228836483@qq.com
 * @Date: 2022-07-31 01:04:38
 * @LastEditors: Ikun
 * @LastEditTime: 2023-01-08 02:05:08
 * @FilePath: /code/project/src/api/login.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/axios'
export const login = (data) => {
    return request({
        url: '/login',
        method: 'POST',
        data
    })
}
