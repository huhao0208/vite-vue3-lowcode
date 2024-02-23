import { createApp } from 'vue';
import pinia from '@/store'
import 'normalize.css';
import App from './App.vue';

import router from './router';

import "amfe-flexible/index.js";


import 'animate.css';

const app = createApp(App);

app.use(pinia)
//
// app.config.globalProperties.$$refs = {};
//
// // if (import.meta.env.DEV) {
// window.$$refs = app.config.globalProperties.$$refs;
// }

app.use(router).mount('#app');
