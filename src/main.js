import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import VueRouter from 'vue-router'
import routeConfig from './router-config'
import echarts from "echarts"
Vue.use(VueRouter)
Vue.use(ElementUI)
//定义路由
const router = new VueRouter({
    routes: routeConfig
})
// router.beforeEach((to, from, next) => {
//     if (to.path.startsWith('/login')) {
//         window.sessionStorage.removeItem('access-token')
//         next()
//     } else {
//         let token = window.sessionStorage.getItem('access-token')
//         if (!token) {
//             next({path: '/login'})
//         } else {
//             next()
//         }
//     }
// })
new Vue({
    router,
  el: '#app',
  render: h => h(App)
})
