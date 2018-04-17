import Vue from 'vue'
import Router from 'vue-router'

import store from '../store/index'

import index from '../page/index'
import dairy from '../page/dairy'
import photo from '../page/photo'
import login from '../page/login'
import reg from '../page/reg'
import set from '../page/set'

import setIndex from '../components/set/index'
import setFriend from '../components/set/friend'
import setPassword from '../components/set/password'

Vue.use(Router)

const routes = [{
  path: '/',
  component: index,
  meta: { auth: false }
}, {
  path: '/dairy',
  component: dairy,
  meta: { auth: false }
}, {
  path: '/photo',
  component: photo,
  meta: {auth: false}
}, {
  path: '/login',
  component: login
}, {
  path: '/reg',
  component: reg,
  meta: { auth: false }
}, {
  path: '/set',
  component: set,
  children: [
    {
      path: '',
      name: 'setIndex',
      component: setIndex
    },
    {
      path: 'password',
      name: 'setPassword',
      component: setPassword
    },
    {
      path: 'friend',
      name: 'setFriend',
      component: setFriend
    }
  ]
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

  // if (auth && !isLogin && path !== '/login') {
  //   return next({ path: '/login' })
  // }
  // if (isLogin && (path === '/login' || path === '/reg')) {
  //   return next({ path: '/' })
  // }
  next()
})

export default router
