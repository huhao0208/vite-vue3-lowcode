import { createApp } from 'vue';

import 'normalize.css';
import App from './App.vue';

import router from './router';



import 'animate.css';

const app = createApp(App);


//
// app.config.globalProperties.$$refs = {};
//
// // if (import.meta.env.DEV) {
// window.$$refs = app.config.globalProperties.$$refs;
// }

app.use(router).mount('#app');
