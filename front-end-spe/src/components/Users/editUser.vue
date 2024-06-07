<template>
  <Dashboard>
    <div class="mx-auto max-w-7xl">
      <BreadcrumbDefault :pageTitle="pageTitle" />
      <div class="p-4">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Edit User</h2>
          <router-link
            to="/profile/users"
            class="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded"
            >Back</router-link
          >
        </div>
        <div class="bg-white shadow-md rounded-lg">
          <div class="p-4">
            <div class="mb-4">
              <label for="name" class="block text-sm font-medium text-gray-700"
                >Name</label
              >
              <input
                v-model="name"
                type="text"
                id="name"
                class="mt-1 block w-full rounded-md bg-gray-100 border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div class="mb-4">
              <label for="email" class="block text-sm font-medium text-gray-700"
                >Email</label
              >
              <input
                v-model="email"
                type="email"
                id="email"
                readonly
                class="mt-1 block w-full rounded-md bg-gray-100 border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div class="mb-4">
              <label for="role" class="block text-sm font-medium text-gray-700"
                >Roles</label
              >
              <select
                v-model="selectedRoles"
                id="role"
                multiple
                class="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 p-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option v-for="role in roles" :key="role" :value="role">
                  {{ role }}
                </option>
              </select>
            </div>
            <div class="mb-4">
              <button
                type="button"
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                @click="updateUser"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Dashboard>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue";
import Dashboard from "@/views/Dashboard.vue";

const pageTitle = ref("Edit User");
const route = useRoute();
const router = useRouter();
const store = useStore();

const userId = route.params.id_user;
const name = ref("");
const email = ref("");
const selectedRoles = ref([]);
const roles = ref([]);

const fetchUser = async () => {
  try {
    const user = await store.dispatch("fetchUser", userId);
    if (user) {
      name.value = user.name || "";
      email.value = user.email || "";
      selectedRoles.value = user.roles; // Ensure roles are mapped correctly
      console.log("Fetched user:", user);
    } else {
      console.warn("User data is undefined");
    }
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

const fetchRoles = async () => {
  try {
    roles.value = await store.dispatch("fetchRoles");
    console.log("Fetched roles:", roles.value);
  } catch (error) {
    console.error("Error fetching roles:", error);
  }
};

const updateUser = async () => {
  try {
    const userData = {
      id: userId,
      name: name.value,
      email: email.value,
      roles: selectedRoles.value, // Ensure roles are updated correctly
    };
    console.log("Updating user with data:", userData);
    await store.dispatch("updateUser", userData);
    store.commit("CLEAR_CACHED_ROLES");
    router.push({ name: "users" }); // Navigate to users list
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchUser();
  fetchRoles();
});
</script>
