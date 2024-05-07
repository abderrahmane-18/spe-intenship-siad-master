import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state: {
    cachedPermissions: {},
    users: [],
    categories: [],
    lastFetchTime: null,
    fetchInterval: 30000, // Fetch interval in milliseconds (e.g., 30 seconds)
  },
  mutations: {
    SET_CACHED_PERMISSIONS(state, payload) {
      state.cachedPermissions[payload.roleId] = payload.data
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories
    },
    SET_USERS(state, users) {
      state.users = users
      state.lastFetchTime = Date.now()
    },
    UPDATE_USER(state, updatedUser) {
      const index = state.users.findIndex(user => user.id === updatedUser.id)
      if (index !== -1) {
        state.users.splice(index, 1, updatedUser)
      }
    },
    ADD_CATEGORY(state, category) {
      state.categories.push(category)
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
    async fetchUsers({ commit }) {
      // Check if the users' data is already present and not outdated
      if (this.state.users.length && Date.now() - this.state.lastFetchTime < this.state.fetchInterval) {
        return this.state.users
      }
      try {
        const response = await axios.get('http://localhost:8000/api/users', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          },
        })
        const usersWithRoles = response.data.users
        commit('SET_USERS', usersWithRoles)
        return usersWithRoles
      } catch (error) {
        console.error(error)
      }
    },
    async updateUser({ commit }, userData) {
      try {
        const response = await axios.put(`http://localhost:8000/api/users/${userData.id}`, {
          name: userData.name,
          email: userData.email,
          roles: [userData.level],
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        })
        const updatedUser = response.data.data
        commit('UPDATE_USER', updatedUser)
        return updatedUser
      } catch (error) {
        console.error(error)
      }
    },
    async fetchCategories({ commit }) {
      try {
        const response = await axios.get('http://localhost:8000/api/categories', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          },
        })
        const categories = response.data.categories
        commit('SET_CATEGORIES', categories)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    },

    async addCategory({ commit }, category) {
      try {
        const response = await axios.post('http://localhost:8000/api/add-category', category, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          },
        })
        commit('ADD_CATEGORY', response.data)
      } catch (error) {
        console.error('Error adding category:', error)
        throw error
      }
    },
  },
})

export default store
