import {createRouter, createWebHashHistory} from 'vue-router';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // 进度条样式

import {getOperatorAccount} from "api/index.js"

NProgress.configure({showSpinner: false}); // NProgress Configuration


const routes = [
    {
        path: '/',
        redirect: '/page-manager'

    },
    {
        path: '/page-manager',
        name: 'page-manager',
        meta: {
            title: '页面管理',
            keepAlive: true,
        },
        component: () => import('@/views/page-manager/index.vue'),

    },
    {
        path: '/visual-editor/:url',
        name: 'visual-editor',
        component: () => import('@/views/visual-editor/index.vue'),
    },
    // 404
    {
        path: '/404',
        name: '404',
        meta: {
            title: '404',
        },
        component: () => import('@/views/404.vue'),
    },
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            title: '登录',
            unAuth: true
        }
    },
    {
        path: '/:pathMatch(.*)',
        redirect: '/404',
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach(async (to, from) => {
    NProgress.start(); // start progress bar
    console.log(to)
    if (to?.meta?.unAuth) {
        return true;
    }
    // 如果有传递token 则更新token
    let {token, name} = to.query
    const appStore = useApp();


    if (!appStore.token && token && name) {
        appStore.setToken( atob(token))
        appStore.setUserName(name)
        await router.replace({
            ...to,
            query: {
                ...to.query,
                token: undefined,
                name: undefined,
            },
        });
    }

    // 获取用户信息
    if (!appStore.userInfo) {
        try {
            const data = await getOperatorAccount({
                username: appStore.userName
            })
            appStore.setUserInfo(data)
        } catch (e) {
            console.log(e)
        }
    }
    return true;
})
;

router.afterEach(() => {
    NProgress.done(); // finish progress bar
});

export default router;
