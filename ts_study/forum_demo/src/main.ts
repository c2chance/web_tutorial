import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import App from './App.vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(ElementPlus)
app.use(VueAxios, axios)
app.mount('#app')
/*
CREATE TABLE IF NOT EXISTS user(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nickname VARCHAR(32) NOT NULL,
    account VARCHAR(32) UNIQUE NOT NULL,
    password VARCHAR(32) NOT NULL
);

INSERT INTO user(nickname, account, password) 
VALUES('foobar', 'foobar', 'fb7890')

SELECT * FROM user;
*/