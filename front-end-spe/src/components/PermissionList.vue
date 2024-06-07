<!-- PermissionList.vue -->
<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const permissions = computed(() => store.getters.permissionsuser);
onMounted(() => {
  console.log("permissions", store.getters.permissionsuser);
  store.dispatch("fetchPermissionsUSER");
});
const addPermission = () => {
  router.push("/add-permission");
};

const deletePermission = async (id) => {
  if (confirm("Are you sure you want to delete this permission?")) {
    await store.dispatch("deletePermission", id);
  }
};
</script>

<template>
  <div class="container mt-5 flex">
    <router-link
      to="/profile/roles"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-1"
      >Roles</router-link
    >
    <router-link
      to="/profile/permissions"
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
          <div class="flex justify-between items-center px-4 py-3 bg-gray-200">
            <h4 class="m-0 font-bold">Permissions</h4>

            <router-link
              to="/profile/permissions/add-permission"
              class="bg-cyan-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Permission</router-link
            >
          </div>
          <div class="p-4">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-200">
                  <th class="border px-4 py-2">Id</th>
                  <th class="border px-4 py-2">Name</th>
                  <th class="border px-4 py-2 w-2/5">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="permission in permissions" :key="permission.id">
                  <td class="border px-4 py-2">{{ permission.id }}</td>
                  <td class="border px-4 py-2">{{ permission.name }}</td>
                  <td class="border px-4 py-2 flex">
                    <router-link
                      :to="{
                        name: 'EditPermission',
                        params: { id_permission: permission.id },
                      }"
                      class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                    >
                      Edit
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
</template>
