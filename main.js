import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入element组件和样式
import '@/styles/index.less'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// axios 简单配置
import axios from '@/api/index'
Vue.use(ElementUI)
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  // 挂载路由
  router,
  render: h => h(App)
}).$mount('#app')
