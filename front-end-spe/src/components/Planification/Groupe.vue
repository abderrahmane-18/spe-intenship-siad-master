<script setup>
import PermissionList from "@/components/PermissionList.vue";
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue";
import Dashboard from "@/views/Dashboard.vue";
const pageTitle = ref("Groupes ");

import createRole from "@/components/Roles/createRole.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed, inject } from "vue";
const store = useStore();

store.dispatch("fetchGroupes");

const groupes = computed(() => store.state.groupes);
// Inject the groupes computed property from parent component
</script>

<template>
  <Dashboard>
    <div class="mx-auto max-w-7xl">
      <BreadcrumbDefault :pageTitle="pageTitle" />
      <div class="flex flex-col">
        <div class="overflow-x-auto">
          <div class="align-middle inline-block min-w-full">
            <div
              class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
            >
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Start Date
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr
                    v-for="groupe in groupes"
                    :key="groupe.id"
                    class="hover:bg-gray-100"
                  >
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      {{ groupe.id }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ groupe.start_date }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        class="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Edit
                      </button>
                      <button
                        class="inline-flex items-center px-3 py-2 ml-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!--  Groupe UI
  <div class="container mx-auto py-8">
    <div class="bg-white rounded-lg shadow-lg p-6">
      <div class="flex justify-between mb-4">
        <div class="w-1/3">
          <label class="block font-bold mb-2">Choisir le mois</label>
          <select class="w-full border border-gray-300 rounded-md px-3 py-2">
            <option>January</option>
            <option>February</option>
        
          </select>
        </div>
        <div class="w-1/3">
          <label class="block font-bold mb-2">Choisir l'essai</label>
          <select class="w-full border border-gray-300 rounded-md px-3 py-2">
            <option>Essai 1</option>
            <option>Essai 2</option>
       
          </select>
        </div>
      </div>
      <div class="grid grid-cols-4 gap-4 mb-4">
        <div class="font-bold">Programmé</div>
        <div class="text-center font-bold">G1</div>
        <div class="text-center font-bold">G2</div>
        <div class="text-center font-bold">G3</div>
        <div class="font-bold">Date Realisation Essai</div>
        <div class="bg-black text-white px-4 py-2 rounded">Oui</div>
        <div class="bg-green-500 text-white px-4 py-2 rounded"></div>
        <div class="bg-red-500 text-white px-4 py-2 rounded"></div>
        <div class="font-bold">Date Realisation Essai</div>
        <div class="bg-black text-white px-4 py-2 rounded">Non</div>
        <div class="bg-green-500 text-white px-4 py-2 rounded"></div>
        <div class="bg-green-500 text-white px-4 py-2 rounded"></div>
      </div>
      <div class="mt-4 flex justify-end">
        <div class="mr-4 flex items-center">
          <div class="w-4 h-4 bg-black rounded-full mr-2"></div>
          <span>Essai non réaliser</span>
        </div>
        <div class="mr-4 flex items-center">
          <div class="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
          <span>Essai réaliser avec problème</span>
        </div>
        <div class="flex items-center">
          <div class="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
          <span>Essai réaliser sans problème</span>
        </div>
      </div>
    </div>
  </div>
  -->
      <!-- 
  <div class="flex flex-col">
    <div class="overflow-x-auto">
      <div class="align-middle inline-block min-w-full">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Date
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="groupe in groupes" :key="groupe.id" class="hover:bg-gray-100">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ groupe.id }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ groupe.start_date }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    class="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Edit
                  </button>
                  <button
                    class="inline-flex items-center px-3 py-2 ml-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  -->
    </div>
  </Dashboard>
</template>
