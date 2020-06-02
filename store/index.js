export const state = () => ({
  login: window.localStorage.token || false,
  user: null
})

export const mutations = {
  UPDATE_LOGIN(state, payload) {
    state.login = payload
  },
  UPDATE_USER(state, payload) {
    state.user = Object.assign({}, state.user, payload)
  }
}

export const actions = {
  getUser({ commit }) {
    return this.$api.$get('/me').then(response => {
      commit('UPDATE_LOGIN', true)
      commit('UPDATE_USER', response.data)
    })
  },
  logonUser(context, payload) {
    return this.$api
      .$post('/login', {
        email: payload.email,
        password: payload.password
      })
      .then(response => {
        window.localStorage.token = `Bearer ${response.data.token}`
        context.dispatch('getUser')
      })
  },
  logoutUser(context) {
    context.commit('UPDATE_USER', null)
    window.localStorage.token = ''
    context.commit('UPDATE_LOGIN', false)
  }
}
