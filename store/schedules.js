export const state = () => ({
  schedules: null
})

export const mutations = {
  UPDATE_SCHEDULES(state, payload) {
    state.schedules = payload
  }
}

export const actions = {
  getSchedules({ commit }) {
    return this.$api.$get('/schedules').then(response => {
      commit('UPDATE_SCHEDULES', response.schedules)
      window.localStorage.schedules = response.schedules
    })
  }
}

export const getters = {
  get(state) {
    return state.schedules || window.localStorage.schedules
  }
}
