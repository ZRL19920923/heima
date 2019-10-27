import VueRouter from 'vue-router'

import Vue from 'vue'

import Login from '@/views/login/index'
import Home from '@/views/home/index'
import Comment from '@/views/comment/index'
import Fans from '@/views/fans/index'
import Welcome from '@/views/welcome/index'
import Image from '@/views/image/index'
import Publish from '@/views/publish/index'
import Setting from '@/views/setting/index'
import Article from '@/views/article/index'
import Notfound from '@/views/404/index'
import store from '@/store/index'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    // { path: '/', redirect: '/home' },
    { path: '/login', name: 'login', component: Login },
    { path: '/',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome },
        { path: '/comment', name: 'comment', component: Comment },
        { path: '/fans', name: 'fans', component: Fans },
        { path: '/image', name: 'image', component: Image },
        { path: '/publish', name: 'publish', component: Publish },
        { path: '/setting', name: 'setting', component: Setting },
        { path: '/article', name: 'article', component: Article }
      ] },
    { path: '*', name: 'notfound', component: Notfound }
  ]
})
router.beforeEach((to, from, next) => {
  const token = store.getUser().token
  if (!token && to.path !== '/login') return next('/login')
  next()
})

export default router
