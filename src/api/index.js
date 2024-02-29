import {post} from 'utils/request'

export const upload = data => {
    return new Promise(async (resolve, reject) => {
        data.append("forbidOverwrite", "false");
        data.append("expireTime", "0"); // 上传
        data.append("needPrivate", false); // 隐私加密  true = 加密   false 不加密
        data.append("dir", "admin"); // 上传环境
        const result = await post('/zq-operator/common/oss/uploadOssWithNew', data)
        console.log(result, 'result')
        resolve({
            status: 200,
            data: result?.cdnUrl
        })
    })
}

/**
 * @desc 获取登录账户详细信息
 * @param data
 * @returns {Promise<unknown>}
 */
export const getOperatorAccount = data => post('/zq-member/admin/member/getOperatorAccount', data)

/**
 * @desc 获取编辑器分类列表
 * @param data
 * @returns {Promise<unknown>}
 */
export const listThemeEditorClass = data => post('/zq-package/admin/combine/listThemeEditorClass', data)

/**
 * @desc 保存编辑器分类
 * @param data
 * @returns {Promise<unknown>}
 */
export const saveThemeEditorClass = data => post('/zq-package/admin/combine/saveThemeEditorClass', data)

/**
 * @desc 删除编辑器分类
 * @param data
 * @returns {Promise<unknown>}
 */
export const deleteThemeEditorClass = data => post('/zq-package/admin/combine/deleteThemeEditorClass', data)

/**
 * @desc 保存编辑器详情
 * @param data
 * @returns {Promise<unknown>}
 */
export const saveThemeEditorDetail = data => post('/zq-package/admin/combine/saveThemeEditorDetail', data)

/**
 * @desc 更新编辑器详情
 * @param data
 * @returns {Promise<unknown>}
 */
export const updateThemeEditorDetail = data => post('/zq-package/admin/combine/updateThemeEditorDetail', data)

/**
 * @desc 获取分类主题下内容列表
 * @param data
 * @returns {Promise<unknown>}
 */
export const listThemeEditorDetail = data => post('/zq-package/admin/combine/listThemeEditorDetail', data)

/**
 * @desc 删除分类列表项
 * @param data
 * @returns {Promise<unknown>}
 */
export const deleteThemeEditorDetail = data => post('/zq-package/admin/combine/deleteThemeEditorDetail', data)

/**
 * @desc 更新编辑器详情内容
 * @param data
 * @returns {Promise<unknown>}
 */
export const updateThemeEditorDetailContent = data => post('/zq-package/admin/combine/updateThemeEditorDetailContent', data)

/**
 * @desc 获取编辑器详情内容
 * @param data {id,url}
 * @returns {Promise<unknown>}
 */
export const getThemeEditorDetailContent = data => post('/zq-package/client/combine/getThemeEditorDetailContent', data)
