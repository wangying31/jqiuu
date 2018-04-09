import Vue from 'vue'
import Router from 'vue-router'

import store from '../store/index'

import index from '../page/index'

Vue.use(Router)

const routers = [{
  path: '/',
  component: index,
  meta: { auth: false }
}, {

}]

const router = new Router({
  mode: 'history',
  saveScrollPosition: true,
  routers
})

router.beforeEach(({meta, path}, from, next) => {
  const {auth = true} = meta
  const isLogin = Boolean(store.state.auth.token)// true 已登录
  if (auth && !isLogin && path !== '/login') {
    return next({path: '/login'})
  }
  if (isLogin && (path === '/login' || path === '/reg')) {
    return next({path: '/'})
  }
  next()
})

export default router
