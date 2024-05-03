import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state: {
    cachedPermissions: {},
  },
  mutations: {
    SET_CACHED_PERMISSIONS(state, payload) {
      state.cachedPermissions[payload.roleId] = payload.data
    },
  },
  actions: {
    async fetchPermissions({ commit }, roleId) {
      const cachedData = this.state.cachedPermissions[roleId]
      if (cachedData) {
        return cachedData
      }

      try {
        const permissionsResponse = await axios.get(`http://localhost:8000/api/roles/${roleId}/give-permissions`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          },
        })
        const permissionsData = permissionsResponse.data

        const data = {
          role: permissionsData.role,
          permissions: permissionsData.permissions,
          rolePermissions: permissionsData.rolePermissions,
        }

        commit('SET_CACHED_PERMISSIONS', { roleId, data })
        return data
      } catch (error) {
        console.error(error)
      }
    },
  },
})

export default store