export const state = () => ({
  token: localStorage.getItem('user-token') || '',
  status: ''
})

export const mutations = {
  AUTH_ERROR(state) {
    state.status = 'error'
  },

  AUTH_LOGOUT(state) {
    state.token = ''
  },

  AUTH_REQUEST(state) {
    state.status = 'loading'
  },

  AUTH_SUCCESS(state, token) {
    state.status = 'success'
    state.token = token
  }
}

export const actions = {
  auth_logout({ commit }) {
    return new Promise(resolve => {
      commit('AUTH_LOGOUT')
      localStorage.removeItem('user-token')
      // eslint-disable-next-line dot-notation
      delete this.$api.defaults.headers.common['Authorization']
      resolve()
    })
  },

  auth_request({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit('AUTH_REQUEST')
      this.$api({ url: '/login', data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data.token
          localStorage.setItem('user-token', token)
          // eslint-disable-next-line dot-notation
          this.$api.defaults.headers.common['Authorization'] = token
          commit('AUTH_SUCCESS', resp)
          resolve(resp)
        })
        .catch(err => {
          commit('AUTH_ERROR', err)
          localStorage.removeItem('user-token')
          reject(err)
        })
    })
  }
}

export const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status
}
