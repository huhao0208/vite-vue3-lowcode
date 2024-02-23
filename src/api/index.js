import {post} from 'utils/request'

/**
 * @desc 获取登录账户详细信息
 * @param data
 * @returns {Promise<unknown>}
 */
export const getOperatorAccount = data => post('/zq-member/admin/member/getOperatorAccount',data)

/**
 * @desc 获取编辑器分类列表
 * @param data
 * @returns {Promise<unknown>}
 */
export const listThemeEditorClass = data => post('/zq-package/admin/combine/listThemeEditorClass',data)

/**
 * @desc 保存编辑器分类
 * @param data
 * @returns {Promise<unknown>}
 */
export const saveThemeEditorClass = data => post('/zq-package/admin/combine/saveThemeEditorClass',data)

/**
 * @desc 删除编辑器分类
 * @param data
 * @returns {Promise<unknown>}
 */
export const deleteThemeEditorClass = data => post('/zq-package/admin/combine/deleteThemeEditorClass',data)
