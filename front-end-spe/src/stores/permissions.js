import { defineStore } from 'pinia'
import axios from 'axios'

export const usePermissionsStore = defineStore('permissions', {
  state: () => ({
    cachedPermissions: {},
  }),
  actions: {
    async fetchPermissions(roleId) {
      const cachedData = this.cachedPermissions[roleId]
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

        this.cachedPermissions[roleId] = data
        return data
      } catch (error) {
        console.error(error)
      }
    },
  },
})