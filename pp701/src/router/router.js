import VueRouter from 'vue-router'
import Vue from 'vue'
import Home from '@/views/home.vue'
import Login from '@/views/login.vue'
Vue.use(VueRouter)
var router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: { name: 'home' }
        },
        {
            name: 'home',
            path: '/home',
            component: Home
        },
        {
            name: 'login',
            path: '/login',
            component: Login
        }
    ]
})
export default router