import {v4} from "uuid";

export const uuid = () => {
    return v4()
}
/**
 * @desc 节流函数
 * @param {Function} func 要执行的函数
 * @param {Number} wait 延迟时间
 */
export const throttle = (func, wait=300) => {
    let timeout = null
    let lastTime = 0
    return function (...args) {
        const nowTime = +new Date()
        if (nowTime - lastTime > wait) {
            func.apply(this, args)
            lastTime = nowTime
        } else {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                func.apply(this, args)
                lastTime = nowTime
            }, wait)
        }
    }
}
/**
 * @desc 防抖函数
 * @param {Function} func 要执行的函数
 * @param wait 延迟时间
 */
export const debounce = (func, wait=300) => {
    let timeout = null
    return function (...args) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            func.apply(this, args)
        }, wait)
    }
}
