import VueRouter from 'vue-router'

import Vue from 'vue'

import Login from '@/views/login'
import Home from '@/views/home'
import Comment from '@/views/comment'
import Fans from '@/views/fans'
import Welcome from '@/views/welcome'
import Image from '@/views/image'
import Publish from '@/views/publish'
import Setting from '@/views/setting'
import Article from '@/views/article'
import Notfound from '@/views/404'
import store from '@/store'

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
