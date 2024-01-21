import {createRouter, createWebHashHistory} from 'vue-router';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // 进度条样式

NProgress.configure({showSpinner: false}); // NProgress Configuration

const routes = [
    {
        path: '/',
        component: () => import('@/views/visual-editor/index.vue'),
    },
    {
        path: '/visual-editor/:id',
        component: () => import('@/views/visual-editor/index.vue'),
    },
    // 404
    {
        path: '/404',
        component: () => import('@/views/404.vue'),
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

router.beforeEach(() => {
    NProgress.start(); // start progress bar
    return true;
});

router.afterEach(() => {
    NProgress.done(); // finish progress bar
});

export default router;
