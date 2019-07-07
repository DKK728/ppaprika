import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login.vue'
import Home from '@/views/home.vue'
import Welcome from '@/views/users/index'
import Users from '@/views/users/users'
import Roles from '@/views/authority/roles'
import Rights from '@/views/authority/rights'
import Goods from '@/views/goods/goods'
import Params from '@/views/goods/params'
import Categories from '@/views/goods/categories'
import Toadd from '@/views/goods/toadd'
import List from '@/views/goods/list'
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
          name: 'roles',
          path: 'roles',
          component: Roles
        },
        {
          name: 'rights',
          path: 'rights',
          component: Rights
        },
        {
          name: 'goods',
          path: 'goods',
          component: Goods,
          redirect: { name: 'list' },
          children: [
            {
              name: 'toadd',
              path: 'toadd',
              component: Toadd
            },
            {
              name: 'list',
              path: 'list',
              component: List
            }
          ]
        },
        {
          name: 'params',
          path: 'params',
          component: Params
        },
        {
          name: 'categories',
          path: 'categories',
          component: Categories
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
