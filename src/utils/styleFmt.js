/**
 * @description 自动给值加上单位 px rem vw
 * @param rawValue
 * @param unit 目标单位 如果不传  默认px
 * @param baseSize 如果是rem的话需要用到 默认37.5
 * @returns {*|string}
 */
export function processValue(rawValue, unit = 'px', baseSize = 37.5) {
    if (isNumber(rawValue) || ( isString(rawValue) && /^\d+$/.test(rawValue.trim()))) {
        switch (unit) {
            case 'px':
                return `${rawValue}px`;
            case 'rem':
                return `${(rawValue / baseSize).toFixed(5)}rem`; // 保留小数点后5位以确保精度
            case 'vw':
                return `${(rawValue * 100 / 375).toFixed(2)}vw`; // 计算vw值
            default:
                return rawValue;
        }
    }
    return rawValue;
}

/**
 * @desc 处理css数据
 * @param cssData
 * @param cssAttr
 * @param camelCaseAttrs
 * @param unit
 * @param baseSize
 * @returns {{}}
 */
function handleCssData(cssData, cssAttr, camelCaseAttrs, unit, baseSize) {
    const unifiedAttrsSet = new Set([...cssAttr, ...camelCaseAttrs]);
    return Object.entries(cssData).reduce((acc, [key, value]) => {
        if (unifiedAttrsSet.has(key)) {
            acc[key] = Array.isArray(value) ? value.map(v => processValue(v, unit, baseSize)) : processValue(value, unit, baseSize);
        } else {
            acc[key] = value
        }
        // 如果是背景图片 值为base64数据或者链接 则拼接url
        if (key==='backgroundImage'){
            acc[key] = /^(http|data:image)/.test(value) ? `url(${value})`:value
        }
        return acc;
    }, {});


}

/**
 * @desc css数据自动补全单位
 * @param cssData 需要处理的数据
 * @param unit 需要转换的单位 px rem vw
 * @param baseSize 如果是rem,需要传入baseSize 跟页面html font-size保持一致
 * @param cssAttr 需要转换的属性
 * @returns {*|{}|string}
 */
export default function (
    cssData = {},
    {
        unit = 'px',
        baseSize = 37.5,
        cssAttr = [
            'width',
            'height',
            'top',
            'left',
            'right',
            'bottom',
            'margin',
            'padding',
            'font-size',
            'border-width',
            'border-radius',
            'margin-top',
            'margin-bottom',
            'margin-left',
            'margin-right',
            'padding-top',
            'padding-bottom',
            'padding-left',
            'padding-right',
            'border-top-width',
            'border-bottom-width',
            'border-left-width',
            'border-right-width',
            'border-top-left-radius',
            'border-top-right-radius',
            'border-bottom-left-radius',
            'border-bottom-right-radius',
            'background-size',
            'background-position',
            'background-origin',
        ]
    }
) {

    const camelCaseAttrs = cssAttr.map(attr => attr.replace(/-([a-z])/g, (_, char) => char.toUpperCase()));

    return handleCssData(convertCssStringToObject(cssData), cssAttr, camelCaseAttrs, unit, baseSize);

};

/**
 * @desc 将css字符串转换为对象
 * @param cssString
 * @returns {{}}
 */
function convertCssStringToObject(cssString) {
     if (isObject(cssString)) return cssString;
     if (!isString(cssString)) return {};
    const lines = cssString.split('\n');
    const cssObject = {};

    for (let line of lines) {
        line = line.trim();
        if (line === '') {
            continue;
        }
        if (line.startsWith('/*') && line.endsWith('*/')) {
            continue;
        }

        const parts = line.split(':');
        let property = parts[0].trim();
        const value = parts[1].trim();

        // 将属性名转换为驼峰命名
        property = property.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());

        cssObject[property] = value;
    }

    return cssObject;
}
