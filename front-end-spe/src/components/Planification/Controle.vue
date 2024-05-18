<template>
  <Dashboard>
    <!-- Component Template -->
    <div class="mx-auto max-w-270">
      <div class="mx-auto max-w-7xl">
        <BreadcrumbDefault :pageTitle="pageTitle" />
        <div class="container mx-auto py-8">
          <div class="overflow-x-auto">
            <div class="align-middle inline-block min-w-full">
              <div
                class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
              >
                <div class="flex items-center sm:justify-end w-full">
                  <button
                    @click="toggleModal"
                    class="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center"
                  >
                    <svg
                      class="-ml-1 mr-2 h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Add Controle
                  </button>
                </div>
                <div
                  v-if="showModal"
                  class="fixed z-10 inset-0 overflow-y-auto"
                  aria-labelledby="modal-title"
                  role="dialog"
                  aria-modal="true"
                >
                  <div
                    class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
                  >
                    <div
                      class="fixed inset-0 bg-gray bg-opacity-75 transition-opacity"
                      aria-hidden="true"
                    ></div>
                    <span
                      class="hidden sm:inline-block sm:align-middle sm:h-screen"
                      aria-hidden="true"
                      >&#8203;</span
                    >
                    <div
                      class="inline-block align-bottom bg-gray rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    >
                      <div class="bg-gray px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                          <div
                            class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"
                          >
                            <button
                              @click="toggleModal"
                              type="button"
                              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                            >
                              <svg
                                class="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                            </button>
                            <h3
                              class="text-lg leading-6 font-medium text-gray-900"
                              id="modal-title"
                            >
                              Add Controle
                            </h3>
                            <div class="mt-2">
                              <form @submit.prevent="submitForm">
                                <div class="mb-4">
                                  <label
                                    for="id_categorie"
                                    class="block text-gray-700 font-bold mb-2"
                                    >Category</label
                                  >
                                  <select
                                    v-model="formData.id_categorie"
                                    id="id_categorie"
                                    required
                                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  >
                                    <option value="">Select a category</option>
                                    <option
                                      v-for="category in categories"
                                      :key="category.id"
                                      :value="category.id"
                                    >
                                      {{ category.id }}
                                    </option>
                                  </select>
                                </div>
                                <div class="mb-4">
                                  <label
                                    for="number_group"
                                    class="block text-gray-700 font-bold mb-2"
                                    >Group</label
                                  >
                                  <select
                                    v-model="formData.number_group"
                                    id="number_group"
                                    required
                                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  >
                                    <option value="">Select a group</option>
                                    <option
                                      v-for="group in groups"
                                      :key="group.id"
                                      :value="group.id"
                                    >
                                      {{ group.id }}
                                    </option>
                                  </select>
                                </div>
                                <div class="mb-4">
                                  <label
                                    for="number_equip"
                                    class="block text-gray-700 font-bold mb-2"
                                    >Number Equip</label
                                  >
                                  <input
                                    v-model="formData.number_equip"
                                    id="number_equip"
                                    required
                                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  />
                                </div>
                                <div
                                  class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
                                >
                                  <button
                                    type="submit"
                                    class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                                  >
                                    Save
                                  </button>
                                  <button
                                    @click="toggleModal"
                                    type="button"
                                    class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                        id_categorie
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        number_group
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        number_equip
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
                      v-for="controle in controles"
                      :key="controle.id"
                      class="hover:bg-gray-100"
                    >
                      <td
                        class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                      >
                        {{ controle.id }}
                      </td>
                      <td
                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {{ controle.id_categorie }}
                      </td>
                      <td
                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {{ controle.number_group }}
                      </td>
                      <td
                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {{ controle.number_equip }}
                      </td>
                      <td
                        class="px-6 py-4 whitespace-nowrap text-sm font-medium"
                      >
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
      </div>
    </div>
  </Dashboard>
</template>

<script setup>
import Dashboard from "@/views/Dashboard.vue";
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue";
import { ref, onMounted } from "vue";
import { computed } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const showModal = ref(false);
const formData = ref({
  id_categorie: "",
  number_group: "",
  number_equip: "",
});
const pageTitle = ref("Controle");

import { useStore } from "vuex";
const store = useStore();

const controles = computed(() => store.state.controles);
const categories = computed(() => store.getters.getCategories);
const groups = computed(() => store.state.groupes);

function toggleModal() {
  showModal.value = !showModal.value;
}
async function submitForm() {
  try {
    await store.dispatch("createControle", formData.value);
    // Reset form data
    formData.value = {
      id_categorie: "",
      number_group: "",
      number_equip: "",
    };
    // Show success toast
    toast.success("Controle created successfully", {
      position: "top-center",
    });
  } catch (error) {
    // Check if the error is due to duplicate entry
    if (error.response && error.response.status === 422) {
      const errorMessage = error.response.data.message;
      // Show orange toast for duplicate entry
      toast.warning(errorMessage, {
        position: "top-center",
      });
    } else {
      // Show generic error toast for other errors
      toast.error("An error occurred while creating the controle", {
        position: "top-center",
      });
    }
  }
}
onMounted(() => {
  store.dispatch("fetchControles");
  store.dispatch("fetchAllCategories");
  store.dispatch("fetchGroupes");
});
</script>
