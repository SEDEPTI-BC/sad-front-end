export const state = () => ({
  paged: null
})

export const mutations = {
  UPDATE_EQUIPMENTS(state, payload) {
    state.paged = payload
  }
}

export const actions = {
  getEquipments({ commit }) {
    this.$api.$get('/equipments').then(response => {
      commit('UPDATE_EQUIPMENTS', response.equipments)
    })
  }
}

export const getters = {
  get(state) {
    return state.paged
  }
}
