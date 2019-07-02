import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(ElementUI)

// 添加路由导航守卫
router.beforeEach((to, from, next) => {
  // 获取token
  var token = localStorage.getItem('heima_manager_token')
  // 如果没有token值，除非你去登陆，否则都应该重定向到登陆
  if (token || to.path === '/login') {
    // 如果有token,那么就next
    next()
  } else if (!token && to.path !== '/login') {
    next({ name: 'login' })
  }
})
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
