/*
 * @Author: your name
 * @Date: 2022-04-12 14:09:53
 * @LastEditTime: 2022-04-12 14:32:04
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bug-2.7d:\vite-project\src\stores\store.js
 */
import { defineStore, acceptHMRUpdate } from 'pinia';
export const store = defineStore('store', {
    state: () => ({
        name: '张三',
        age: 12
    })
});
