/*
 * @Author: your name
 * @Date: 2022-04-12 14:09:53
 * @LastEditTime: 2023-01-08 01:08:02
 * @LastEditors: Ikun
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /code/project/src/stores/store.js
 */
import { defineStore, acceptHMRUpdate } from 'pinia';
const store = defineStore('store', {
    state: () => ({
        name: '张三',
        age: 12
    })
});

export default store;
