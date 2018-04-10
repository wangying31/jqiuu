import Vue from 'vue'
import Router from 'vue-router'

import store from '../store/index'

import index from '../page/index'
import dairy from '../page/dairy'

Vue.use(Router)

const routes = [{
  path: '/',
  component: index,
  meta: { auth: false }
}, {
  path: '/dairy',
  component: dairy,
  meta: { auth: false }
}
]

const router = new Router({
  mode: 'history',
  saveScrollPosition: true,
  routes
})

router.beforeEach(({meta, path}, from, next) => {
  var { auth = true } = meta
  var isLogin = Boolean(store.state.auth.token) // true用户已登录， false用户未登录

  if (auth && !isLogin && path !== '/login') {
    return next({ path: '/login' })
  }
  if (isLogin && (path === '/login' || path === '/reg')) {
    return next({ path: '/' })
  }
  next()
})

export default router
