/*
 * @Author: your name
 * @Date: 2022-04-12 14:09:53
 * @LastEditTime: 2023-01-09 18:30:13
 * @LastEditors: Ikun
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \CODE\project\src\store\store.ts
 */
import { defineStore } from 'pinia'
const userStore = defineStore('userStore', {
    state: () => ({
        userInfo: {}
    }),
    actions: {
        setUserInfo(val) {
            this.userInfo = val
            localStorage.setItem('userInfo', JSON.stringify(val))
        },
        clearUserInfo() {
            this.userInfo = {}
        }
    }
})

export default userStore
