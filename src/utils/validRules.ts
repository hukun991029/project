import type { Rule } from 'ant-design-vue/es/form'
export const validEmail = async (_rule: Rule, value: string) => {
    if (!value) {
        return Promise.reject('请输入邮箱')
    } else {
        const isValid = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)
        if (!isValid) {
            return Promise.reject('邮箱格式不正确,请重新输入')
        } else {
            return Promise.resolve()
        }
    }
}
export const validPhone = async (_rule: Rule, value: string) => {
    if (!value) {
        return Promise.reject('请输入电话号码')
    } else {
        const isValid =
            /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(value)
        if (!isValid) {
            return Promise.reject('电话号码格式不正确,请重新输入')
        } else {
            return Promise.resolve()
        }
    }
}
export const validPassword = async (_rule: Rule, value: string) => {
    if (!value) {
        return Promise.reject('请输入密码')
    } else {
        if (value.length < 8 || value.length > 16) {
            return Promise.reject('密码长度为8-16位')
        } else {
            const isValid = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(value)
            if (!isValid) {
                return Promise.reject('密码格式不正确,密码需要包含数字和英文,请重新输入')
            } else {
                return Promise.resolve()
            }
        }
    }
}
