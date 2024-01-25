export const useCustomPage = defineStore('customPage', {
    // 开启数据缓存
    persist: {
        enabled: false,
        strategies: [
            {
                key: 'customPage', // 自定义名称
                storage: localStorage, // 保存位置，默认保存在sessionStorage
               // paths: ['bookId', 'chapterId', 'isEyePrt', 'fontSize'], // 指定要持久化的数据，默认所有 state 都会进行缓存，你可以通过 paths 指定要持久化的字段，其他的则不会进行持久化。
            },
        ],
    },
    state: () => ({
        currentUid: '',
        currentDetail: null,
        list:[ ]
    }),
    getters: {
        doubleCount(state) {
            return this.counter * 2
        },
    },
    actions: {
        updateList(e){
            // 如果有name是NavBar的 则将其放最前面

            this.list = e.map(item => {
                return {
                    ...item,
                    attrs:item.attrs||{},
                    styles:item.styles||{},
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
           this.currentDetail = this.list.find(item => item.uid === uid)
        },
        decrement() {
            this.counter--
        },
    },
})
