import axios from 'axios'
/* eslint-disable no-unused-vars */
const qs = require('querystring')

const ROOT = (process.env.NODE_ENV === 'production') ? 'http://' : 'http://localhost:3000'

function config () {
  const base = {
    baseURL: ROOT
  }
  if (localStorage.getItem('user') && !base.headers) {
    base.headers = {Authorization: 'Bearer ' + localStorage.getItem('user').replace(/(^")|("$)/g, '')}
  }
  return base
}

export default {
  localLogin: data => {
    axios.post('/auth/local', data, config())
  },
  authInfo: () => {
    axios.get('/user/authInfo', config())
  }
}
