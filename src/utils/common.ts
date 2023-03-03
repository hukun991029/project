/**
 * @description: 获取类型
 * @param {unknown} params
 * @return {string}
 */
export const getType = (params: unknown): string => {
    return Object.prototype.toString.call(params).slice(8, -1).toLowerCase()
}
// 校验
export const eq = (a: unknown, b: unknown): boolean => {
    if (getType(a) !== getType(b)) return false
    if (getType(a) === 'number') {
        // 判断+0或者-0
        if (a === b) return a !== 0 || 1 / a === 1 / b
        // 判断NaN
        if (a !== a) return b !== b
    } else if (['string', 'boolean'].includes(getType(a))) {
        return a === b
    } else if (getType(a) === 'object') {
        const keyList = Object.keys(a)
        const len = keyList.length
        if (Object.keys(b).length !== len) return false
        for (let i = 0; i < len; i++) {
            let key = keyList[i]
            if (!(b.hasOwnProperty(key) && eq(b[key]) === eq(a[key]))) {
                return false
            }
        }
    } else if (getType(a) === 'array') {
        const len = a.length
        if (b.length !== len) return false
        for (let i = 0; i < len; i++) {
            if (eq(a[i]) !== eq(b[i])) {
                return false
            }
        }
    }
    return true
}
/**
 * @description: 比较普通对象是否相等
 * @param {object} a
 * @param {object} b
 * @return {boolean}
 */
export const eqObject = (a: object, b: object): boolean => {
    const keyList = Object.keys(a)
    const len = keyList.length
    if (Object.keys(b).length !== len) return false
    for (let i = 0; i < len; i++) {
        let key = keyList[i]
        if (!(b.hasOwnProperty(key) && b[key] === a[key])) {
            return false
        }
    }
    return true
}
/**
 * @description: 比较普通数组是否相等
 * @param {any} a
 * @param {any} b
 * @return {*}
 */
export const eqArray = (a: any[], b: any[]): boolean => {
    const len = a.length
    if (b.length !== len) return false
    for (let i = 0; i < len; i++) {
        if (a[i] !== b[i]) {
            return false
        }
    }
    return true
}

export const getListMaxOrMin = (list: number[], type = false): number => {
    if (type) {
        return Math.min(...list)
    } else {
        return Math.max(...list)
    }
}

export const throttle = (() => {
    let last = 0
    return (callback, wait = 800) => {
        let now = +new Date()
        if (now - last > wait) {
            callback()
            last = now
        }
    }
})()

export const debounce = (() => {
    return (callback, time = 1000) => {
        let timer: number | null = null
        if (timer) {
            clearTimeout(timer)
        }
        timer = window.setTimeout(() => {
            callback && callback()
        }, time)
    }
})()

export const flatArray = (arr: any[][]) => {
    if (Array.hasOwnProperty('flat')) {
        return arr.flat(Infinity)
    }
    let res: any[] = []
    for (const item of arr) {
        if (getType(item) === 'array') {
            res = res.concat(flatArray(item))
        } else {
            res.push(item)
        }
    }
    return res
}

export const hideMobile = (mobile: string) => {
    return mobile.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
}
