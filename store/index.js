export const state = () => ({
  login: !!window.localStorage.token || false,
  user: null
})

export const mutations = {
  UPDATE_LOGIN(state, payload) {
    state.login = payload
  },

  UPDATE_USER(state, payload) {
    if (payload) {
      state.user = Object.assign({}, state.user, payload)
    } else {
      state.user = payload
    }
  }
}

export const actions = {
  getUser({ commit, state }) {
    if (state.login) {
      return this.$api.$get('/me').then(response => {
        commit('UPDATE_USER', response.data)
      })
    }
  },

  logonUser({ commit, dispatch }, payload) {
    return this.$api
      .$post('/login', {
        email: payload.email,
        password: payload.password
      })
      .then(response => {
        window.localStorage.token = `Bearer ${response.data.token}`
        commit('UPDATE_LOGIN', true)
        dispatch('getUser')
      })
  },

  logoutUser({ commit }) {
    commit('UPDATE_USER', null)
    commit('UPDATE_LOGIN', false)
    window.localStorage.removeItem('token')
  }
}
