import {createApp} from 'vue'
import pinia from '@/store'
import router from '@/router';
import 'default-passive-events'
import directives from "@/directives/index";

import 'normalize.css';
import './style.css'
import 'animate.css';
import 'element-plus/theme-chalk/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import App from './App.vue'

const app = createApp(App)

// devtools
import { useRequestDevToolsPlugin } from 'vue-hooks-plus'
app.use(useRequestDevToolsPlugin)

app.use(pinia)
    .use(router)
    .use(directives)
    .mount('#app')
