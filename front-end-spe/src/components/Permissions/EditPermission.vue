<!-- EditPermission.vue -->
<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue";
import Dashboard from "@/views/Dashboard.vue";
const pageTitle = ref("Permissions ");

const store = useStore();
const router = useRouter();
const route = useRoute();
const name = ref("");

const permissionId = ref(route.params.id_permission);
//const permission_val = ref([]);

async function fetchAndSetPermissionName() {
  // Fetch permissions if not already loaded
  if (!store.getters.permissionsuser.length) {
    console.log("Fetching permissions...");
    await store.dispatch("fetchPermissionsUSER");
  }

  const permissions = store.getters.permissionsuser;
  console.log("permissionsuser from store:", permissions);
  console.log(
    "permissionId:",
    permissionId.value,
    "type:",
    typeof permissionId.value
  );

  // Convert permissionId to number if necessary
  const permission_val = permissions.find((p) => p.id == permissionId.value);

  if (permission_val) {
    console.log("Permission found:", permission_val);
    name.value = permission_val.name;
  } else {
    console.error(
      "Permission not found. Make sure permissionId and permissionsuser are correct."
    );
  }

  console.log("permission_val:", permission_val);
}
onMounted(() => {
  fetchAndSetPermissionName();
});

const editPermission = async () => {
  await store.dispatch("updatePermission", {
    id: permissionId.value,
    name: name.value,
  });
  router.push("/profile/permissions");
};
</script>

<template>
  <Dashboard>
    <div class="mx-auto max-w-7xl">
      <BreadcrumbDefault :pageTitle="pageTitle" />
      <div class="container mt-5">
        <div class="row">
          <div class="col-md-12">
            <div class="mt-3 bg-white shadow-md rounded-lg overflow-hidden">
              <div
                class="flex justify-between items-center px-4 py-3 bg-gray-200"
              >
                <h4 class="m-0 font-bold">Edit Permission</h4>
              </div>
              <div class="p-4">
                <form @submit.prevent="editPermission">
                  <div class="mb-4">
                    <label
                      for="name"
                      class="block text-gray-700 text-sm font-bold mb-2"
                      >Permission Name</label
                    >
                    <input
                      v-model="name"
                      type="text"
                      id="name"
                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Update Permission
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Dashboard>
</template>
