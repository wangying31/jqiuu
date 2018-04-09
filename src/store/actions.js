import * as types from './types'
import api from '../api/index'

export const showMsg = ({ commit }, data) => {
  const id = new Date().getTime()
  data.id = id
  commit(types.SHOW_MSG, data)
  setTimeout(() => commit(types.HIDE_MSG, id), 5000)
}

export const hideMsg = ({ commit }, id) => {
  commit(types.HIDE_MSG, id)
}

export const showModal = ({ commit }, data) => {
  commit(types.SHOW_MODAL, data)
}

export const hideModal = ({ commit }, data) => {
  commit(types.HIDE_MODAL, data)
}

export const authInfo = ({ commit }) => {
  api.authInfo().then(response => {
    commit(types.AUTH_INFO, {
      token: response.data.token,
      info: response.data.authInfo
    })
  }).catch(error => {
    if (error.response) {
      commit(types.AUTH_INFO)
    }
  })
}

export const userLogout = ({commit}) => {
  commit(types.USER_LOGOUT)
  window.location.pathname = '/login'
}

export const userLogin = ({commit}, data) => {
  api.localLogin(data).then(response => {
    commit(types.USER_LOGIN, {
      token: response.data.token
    })
    authInfo({commit})
    showMsg({commit}, {
      content: '登录成功',
      type: 'info'
    })
  }).catch(error => {
    if (error.response) {
      showMsg({commit}, {
        content: error.response.data.errorMsg || '登录失败',
        type: 'danger'
      })
    }
  })
}

export const userReg = ({commit}, data) => {
  api.localReg(data).then(response => {
    commit(types.USER_REG, {
      token: response.data.token
    })
    authInfo({commit})
    showMsg({commit}, {
      content: '注册成功',
      type: 'info'
    })
  }).catch(error => {
    if (error.response) {
      showMsg({commit}, {
        content: error.response.data.errorMsg || '注册失败',
        type: 'danger'
      })
    }
  })
}

export const updateHeader = ({commit}, data) => {
  commit(types.UPDATE_HEADER, data)
}
