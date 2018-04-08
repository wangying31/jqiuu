import Vue from 'vue'
import Router from 'vue-router'

import index from '../page/index'

Vue.use(Router)

const router = [{
  path: '/',
  component: index,
  meta: { auth: false }
}, {

}]

export default router
