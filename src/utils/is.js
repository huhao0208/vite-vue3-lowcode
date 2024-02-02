const toString = Object.prototype.toString;

/**
 * @description 使用 Object.prototype.toString 方法判断给定值的数据类型是否与指定类型一致
 * @param {any} val - 需要判断类型的值
 * @param {string} type - 目标数据类型的字符串表示，如 'Object', 'Array', 'Date' 等
 * @returns {boolean} - 如果给定值的数据类型与指定类型一致则返回 true，否则返回 false
 */
export function is(val, type) {
    return toString.call(val) === `[object ${type}]`;
}

/**
 * @description 判断给定值是否已定义（非 undefined）
 * @param {any} val - 需要判断的值
 * @returns {boolean} - 如果值已定义则返回 true，否则返回 false
 */
export function isDef(val) {
    return typeof val !== 'undefined';
}

/**
 * @description 判断给定值是否未定义（即 undefined）
 * @param {any} val - 需要判断的值
 * @returns {boolean} - 如果值未定义则返回 true，否则返回 false
 */
export function isUnDef(val){
    return !isDef(val);
}

/**
 * @description 判断给定值是否为对象（包括普通对象、数组、函数等，但不包括 null）
 * @param {any} val - 需要判断的值
 * @returns {boolean} - 如果值是对象则返回 true，否则返回 false
 */
export function isObject(val){
    return val !== null && is(val, 'Object');
}

/**
 * @description 判断给定值（可能是数组、字符串、Map、Set 或普通对象）是否为空
 * @param {any} val - 需要判断的值
 * @returns {boolean} - 如果值为空（长度或大小为0）则返回 true，否则返回 false
 */
export function isEmpty(val){
    if (isArray(val) || isString(val)) {
        return val.length === 0;
    }

    if (val instanceof Map || val instanceof Set) {
        return val.size === 0;
    }

    if (isObject(val)) {
        return Object.keys(val).length === 0;
    }

    return false;
}

/**
 * @description 判断给定值是否为 Date 类型实例
 * @param {any} val - 需要判断的值
 * @returns {boolean} - 如果值是 Date 类型实例则返回 true，否则返回 false
 */
export function isDate(val) {
    return is(val, 'Date');
}

/**
 * @description 判断给定值是否为 null
 * @param {any} val - 需要判断的值
 * @returns {boolean} - 如果值是 null 则返回 true，否则返回 false
 */
export function isNull(val) {
    return val === null;
}

/**
 * @description 判断给定值是否同时为未定义和 null
 * @param {any} val - 需要判断的值
 * @returns {boolean} - 如果值既未定义又为 null，则返回 true，否则返回 false
 */
export function isNullAndUnDef(val){
    return isUnDef(val) && isNull(val);
}

/**
 * @description 判断给定值是否为未定义或 null
 * @param {any} val - 需要判断的值
 * @returns {boolean} - 如果值为未定义或 null，则返回 true，否则返回 false
 */
export function isNullOrUnDef(val) {
    return isUnDef(val) || isNull(val);
}

/**
 * @description 判断给定值是否为 Number 类型
 * @param {any} val - 需要判断的值
 * @returns {boolean} - 如果值是 Number 类型则返回 true，否则返回 false
 */
export function isNumber(val){
    return is(val, 'Number');
}

// 完整注释

/**
 * @description 判断给定值是否为 Promise 对象，并且具有 then 和 catch 方法（符合 Promise 规范）
 * @param {any} val - 需要判断的值
 * @returns {boolean} - 如果值是 Promise 类型并且具有规范的 then 和 catch 方法，则返回 true，否则返回 false
 */
export function isPromise(val){
    return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

/**
 * @description 判断给定值是否为 String 类型
 * @param {any} val - 需要判断的值
 * @returns {boolean} - 如果值是 String 类型则返回 true，否则返回 false
 */
export function isString(val) {
    return is(val, 'String');
}

/**
 * @description 判断给定值是否为 Function 类型
 * @param {any} val - 需要判断的值
 * @returns {boolean} - 如果值是 Function 类型则返回 true，否则返回 false
 */
export function isFunction(val){
    return typeof val === 'function';
}

/**
 * @description 判断给定值是否为 Boolean 类型
 * @param {any} val - 需要判断的值
 * @returns {boolean} - 如果值是 Boolean 类型则返回 true，否则返回 false
 */
export function isBoolean(val){
    return is(val, 'Boolean');
}

/**
 * @description 判断给定值是否为 RegExp 类型
 * @param {any} val - 需要判断的值
 * @returns {boolean} - 如果值是 RegExp 类型则返回 true，否则返回 false
 */
export function isRegExp(val) {
    return is(val, 'RegExp');
}

/**
 * @description 判断给定值是否为数组
 * @param {any} val - 需要判断的值
 * @returns {boolean} - 如果值是 Array 类型则返回 true，否则返回 false
 */
export function isArray(val) {
    return val && Array.isArray(val);
}

/**
 * @description 判断给定值是否为全局 window 对象
 * @param {any} val - 需要判断的值
 * @returns {boolean} - 如果当前环境存在 window 对象，并且给定值为 window，则返回 true，否则返回 false
 */
export function isWindow(val){
    return typeof window !== 'undefined' && is(val, 'Window');
}

/**
 * @description 判断给定值是否为 DOM 元素节点
 * @param {any} val - 需要判断的值
 * @returns {boolean} - 如果值是对象类型并且具有 tagName 属性，则返回 true，否则返回 false
 */
export function isElement(val) {
    return isObject(val) && !!val.tagName;
}

/**
 * @description 判断给定值是否为 Map 类型
 * @param {any} val - 需要判断的值
 * @returns {boolean} - 如果值是 Map 类型则返回 true，否则返回 false
 */
export function isMap(val){
    return is(val, 'Map');
}

/**
 * @description 判断当前环境是否为服务器端渲染（SSR）环境
 * @type {boolean}
 */
export const isServer = typeof window === 'undefined';

/**
 * @description 判断当前环境是否为浏览器客户端环境
 * @type {boolean}
 */
export const isClient = !isServer;

/**
 * @description 判断给定路径是否为有效的 URL 地址
 * @param {string} path - 需要判断的 URL 路径
 * @returns {boolean} - 如果给定路径符合 URL 格式规范，则返回 true，否则返回 false
 */
export function isUrl(path) {
    const reg =
        /(((^https?:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
    return reg.test(path);
}
