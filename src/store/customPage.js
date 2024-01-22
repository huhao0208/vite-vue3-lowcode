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
        list:[ ]
    }),
    getters: {
        doubleCount(state) {
            return this.counter * 2
        },
    },
    actions: {
        updateList(e){

            this.list = e.map(item => {
                return {
                    ...item,
                    uid:item.uid||Math.random().toString(36).substr(2, 9),
                }
            })
        },
        setCurrent(uid) {
           this.currentUid = uid
        },
        decrement() {
            this.counter--
        },
    },
})
