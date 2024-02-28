export function processValue(rawValue, unit = 'px', baseSize = 37.5) {


    if (typeof rawValue === 'number' || (typeof rawValue === 'string' && /^\d+$/.test(rawValue))) {
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

function handleCssData(cssData, cssAttr, camelCaseAttrs, unit, baseSize) {
    const unifiedAttrsSet = new Set([...cssAttr, ...camelCaseAttrs]);

    if (typeof cssData === 'string') {
        return cssData.split(';').map(item => {
            const [key, value] = item.split(':');
            return unifiedAttrsSet.has(key.trim()) ? `${key.trim()}:${processValue(value.trim(), unit, baseSize)}` : item;
        }).join(';');
    } else if (typeof cssData === 'object') {
        return Object.entries(cssData).reduce((acc, [key, value]) => {
            if (unifiedAttrsSet.has(key)) {
                acc[key] = Array.isArray(value) ? value.map(v => processValue(v, unit, baseSize)) : processValue(value, unit, baseSize);
            } else {
                acc[key] = value
            }
            if (key==='backgroundImage'){
                acc[key] = /^http/.test(value) ?   `url(${value})`:value
            }
            return acc;
        }, {});
    }

    return cssData; // 如果是其他类型，直接返回原数据
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
        cssAttr = ['width', 'height', 'top', 'left', 'right', 'bottom', 'margin', 'padding', 'font-size', 'border-width', 'border-radius', 'margin-top', 'margin-bottom', 'margin-left', 'margin-right', 'padding-top', 'padding-bottom', 'padding-left', 'padding-right', 'border-top-width', 'border-bottom-width', 'border-left-width', 'border-right-width', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius']
    }
) {

    const camelCaseAttrs = cssAttr.map(attr => attr.replace(/-([a-z])/g, (_, char) => char.toUpperCase()));

    return handleCssData(cssData, cssAttr, camelCaseAttrs, unit, baseSize);

};
