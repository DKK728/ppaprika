import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login.vue'
import Home from '@/views/home.vue'
import Welcome from '@/views/users/index'
import Users from '@/views/users/users'
import Userlist from '@/views/authority/userlist'
import Authoritylist from '@/views/authority/authoritylist'
import Goodslist from '@/views/goods/goodslist'
import Classparameter from '@/views/goods/classparameter'
import Goodsclass from '@/views/goods/goodsclass'
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
      component: Home,
      redirect: { path: '/home/wel' },
      children: [
        {
          path: 'wel',
          component: Welcome
        },
        {
          name: 'users',
          path: 'users',
          component: Users
        },
        {
          name: 'userlist',
          path: 'userlist',
          component: Userlist
        },
        {
          name: 'authoritylist',
          path: 'authoritylist',
          component: Authoritylist
        },
        {
          name: 'goodslist',
          path: 'goodslist',
          component: Goodslist
        },
        {
          name: 'classparameter',
          path: 'classparameter',
          component: Classparameter
        },
        {
          name: 'goodsclass',
          path: 'goodsclass',
          component: Goodsclass
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    }
  ]
})
export default router
