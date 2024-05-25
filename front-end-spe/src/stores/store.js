/* store.js  vuex store*/
import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state: {
    cachedPermissions: {},
    users: [],
    categories: [],
    allCategories: [],
    designations: [], 
    controles: [],
    addedData: [],
    selectedCells: [],
    weekDays: [],
    
    selectedMonth: null,
    selectedYear: new Date().getFullYear(),

   // groupeIds:[],
    lastFetchTime: null,
    fetchInterval: 30000, // Fetch interval in milliseconds (e.g., 30 seconds)
  },
  mutations: {
    setAddedData(state, payload) {
      state.addedData = payload;
    },
    setSelectedCells(state, payload) {
      state.selectedCells = payload;
    },
    setWeekDays(state, payload) {
      state.weekDays = payload;
    },
    setSelectedMonth(state, payload) {
      state.selectedMonth = payload;
    },
    setSelectedYear(state, payload) {
      state.selectedYear = payload;
    },
    ADD_CONTROLE(state, controle) {
      state.controles.push(controle);
    },
    SET_CACHED_PERMISSIONS(state, payload) {
      state.cachedPermissions[payload.roleId] = payload.data
    },
    SET_DESIGNATIONS(state, designations) {
      state.designations = designations;
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories
    },
    SET_ALLCATEGORIES(state, allCategories) {
      state.allCategories = allCategories
    },
    /*
    SET_DESIGNATIONS(state, designations) { // Mutation to set designations
      state.designations = designations
    },
    */
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
    UPDATE_CATEGORY(state, updatedCategory) {
      const index = state.categories.findIndex(category => category.id === updatedCategory.id)
      if (index !== -1) {
        state.categories.splice(index, 1, updatedCategory)
      }
    },
    DELETE_CATEGORY(state, categoryId) {
      state.categories = state.categories.filter(category => category.id !== categoryId)
    },
    SET_GROUPES(state, groupes) {
      state.groupes = groupes;
    },
    SET_GROUPE_IDS(state, groupeIds) {
      state.groupeIds = groupeIds;
    },
   SET_CONTROLES (state, controles){
    (state.controles = controles)
   } ,
  },
  actions: {
    savePlanifications({ state }) {
      // API call to save the planifications
      const planificationsData = state.selectedCells.reduce((acc, cell) => {
        const existingPlan = acc.find(plan => plan.controle_id === cell.controle_id);

        if (existingPlan) {
          existingPlan.dates.push(cell.date);
        } else {
          acc.push({
            controle_id: cell.controle_id,
            dates: [cell.date],
          });
        }

        return acc;
      }, []);

      axios.post('http://localhost:8000/api/planification', planificationsData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      }).then(response => {
        console.log('response.data', response.data);
      }).catch(error => {
        console.error(error);
      });
    },

 
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

  
    async addCategory({ commit }, categoryData) {
      try {
        const response = await axios.post('http://localhost:8000/api/add-category', categoryData, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          },
        })
        const newCategory = response.data.data
        console.log('ddd' ,response.data)
        commit('ADD_CATEGORY', newCategory)
      } catch (error) {
        console.error('Error adding category:', error)
      }
     },
     async updateCategory({ commit }, categoryData) {
      try {
        const response = await axios.put(`http://localhost:8000/api/update-category/${categoryData.id}`, categoryData, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          },
        })
        const updatedCategory = response.data.data
        commit('UPDATE_CATEGORY', updatedCategory)
      } catch (error) {
        console.error('Error updating category:', error)
      }
    },
    async deleteCategory({ commit }, categoryId) {
      try {
        await axios.delete(`http://localhost:8000/api/categories/delete/${categoryId}`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          },
        })
        commit('DELETE_CATEGORY', categoryId)
      } catch (error) {
        console.error('Error deleting category:', error)
      }
    },
    async fetchGroupes({ commit }) {
      try {
        const response = await axios.get('http://localhost:8000/api/groupe', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          },
        });
    
        // Extract the categories array from the response
        const { categories } = response.data;
    
        // Commit the categories array to the Vuex state
        commit('SET_GROUPES', categories);
    
        // Map the categories to extract groupeIds
        const groupeIds = categories.map(category => category.id);
        commit('SET_GROUPE_IDS', groupeIds);
      } catch (error) {
        console.error('Error fetching groupes:', error);
      }
    },
    async createControle({ commit }, controleData) {
      // Create a new controle
      const response = await axios.post('http://localhost:8000/api/controle', controleData ,{
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        },
      }

  
      );
      console.log('poo ',response.data.data)
      commit('ADD_CONTROLE', response.data.data);
    },
 
    async fetchControles({ commit }) {
      try {
        const response = await axios.get('http://localhost:8000/api/controles', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          },
        });
        const controles = response.data;
        console.log('abr ', response.data);
        commit('SET_CONTROLES', controles);

       
      } catch (error) {
        console.error(error);
      }
    },
  




    
    async fetchAllCategories({ commit }) {
      try {
        const response = await axios.get('http://localhost:8000/api/categories', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          },
        });
        const allCategories = response.data;
        console.log('abs ', allCategories);
        commit('SET_ALLCATEGORIES', allCategories);
  
        // Extract designations from categories and set in state
        const designations = allCategories.map(category => category.designation);
        commit('SET_DESIGNATIONS', designations);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    async fetchCategories({ commit }, payload = { page: 1 }) {
      const { page } = payload;
      try {
        const response = await axios.get(`http://localhost:8000/api/categories/paginate?page=${page}`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
          }
        });
        commit('SET_CATEGORIES', response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    
   

  },getters: {
    getCategories(state) {
      return state.allCategories;
    },
  },

})

export default store
