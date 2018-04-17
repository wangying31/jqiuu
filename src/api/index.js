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
  authInfo () {
    axios.get('/user/authInfo', config())
  },
  localReg: data => {
    axios.post('/user/addUser', data, config())
  },
  articleList: data => {
    return axios.get('/article/articleList/' + data, config())
  },
  photoList: data => {
    return axios.get('/album/photoList/' + data, config())
  },
  photoLike: data => {
    return axios.put('/album/' + data + '/photoLike', {}, config())
  },
  userInfo: data => {
    return axios.get('/user' + data + '/userInfo', config())
  },
  userSet: () => {
    return axios.get('/user/set', config())
  },
  updateUser: data => {
    return axios.put('/user/updateUser', data, config())
  },
  updatePassword: data => {
    return axios.put('/user/updatePassword', data, config())
  },
  tags: data => {
    return axios.get('/article/tags', config())
  }
}
