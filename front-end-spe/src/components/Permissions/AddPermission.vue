<!-- AddPermission.vue -->
<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue";
import Dashboard from "@/views/Dashboard.vue";
const pageTitle = ref("Permissions ");
const name = ref("");

const addPermission = () => {
  store.dispatch("addPermission", { name: name.value }).then(() => {
    router.push("/profile/permissions");
  });
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
                <h4 class="m-0 font-bold">Add Permission</h4>
              </div>
              <div class="p-4">
                <form @submit.prevent="addPermission">
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
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Add Permission
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
