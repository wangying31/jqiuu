
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'

import './assets/css/common.css'
import './assets/css/iconfont.css'

/* eslint-disable no-unused-vars */
new Vue({
  el: '#app',
  router,
  store,
  ...App
})
