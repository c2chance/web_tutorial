import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import VueAxios from 'vue-axios'
import axios from 'axios'

import router from './tools/Router'
import store from './tools/Store'

import App from './App.vue'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(ElementPlus)
app.use(VueAxios, axios)
app.use(router)
app.use(store)
app.mount('#app')