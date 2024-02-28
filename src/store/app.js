export const useApp = defineStore('app', {
    // 开启数据缓存
    persist: {
        key: 'app', // 自定义名称
        storage: localStorage, // 保存位置，默认保存在sessionStorage
        paths: ['token', 'userName'], // 指定要持久化的数据，默认所有 state 都会进行缓存，你可以通过 paths 指定要持久化的字段，其他的则不会进行持久化。
    },
    state: () => ({
        token: '',
        userName: '',
        userInfo: null,
        breadcrumb: []
    }),
    getters: {},
    actions: {
        updateBreadcrumb(breadcrumb) {
            console.log(breadcrumb,'breadcrumb')
            this.breadcrumb = breadcrumb
        },

        setToken(token) {
            this.token = token
        },
        setUserName(userName) {
            this.userName = userName
        },
        setUserInfo(userInfo) {
            this.userInfo = userInfo
        },

    },
})
