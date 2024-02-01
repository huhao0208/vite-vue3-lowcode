export const useCustomPage = defineStore('customPage', {
    // 开启数据缓存
    persist: {
        key: 'customPage', // 自定义名称
        storage: localStorage, // 保存位置，默认保存在sessionStorage
        paths: ['list', 'pageConfig'], // 指定要持久化的数据，默认所有 state 都会进行缓存，你可以通过 paths 指定要持久化的字段，其他的则不会进行持久化。
    },
    state: () => ({
        currentUid: '',
        list:[ ],
        pageConfig:{
            backgroundColor: '', // 设置元素的背景颜色，默认值：transparent。
            backgroundImage: '', // 设置元素的背景图像，默认值：none。
            backgroundSize: 'auto', // 设置元素背景图像的大小，默认值：auto。
            backgroundPosition: '', // 设置元素背景图像的位置，默认值：0% 0%。
            backgroundRepeat: '', // 设置背景图像是否重复，以及如何重复，默认值：repeat。
            backgroundClip: '', // 设置元素背景的渲染区域，默认值：border-box。
            backgroundOrigin: '',// 设置元素背景的定位区域（背景区），默认值：border-box。
            backgroundAttachment: '',// 设置元素的背景图像是否随页面滚动或固定，默认值：scroll。
            backgroundBlendMode: '',// 设置元素背景层的混合模式，默认值：normal。
        },
    }),
    getters: {
        currentIndex(state) {
            return state.list.findIndex(item => item.uid === state.currentUid)
        },
        currentDetail: state => {
            return state.list[state.currentIndex]
        }
    },
    actions: {
        updateList(e){
            // 如果有name是NavBar的 则将其放最前面

            this.list = e.map(item => {
                return {
                    ...item,
                    attrs:item.attrs||{},
                    styles:item.styles||{
                        opacity:1,
                        // width: 'auto',
                        // height: 'auto',

                    },
                    events:item.events||{},
                    uid:item.uid||Math.random().toString(36).substr(2, 9),
                }
            }).sort((a ,b)=> {
                if(a.name === 'NavBar'){
                    return -1
                }else if(b.name === 'NavBar'){
                    return 1
                }else{
                    return 0
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
