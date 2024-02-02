import {createRouter, createWebHashHistory} from 'vue-router';
import NProgress from "nprogress";


const routes = [
    {
        path: '/:pathMatch(.*)*',
        component: () => import('./views/index.vue'),
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
