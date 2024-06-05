<!--RolesList.vue-->
<script setup>
import PermissionList from "@/components/PermissionList.vue";
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue";
import Dashboard from "@/views/Dashboard.vue";
const pageTitle = ref("Roles ");
import axios from "axios";
import createRole from "@/components/Roles/createRole.vue";
import { ref, onMounted } from "vue";
const roles = ref([]);

const roles_id = ref();
const roles_name = ref();

const getRoles = async () => {
  try {
    // Check if the roles data is in the local storage
    const cachedRoles = localStorage.getItem("roles");
    if (cachedRoles) {
      roles.value = JSON.parse(cachedRoles);
      return;
    }

    const response = await axios.get(`http://localhost:8000/api/roles`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
      params: {
        roles_id: roles_id.value,
        roles_name: roles_name.value,
      },
    });

    // Update roles with the response data and store it in the local storage
    roles.value = response.data.roles;
    localStorage.setItem("roles", JSON.stringify(roles.value));
  } catch (error) {
    console.error(error);
  }
};

// Call getRoles when the component is mounted
onMounted(getRoles);
</script>

<template>
  <head> </head>
  <Dashboard>
    <div class="mx-auto max-w-270">
      <!-- Breadcrumb Start -->
      <BreadcrumbDefault :pageTitle="pageTitle" />

      <div class="container mt-5 flex">
        <router-link
          to="/profile/roles"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-1"
          >Roles</router-link
        >

        <router-link
          to="/profile/permission"
          class="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded mx-1"
          >Permissions</router-link
        >

        <router-link
          to="/profile/users"
          class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mx-1"
          >Users</router-link
        >
      </div>
      <div class="container mt-2">
        <div class="row">
          <div class="col-md-12">
            <div class="mt-3 bg-white shadow-md rounded-lg overflow-hidden">
              <div
                class="flex justify-between items-center px-4 py-3 bg-gray-200"
              >
                <h4 class="m-0 font-bold">Roles</h4>

                <router-link
                  to="/profile/roles/create"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >Add Roles</router-link
                >
              </div>
              <div class="p-4">
                <table class="w-full border-collapse">
                  <thead>
                    <tr class="bg-gray-200">
                      <th class="border px-4 py-2 w-1/4">Id</th>
                      <th class="border px-4 py-2 w-1/3">Name</th>
                      <th class="border px-4 py-2 w-2/6">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="role in roles" :key="role.id">
                      <td class="border px-4 py-2">{{ role.id }}</td>
                      <td class="border px-4 py-2">{{ role.name }}</td>
                      <td class="border px-4 py-2 flex">
                        <router-link
                          :to="{
                            name: 'addPermissionRole',
                            params: { roleId: role.id },
                          }"
                          class="focus:outline-none text-white bg-cyan-500 hover:bg-cyan-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                          >Add / Edit Role Permission</router-link
                        >
                        <a
                          href="#"
                          class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                          >Edit</a
                        >
                        <router-link
                          to="/profile/roles/add-permission"
                          class="focus:outline-none text-white bg-yellow-500 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                          >Delete
                        </router-link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Dashboard>
</template>
