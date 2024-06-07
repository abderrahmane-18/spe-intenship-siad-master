<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue";
import Dashboard from "@/views/Dashboard.vue";

const route = useRoute();
const store = useStore();
const toast = useToast();
const roleId = ref(null);
const permissions = ref([]);
const rolePermissions = ref([]);
const roleName = ref("");
const pageTitle = ref("Add/Edit Role Permissions");

const fetchData = async () => {
  try {
    roleId.value = route.params.roleId;
    const permissionsData = await store.dispatch(
      "fetchPermissions",
      roleId.value
    );
    roleName.value = permissionsData.role ? permissionsData.role.name : "";
    permissions.value = permissionsData.permissions || [];
    rolePermissions.value = permissionsData.rolePermissions
      ? Object.keys(permissionsData.rolePermissions).map(Number)
      : [];
  } catch (error) {
    console.error(error);
  }
};

const updateRolePermissions = async () => {
  try {
    await store.dispatch("givePermissionToRole", {
      roleId: roleId.value,
      permissions: rolePermissions.value,
    });
    // Fetch the updated permissions
    await fetchData();
    toast.success("Permissions updated successfully", {
      timeout: 2000,
      hideProgressBar: true,
    });
  } catch (error) {
    console.error(error);
    toast.error("Failed to update permissions", {
      timeout: 2000,
      hideProgressBar: true,
    });
  }
};

onMounted(fetchData);
</script>

<template>
  <Dashboard>
    <div class="mx-auto max-w-270">
      <BreadcrumbDefault :pageTitle="pageTitle" />
      <div class="container mt-5">
        <div class="grid grid-cols-1">
          <div class="col-span-1">
            <div class="rounded-lg py-5 px-6 mb-4 text-green-700"></div>
            <div class="bg-white shadow-md rounded-lg">
              <div
                class="px-6 py-4 border-b border-gray-200 flex justify-between items-center"
              >
                <span class="text-gray-800 font-bold"
                  >Role: <span class="font-normal">{{ roleName }}</span></span
                >
                <router-link
                  to="/profile/roles"
                  class="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded"
                  >Back</router-link
                >
              </div>
              <div class="p-6">
                <form>
                  <div class="mb-4">
                    <span class="text-red-500"></span>
                    <label for="" class="block text-gray-700 font-bold mb-2"
                      >Permissions</label
                    >
                    <div class="grid grid-cols-4 gap-4">
                      <div
                        class="col-span-1"
                        v-for="permission in permissions"
                        :key="permission.id"
                      >
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
                </form>
              </div>
              <div
                class="px-6 py-4 bg-gray-100 rounded-b-lg flex justify-between"
              >
                <button
                  class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                  @click.prevent="updateRolePermissions"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Dashboard>
</template>
