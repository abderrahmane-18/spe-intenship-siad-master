// store.js
import { createStore } from 'vuex'
import axios from 'axios';
export default createStore({
  state: {
    roles: [],
    isRolesLoaded: false, // Flag to check if roles data is loaded
  },
  mutations: {
    setRoles(state, roles) {
      state.roles = roles;
      state.isRolesLoaded = true;
    },
    updateRole(state, updatedRole) {
      const index = state.roles.findIndex(role => role.id === updatedRole.id);
      if (index !== -1) {
        state.roles[index] = updatedRole;
      }
    },
    deleteRole(state, roleId) {
      state.roles = state.roles.filter(role => role.id !== roleId);
    },
  },
  actions: {
    async fetchRoles({ commit }) {
      try {
        const response = await axios.get(`http://localhost:8000/api/roles`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          },
        });
        commit('setRoles', response.data.roles);
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {
    roles: state => state.roles,
    isRolesLoaded: state => state.isRolesLoaded,
  }
})
