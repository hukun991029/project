/**
 * @description: 获取类型
 * @param {unknown} params
 * @return {string}
 */
export const getType = (params: unknown): string => {
    return Object.prototype.toString.call(params).slice(8, -1).toLowerCase()
}
// // 校验
// export const eq = (a: unknown, b: unknown): boolean => {
//     if (getType(a) !== getType(b)) return false
//     if (getType(a) === 'number') {
//         // 判断+0或者-0
//         if (a === b) return a !== 0 || 1 / a === 1 / b
//         // 判断NaN
//         if (a !== a) return b !== b
//     } else if (['string', 'boolean'].includes(getType(a))) {
//         return a === b
//     } else if (getType(a) === 'object') {
//         const keyList = Object.keys(a)
//         const len = keyList.length
//         if (Object.keys(b).length !== len) return false
//         for (let i = 0; i < len; i++) {
//             const key = keyList[i]
//             if (!(b.hasOwnProperty(key) && eq(b[key]) === eq(a[key]))) {
//                 return false
//             }
//         }
//     } else if (getType(a) === 'array') {
//         const len = a.length
//         if (b.length !== len) return false
//         for (let i = 0; i < len; i++) {
//             if (eq(a[i]) !== eq(b[i])) {
//                 return false
//             }
//         }
//     }
//     return true
// }
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
        const key = keyList[i]
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

export const isEmail = (str: string): boolean => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(str)
}
export const isPhone = (str: string): boolean => {
    return /^(?:\+?86)?1[3-9]\d{9}$/.test(str)
}
export const isUrl = (str: string) => {
    return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(str)
}
export const validPwd = (str: string): boolean => {
    return /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(str)
}

export const isPromise = (obj: Record<string, any>): boolean => {
    return obj !== null && getType(obj) !== 'function' && getType(obj.then) === 'function'
}

export const isIdCard = (str: string) => {
    return /^(\\d{6})(19|20)(\\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\\d|3[01])(\\d{3})(\\d|[Xx])$/.test(
        str
    )
}

export const isEmptyObj = (obj: Record<string, any>): boolean => {
    return getType(obj) === 'object' && Object.keys(obj).length > 0
}

export const uniqueArr = (arr: Array<string | number>): Array<string | number> => {
    return [...new Set([...arr])]
}

// 交集
export const getIntersection = (arr: Array<any>, list: Array<any>) => {
    return arr.filter((item) => {
        return list.includes(item)
    })
}

// 并集
export const getUnion = (arr: Array<any>, list: Array<any>): Array<any> => {
    return [...new Set([...arr, ...list])]
}

export const getUrlParams = (prop: string): string => {
    const [, path] = window.location.href.split('?')
    const res = {}
    const list = path.split('&')
    list.forEach((item) => {
        const [key, val] = item.split(':')
        res[key] = val
    })
    return res[prop]
}
// 获取后缀名称
export const getExtension = (str: string) => {
    return str.split('.')[1]
}
// 下载文件
export const download = (res: Blob, name: string) => {
    const url = URL.createObjectURL(res)
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.download = name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
}
// 金额每隔三位加逗号
export const moneyFormat = (money: number): string => {
    return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// 防抖
export const debounce = (() => {
    const timer = null
    return (callback: () => TimerHandler, wait = 1000) => {
        timer && clearInterval(timer)
        setTimeout(callback(), wait)
    }
})()
// 节流
export const throttle = (() => {
    let last = 0
    return (callback: () => TimerHandler, wait = 800) => {
        const now = +new Date()
        if (now - last > wait) {
            callback()
            last = now
        }
    }
})()

export const turnCase = (str: string, type: number): string => {
    switch (type) {
        case 1:
            return str.toLowerCase()
        case 2:
            return str.toUpperCase()
        case 3:
            return str[0].toUpperCase + str.slice(1).toLowerCase()
        default:
            return str
    }
}

export const getMax = (arr: Array<number>): number => {
    return Math.max(...arr)
}

export const getMin = (arr: Array<number>): number => {
    return Math.min(...arr)
}

export const numberToChinese = (number: number) => {
    let chineseNumber = ''
    const chineseDigits = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
    const chineseUnits = ['', '十', '百', '千', '万', '亿']
    const numberString = String(number)
    for (let i = 0; i < numberString.length; i++) {
        const digit = parseInt(numberString[i])
        const unit = numberString.length - i - 1
        if (digit === 0) {
            chineseNumber += chineseDigits[digit]
        } else {
            chineseNumber += chineseDigits[digit] + chineseUnits[unit]
        }
    }
    return chineseNumber
}

export const chineseToNumber = (chinese: string) => {
    const chineseDigits = {
        零: 0,
        一: 1,
        二: 2,
        三: 3,
        四: 4,
        五: 5,
        六: 6,
        七: 7,
        八: 8,
        九: 9
    }
    const chineseUnits = {
        十: 10,
        百: 100,
        千: 1000,
        万: 10000,
        亿: 100000000
    }
    let number = 0
    let temp = 0
    for (let i = 0; i < chinese.length; i++) {
        const char = chinese[i]
        const digit = chineseDigits[char]
        const unit = chineseUnits[char]
        if (digit != null) {
            temp = digit
        } else if (unit != null) {
            number += temp * unit
            temp = 0
        }
    }
    number += temp
    return number
}
