<!-- UserList.vue -->
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
            <h4 class="m-0 font-bold">Users</h4>
            <a
              href="#"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >Add User</a
            >
          </div>
          <div class="p-4">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-200">
                  <th class="border px-4 py-2">Id</th>
                  <th class="border px-4 py-2">Name</th>
                  <th class="border px-4 py-2">Email</th>
                  <th class="border px-4 py-2">Roles</th>
                  <th class="border px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user.id">
                  <td class="border px-4 py-2">{{ user.id }}</td>
                  <td class="border px-4 py-2">{{ user.name }}</td>
                  <td class="border px-4 py-2">{{ user.email }}</td>
                  <td class="border px-4 py-2">
                    <span v-if="user.roles && user.roles.length">{{
                      user.roles.join(", ")
                    }}</span>
                    <span v-else>No roles</span>
                  </td>
                  <td class="border px-4 py-2 flex">
                    <router-link
                      :to="{ name: 'editUser', params: { id_user: user.id } }"
                      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-1"
                      >Edit</router-link
                    >
                    <a
                      href="#"
                      class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                      >Delete</a
                    >
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

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const users = ref([]);

const getUsers = async () => {
  try {
    const fetchedUsers = await store.dispatch("fetchUsers");
    console.log("Fetched users:", fetchedUsers);
    users.value = fetchedUsers;
  } catch (error) {
    console.error(error);
  }
};

onMounted(getUsers);
</script>
