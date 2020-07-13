export const state = () => ({
  paged: null
})

export const mutations = {
  UPDATE_EQUIPMENTS(state, payload) {
    state.paged = payload
  }
}

export const actions = {
  getEquipments({ commit }, params) {
    return this.$api.$get('/equipments', { params }).then(response => {
      commit('UPDATE_EQUIPMENTS', response.equipments)
      window.localStorage.equipments = response.equipments
    })
  }
}

export const getters = {
  get(state) {
    return state.paged || window.localStorage.equipments
  }
}
