//import { createRouter, createWebHashHistory, RouteRecordRaw, RouterOptions, Router } from "vue-router";
import { createRouter, createWebHistory } from 'vue-router';
// 使用 import type 导入 TypeScript 接口和类型
import type { RouteRecordRaw, RouterOptions, RouteLocationNormalized, Router } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Index',
        component: () => import('../views/Index.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: ()=> import('../views/Login.vue')
    }
]

const routerOptions: RouterOptions = {
    history: createWebHistory(),
    routes
}

const router: Router = createRouter(routerOptions)
export default router