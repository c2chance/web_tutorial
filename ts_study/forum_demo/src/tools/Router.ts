import { createRouter, createWebHashHistory, type Router } from 'vue-router'
import store from '../tools/Store'
import Layout from '../components/layout/Layout.vue'
import Login from '../components/login/Login.vue'
import SignUp from '../components/login/SignUp.vue'
import Home from '../components/home/Home.vue'
import PublishPost from '../components/home/PublishPost.vue'
import PostDetail from '../components/post/PostDetail.vue'
import SearchPage from '../components/home/SearchPage.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: Layout,
            name: "Layout",
            children: [
                {
                    path: 'home', 
                    component: Home,
                    name: "home"
                },
                { path: 'login', component: Login, name: 'login' },
                {path:'sign',component:SignUp, name:'sign'},
		{path: 'publish/:category_id', component: PublishPost, name: 'publish', props: true},
		{path:'post/:id', component:PostDetail,name:'detail',props:true},
		{path:'search/:keyword',component:SearchPage,name:'search',props:true}
            ]
        }
    ]
})

router.beforeEach((from) => {
    const isLogin = store.getters.isLogin;
    if (isLogin || from.name == 'login' || from.name == 'sign') {
        return true;
    } else {
        return {name:'login'}
    }
})
export default router;