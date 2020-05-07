export const state = () => ({
  equipments: null
})

export const mutations = {
  ADD_EQUIPMENTS(state, payload) {
    state.equipments = payload
  }
}

export const actions = {
  async getEquipments({ commit }) {
    const equipmentsPages = await this.$api.$get('/equipments')
    commit('ADD_EQUIPMENTS', equipmentsPages)
  }
}

export const getters = {
  equipments(state) {
    return state.equipments
  }
}
