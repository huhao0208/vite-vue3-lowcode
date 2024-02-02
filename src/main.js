import {createApp} from 'vue'
import pinia from '@/store'
import router from "@/router";
import 'default-passive-events'


import 'normalize.css';
import './style.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import App from './App.vue'
const app = createApp(App)
import install from './directives/ContextMenuDirective.js';
install(app)


    app.use(pinia)
    .use(router)
    .use(window.contextmenu)
    .mount('#app')
