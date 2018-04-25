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
  },
  articlePage: data => {
    return axios.get('/article/' + data + '/articlePage', config())
  },
  articleCollect: data => {
    return axios.put('/article/' + data + '/articleCollect', {}, config())
  },
  addArticle: data => {
    return axios.post('/article/addArticle', data, config())
  },
  articleList: data => {
    return axios.get('/article/articleList/' + data, config())
  },
  articleUser: data => {
    return axios.get('/article/' + data, config())
  },
  articleTogether: data => {
    return axios.get('/article/' + data + '/articleTogether', config())
  },
  commentList: data => {
    return axios.get('/comment/' + data + '/commentList', config())
  },
  commentListAll: data => {
    return axios.get('/comment/' + data + '/commentListAll', config())
  },
  addComment: data => {
    return axios.post('/comment/addComment', data, config())
  },
  delComment: data => {
    return axios.delete('/comment/' + data, config())
  },
  editArticle: data => {
    return axios.put('/article/' + data.aid + '/editArticle', data, config())
  },
  delArticle: data => {
    return axios.delete('/article/' + data, config())
  },
  articleStatus: data => {
    return axios.put('/article/' + data + '/articleStatus', {}, config())
  },
  addPhoto: data => {
    return axios.post('/album/addPhoto', data, config())
  },
  photoList: data => {
    return axios.get('/album/photoList/' + data, config())
  },
  photoLike: data => {
    return axios.put('/album/' + data + '/photoLike', {}, config())
  },
  photoUser: data => {
    return axios.get('/album/' + data + '/photoUser', config())
  },
  delPhoto: data => {
    return axios.delete('/album/' + data, config())
  }
}
