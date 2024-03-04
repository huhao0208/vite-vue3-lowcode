import {v4 as uuid} from "uuid";
import {components, settingComponents} from 've/components/Packages/index.js'

export const useCustomPage = defineStore('customPage', {
    // 开启数据缓存
    persist: {
        key: 'customPage', // 自定义名称
        storage: localStorage, // 保存位置，默认保存在sessionStorage
        paths: ['classDetail'], // 指定要持久化的数据，默认所有 state 都会进行缓存，你可以通过 paths 指定要持久化的字段，其他的则不会进行持久化。
    },
    state: () => ({
        currentUid: '',
        list: [],
        pageConfig: {
            backgroundColor: '', // 设置元素的背景颜色，默认值：transparent。
            backgroundImage: '', // 设置元素的背景图像，默认值：none。
            backgroundSize: 'cover', // 设置元素背景图像的大小，默认值：auto。
            backgroundPosition: '', // 设置元素背景图像的位置，默认值：0% 0%。
            backgroundRepeat: 'no-repeat', // 设置背景图像是否重复，以及如何重复，默认值：repeat。
        },
        classDetail:{}
    }),
    getters: {
        classId(state) {
            return state.classDetail?.id
        },
        currentIndex(state) {
            return state.list.findIndex(item => item.uid === state.currentUid)
        },
        currentDetail: state => {
            return state.list[state.currentIndex]
        },
        pageData(state) {
            return {
                ...state.pageConfig,
                list: state.list,
            }
        },
    },
    actions: {
        setClassDetail(e) {
            console.log('%c setClassDetail', 'color: #007acc;')
            this.classDetail = e
        },
        updateList(e=[]) {
            console.log('%c updateList', 'color: #007acc;')
            this.list = e.map(item => {
                // console.log(item)
                const {name, label, styles, outStyles, attrs, events, uid='', children = [], type} = item

                const {
                    attrs: defaultAttrs = {},
                    events: defaultEvents = [],
                    styles: defaultStyles = {},
                    outStyles: defaultOutStyles = {},
                    children: defaultChildren = []
                } = settingComponents[name]?.config || {}

                return {
                    name, label, type,
                    uid: uid || uuid(),
                    styles: styles || {
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        ...defaultStyles
                    },
                    outStyles: outStyles || {
                        width: 375,
                        height: 80,
                        overflow: 'hidden',
                        display: 'block',
                        opacity: 1,
                        boxSizing: "border-box",
                        ...defaultOutStyles
                    },
                    attrs: attrs || {...defaultAttrs},
                    events: events ||defaultEvents,

                }
            })
        },

        setCurrent(uid) {
            this.currentUid = uid;
        },
        updateCurrentDetail(detail) {
            this.list[this.currentIndex] = detail
        },
        updatePageConfig(config) {
            this.pageConfig = config
        },

    },
})
