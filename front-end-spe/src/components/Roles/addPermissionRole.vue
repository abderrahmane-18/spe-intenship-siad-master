<script setup>
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import Dashboard from '@/views/Dashboard.vue'
const pageTitle = ref('Roles ')
import createRole from '@/components/Roles/createRole.vue'
import { ref, onMounted } from 'vue';
import axios from 'axios';
const permissions = ref([]);
const rolePermissions = ref([]);

const fetchPermissions = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/roles/1/give-permissions`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      },
    });
    const data = response.data;
    permissions.value = data.permissions;
    rolePermissions.value = Object.keys(data.rolePermissions).map(Number);
  } catch (error) {
    console.error(error);
  }
};

onMounted(fetchPermissions);
</script>

<template>
  <Dashboard>
    <div class="mx-auto max-w-270">
      <!-- Breadcrumb Start -->
      <BreadcrumbDefault :pageTitle="pageTitle" />
      <div class="container mt-5">
        <div class="grid grid-cols-1">
          <div class="col-span-1">
            <div class="bg-green-100 rounded-lg py-5 px-6 mb-4 text-green-700">
              <!-- Alert content goes here -->
            </div>
            <div class="bg-white shadow-md rounded-lg">
              <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h4 class="text-lg font-bold">
                  Role :
                  <a href="" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">Back</a>
                </h4>
              </div>
              <div class="p-6">
                <form action="" method="POST">
                  <div class="mb-4">
                    <span class="text-red-500"></span>
                    <label for="" class="block text-gray-700 font-bold mb-2">Permissions</label>
                    <div class="grid grid-cols-4 gap-4">
                      <div class="col-span-1" v-for="permission in permissions" :key="permission.id">
                        <label class="inline-flex items-center">
                          <input
                            type="checkbox"
                            name="permission[]"
                            :value="permission.id"
                            class="form-checkbox h-5 w-5 text-green-600"
                            v-model="rolePermissions"
                          />
                          <span class="ml-2">{{ permission.name }}</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="mb-4 flex justify-end">
                    <button type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Dashboard>
</template>