/* store.js  vuex store*/
import { createStore } from "vuex";
import axios from "axios";

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
    //user: null,
    cachedRoles: [],
    //cachedRoles: [],
    isLoadingPermissions: false,
    permissionsuser: [],
    user: null,
    roles: [],
    permissions: [],
    data: [],
    paliers: [],
    parameters: [],
    notifications: [],
    notifying: false,
    selectedMonth: null,
    selectedYear: new Date().getFullYear(),
    accessToken: localStorage.getItem("access_token") || null,
    name_user: localStorage.getItem("name") || null,
    user_id: localStorage.getItem("id") || null,
    planifications: [], // Assuming you have an array to store planifications

    // groupeIds:[],
    lastFetchTime: null,
    fetchInterval: 30000, // Fetch interval in milliseconds (e.g., 30 seconds)
  },
  mutations: {
    setAddedData(state, payload) {
      state.addedData = payload;
    },
    UPDATE_DATE_REALIZED(state, { planificationId, date_realized }) {
      const planification = state.planifications.find(
        (p) => p.id === planificationId
      );
      if (planification) {
        planification.date_realized = date_realized;
      }
    },

    SET_ACCESS_TOKEN(state, token) {
      state.accessToken = token;
    },
    SET_NAME(state, name_user) {
      state.name_user = name_user;
      localStorage.setItem("name", name_user);
    },
    SET_ID(state, user_id) {
      state.user_id = user_id;
      localStorage.setItem("id", user_id);
    },
    setSelectedCells(state, payload) {
      state.selectedCells = payload;
    },

    setWeekDays(state, payload) {
      state.weekDays = payload;
    },
    SET_PERMISSIONS(state, userpermissions) {
      state.permissionsuser = userpermissions;
    },
    ADD_NOTIFICATION(state, notification) {
      state.notifications.unshift(notification); // Add to the beginning of the array
      state.notifying = true;
    },
    CLEAR_NOTIFYING(state) {
      state.notifying = false;
    },
    ADD_PERMISSION(state, permission) {
      state.permissions.push(permission);
    },
    UPDATE_PERMISSION(state, updatedPermission) {
      const index = state.permissionsuser.findIndex(
        (permission) => permission.id === updatedPermission.id
      );
      if (index !== -1) {
        state.permissionsuser.splice(index, 1, updatedPermission);
      }
    },
    DELETE_PERMISSION(state, permissionId) {
      state.permissions = state.permissions.filter(
        (permission) => permission.id !== permissionId
      );
    },
    setSelectedMonth(state, payload) {
      state.selectedMonth = payload;
    },
    SET_USER_DATA(state, userData) {
      state.user = userData;
      state.roles = userData.roles;
      state.permissions = userData.permissions;
      console.log("aa", state);
    },
    setSelectedYear(state, payload) {
      state.selectedYear = payload;
    },
    ADD_CONTROLE(state, controle) {
      state.controles.push(controle);
    },
    SET_CACHED_PERMISSIONS(state, { roleId, data }) {
      state.cachedPermissions[roleId] = data;
    },
    SET_DESIGNATIONS(state, designations) {
      state.designations = designations;
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    SET_ALLCATEGORIES(state, allCategories) {
      state.allCategories = allCategories;
    },
    /*
    SET_DESIGNATIONS(state, designations) { // Mutation to set designations
      state.designations = designations
    },
    */
    ADD_PARAMETER(state, payload) {
      state.paliers.push(payload);
    },
    SET_PALIERS(state, paliers) {
      state.paliers = paliers;
    },
    SET_USERS(state, users) {
      state.users = users;
      state.lastFetchTime = Date.now();
    },
    UPDATE_USER(state, updatedUser) {
      const index = state.users.findIndex((user) => user.id === updatedUser.id);
      if (index !== -1) {
        state.users.splice(index, 1, updatedUser);
      }
    },
    SET_CACHED_ROLES(state, roles) {
      state.cachedRoles = roles;
    },

    ADD_CATEGORY(state, category) {
      state.categories.data.push(category);
    },

    UPDATE_CATEGORY(state, updatedCategory) {
      const index = state.categories.data.findIndex(
        (category) => category.id === updatedCategory.id
      );
      if (index !== -1) {
        state.categories.data.splice(index, 1, updatedCategory);
      }
    },
    DELETE_CATEGORY(state, categoryId) {
      if (Array.isArray(state.categories.data)) {
        state.categories.data = state.categories.data.filter(
          (category) => category.id !== categoryId
        );
      }
    },
    SET_GROUPES(state, groupes) {
      state.groupes = groupes;
    },
    SET_GROUPE_IDS(state, groupeIds) {
      state.groupeIds = groupeIds;
    },
    SET_CONTROLES(state, controles) {
      state.controles = controles;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_CACHED_USER(state, user) {
      state.cachedUser = user;
    },

    SET_ROLES(state, roles) {
      state.roles = roles;
    },
    CLEAR_CACHED_ROLES(state) {
      state.cachedRoles = [];
    },
  },
  actions: {
    savePlanifications({ state }) {
      const planificationsData = state.selectedCells.reduce((acc, cell) => {
        const existingPlan = acc.find(
          (plan) => plan.controle_id === cell.controle_id
        );

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

      axios
        .post("http://localhost:8000/api/planification", planificationsData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((response) => {
          console.log("response.data", response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async fetchPermissionsUSER({ commit }) {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/permissions",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        console.log("2025 ", store.state.accessToken);
        console.log("response.data ood", response.data.permissions);

        commit("SET_PERMISSIONS", response.data.permissions);
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    },
    async updateDateRealized({ commit }, { planificationId, payload }) {
      try {
        const response = await axios.patch(
          `http://localhost:8000/api/planification/${planificationId}/date-realized`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        commit("UPDATE_DATE_REALIZED", {
          planificationId,
          date_realized: payload.date_realized,
        });
      } catch (error) {
        console.error(
          "API Error:",
          error.response ? error.response.data : error.message
        );
      }
    },
    async addPalierParameter({ commit }, parameter) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/realization",
          parameter,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        commit("ADD_PARAMETER", response.data);
      } catch (error) {
        console.error("API Error:", error);
      }
    },

    async fetchPaliers({ commit }) {
      try {
        const response = await axios.get("http://localhost:8000/api/paliers", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        commit("SET_PALIERS", response.data);
      } catch (error) {
        console.error("API Error:", error);
      }
    },

    async addPermission({ commit }, permission) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/permission",
          permission,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        commit("ADD_PERMISSION", response.data.data);
      } catch (error) {
        console.error("Error adding permission:", error);
      }
    },
    async updatePermission({ commit }, permission) {
      try {
        const response = await axios.put(
          `http://localhost:8000/api/permission/${permission.id}`,
          permission,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        commit("UPDATE_PERMISSION", response.data.data);
      } catch (error) {
        console.error("Error updating permission:", error);
      }
    },
    async deletePermission({ commit }, permissionId) {
      try {
        await axios.delete(
          `http://localhost:8000/api/permissions/${permissionId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        commit("DELETE_PERMISSION", permissionId);
      } catch (error) {
        console.error("Error deleting permission:", error);
      }
    },

    async givePermissionToRole({ commit, dispatch }, { roleId, permissions }) {
      try {
        const response = await axios.put(
          `http://localhost:8000/api/roles/${roleId}/give-permissions`,
          { permission: permissions },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        commit("SET_CACHED_PERMISSIONS", { roleId, data: response.data.data });
        await dispatch("fetchPermissions", roleId); // Fetch the updated permissions
      } catch (error) {
        console.error("Error updating role permissions:", error);
      }
    },
    handleNotification({ commit }, message) {
      commit("ADD_NOTIFICATION", {
        title: "New Notification",
        details: message,
        time: new Date().toLocaleString(),
        route: "#", // You can customize this based on the notification type
      });
    },
    clearNotifying({ commit }) {
      commit("CLEAR_NOTIFYING");
    },
    async login({ commit, dispatch }, credentials) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/login",
          credentials
        );
        const accessToken = response.data.access_token;
        const Permissions = response.data.permissions;
        const name_user = response.data.name;
        const user_id = response.data.id;
        localStorage.setItem("permissions", JSON.stringify(Permissions));
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("name", name_user);
        localStorage.setItem("id", user_id);
        // localStorage.setItem("permissions", Permissions);

        console.log("20278 ", typeof response.data.permissions);

        commit("SET_ACCESS_TOKEN", accessToken);
        commit("SET_NAME", name_user);
        commit("SET_ID", user_id);
        commit("SET_USER_DATA", response.data);
        //   dispatch("handleNotification", "User logged in successfully");
        //console.log("handleNotification", response.data.message);
      } catch (error) {
        console.error("Error logging in:", error);
      }
    },

    async fetchUser({ state }, userId) {
      try {
        const user = state.users.find((user) => user.id === parseInt(userId));
        if (user) return user;
        const response = await axios.get(
          `http://localhost:8000/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        return response.data.user;
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    },
    async fetchRoles({ commit, state }) {
      try {
        if (state.cachedRoles.length > 0) {
          return state.cachedRoles;
        }
        const response = await axios.get("http://localhost:8000/api/roles", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        const roles = response.data.roles.map((role) => role.name);
        commit("SET_ROLES", roles);
        commit("SET_CACHED_ROLES", roles);
        return roles;
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    },

    async fetchPermissions({ commit }, roleId) {
      try {
        const permissionsResponse = await axios.get(
          `http://localhost:8000/api/roles/${roleId}/give-permissions`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        );
        const permissionsData = permissionsResponse.data;
        const data = {
          role: permissionsData.role || {},
          permissions: permissionsData.permissions || [],
          rolePermissions: permissionsData.rolePermissions || {},
        };
        commit("SET_CACHED_PERMISSIONS", { roleId, data });
        return data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchUsers({ commit }) {
      // Check if the users' data is already present and not outdated
      if (
        this.state.users.length &&
        Date.now() - this.state.lastFetchTime < this.state.fetchInterval
      ) {
        return this.state.users;
      }
      try {
        const response = await axios.get("http://localhost:8000/api/users", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        });
        const usersWithRoles = response.data.users;
        commit("SET_USERS", usersWithRoles);
        return usersWithRoles;
      } catch (error) {
        console.error(error);
      }
    },
    async updateUser({ commit }, userData) {
      try {
        const response = await axios.put(
          `http://localhost:8000/api/users/${userData.id}`,
          userData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        return response.data.user;
      } catch (error) {
        console.error("Error updating user:", error);
      }
    },

    async addCategory({ commit }, categoryData) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/add-category",
          categoryData,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        );
        const newCategory = response.data.data;
        console.log("ddd", response.data);
        commit("ADD_CATEGORY", newCategory);
      } catch (error) {
        console.error("Error adding category:", error);
      }
    },
    async updateCategory({ commit }, categoryData) {
      try {
        if (!categoryData.id) {
          console.error("Category ID is missing or undefined");
          return;
        }

        const response = await axios.put(
          `http://localhost:8000/api/update-category/${categoryData.id}`,
          categoryData,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        );
        const updatedCategory = response.data.data;
        commit("UPDATE_CATEGORY", updatedCategory);
      } catch (error) {
        console.error("Error updating category:", error);
      }
    },
    async deleteCategory({ commit }, categoryId) {
      try {
        await axios.delete(
          `http://localhost:8000/api/categories/delete/${categoryId}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        );
        commit("DELETE_CATEGORY", categoryId);
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    },
    async fetchGroupes({ commit }) {
      try {
        const response = await axios.get("http://localhost:8000/api/groupes", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        });

        // Extract the categories array from the response
        const { groupes } = response.data;

        // Commit the categories array to the Vuex state
        commit("SET_GROUPES", groupes);

        // Map the categories to extract groupeIds
        const groupeIds = groupes.map((groupe) => groupe.id);
        commit("SET_GROUPE_IDS", groupeIds);
      } catch (error) {
        console.error("Error fetching groupes:", error);
      }
    },
    async createControle({ commit }, controleData) {
      // Create a new controle
      const response = await axios.post(
        "http://localhost:8000/api/controle",
        controleData,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
      console.log("poo ", response.data.data);
      commit("ADD_CONTROLE", response.data.data);
    },

    async fetchControles({ commit }) {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/controles",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        );
        const controles = response.data;
        console.log("abr ", response.data);
        commit("SET_CONTROLES", controles);
      } catch (error) {
        console.error(error);
      }
    },

    async fetchAllCategories({ commit }) {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/categories",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        );
        const allCategories = response.data;
        console.log("abs ", allCategories);
        commit("SET_ALLCATEGORIES", allCategories);

        // Extract designations from categories and set in state
        const designations = allCategories.map(
          (category) => category.designation
        );
        commit("SET_DESIGNATIONS", designations);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    async fetchCategories({ commit }, payload = { page: 1 }) {
      const { page } = payload;
      try {
        const response = await axios.get(
          `http://localhost:8000/api/categories/paginate?page=${page}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        );
        commit("SET_CATEGORIES", response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
  },
  getters: {
    getCategories(state) {
      return state.allCategories;
    },
    getUser(state) {
      return state.user;
    },
    getUserRoles(state) {
      return state.roles;
    },
    getUserPermissions(state) {
      return state.permissions;
    },
    permissionsuser(state) {
      return state.permissionsuser;
    },
    hasPermission: (state) => (permission) => {
      return state.permissions.includes(permission);
    },
    getNotifications: (state) => state.notifications,
    isNotifying: (state) => state.notifying,
  },
});

export default store;
