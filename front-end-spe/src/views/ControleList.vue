<!--ControleList.vue-->
<script setup>
import { useStore, mapState } from "vuex";

const store = useStore();
import { defineComponent } from "vue";

import { TailwindPagination } from "laravel-vue-pagination";

import { ref, computed, onMounted } from "vue";
import Dashboard from "@/views/Dashboard.vue";
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue";
import axios from "axios";
import controleModel from "@/components/Controles/controleModel.vue";
import deleteModel from "@/components/Controles/deleteModel.vue";
import { watch } from "vue";

const pageTitle = ref("Controles");
const showAddModal = ref(false);

const showEditModal = ref(false);
const editingCategory = ref(null);
const searchQuery = ref(null);

import RenderlessPagination from "laravel-vue-pagination/src/RenderlessPagination.vue";

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  limit: {
    type: Number,
    default: 0,
  },
  keepLength: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["pagination-change-page"]);

const onPaginationChangePage = (page) => {
  emit("pagination-change-page", page);
};

//const categories = ref([]);
const categories = computed(() => store.state.categories);

const getCategories = async (page = 1) => {
  try {
    await store.dispatch("fetchCategories", { page });
    // categories.value = store.state.categories // no need to update categories.value here
    console.log("cat : ", categories.value);
  } catch (error) {
    console.error(error);
  }
};
const addCategory = async (categoryData) => {
  console.log("ch", categoryData);
  try {
    await store.dispatch("addCategory", categoryData);

    // Close modal or do any other action after successful addition
    showAddModal.value = false;
  } catch (error) {
    console.error("Error adding category:", error);
  }
};
onMounted(getCategories);

const openEditModal = (category) => {
  console.log("er");
  editingCategory.value = category;
  showEditModal.value = true;
};
const showDeleteModal = ref(false);
const deletingCategory = ref(null);

const openDeleteModal = (category) => {
  deletingCategory.value = category;
  showDeleteModal.value = true;
};

const deleteCategory = async (category) => {
  try {
    // Remove the category from the local categories array
    categories.value = categories.value.filter((c) => c.id !== category.id);

    // Dispatch the deleteCategory action to the Vuex store
    await store.dispatch("deleteCategory", category.id);
    console.log("yt");
    // Close the delete modal

    showDeleteModal.value = false;
  } catch (error) {
    console.error("Error deleting category:", error);
    // Optionally, you can add the category back to the categories array if the deletion fails
  }
};
const updateCategory = async (categoryData) => {
  try {
    await store.dispatch("updateCategory", categoryData);
    showEditModal.value = false;
  } catch (error) {
    console.error("Error updating category:", error);
  }
};

const currentPage = computed(() => store.state.pagination?.currentPage || 1);
const totalCategories = computed(
  () => store.state.pagination?.totalCategories || 0
);
const lastPage = computed(() => store.state.pagination?.lastPage || 1);

const startIndex = computed(() => (currentPage.value - 1) * 10 + 1);
const endIndex = computed(() =>
  Math.min(startIndex.value + 9, totalCategories.value)
);

const goToNextPage = () => {
  if (currentPage.value < lastPage.value) {
    store.commit("SET_CURRENT_PAGE", currentPage.value + 1);
    store.dispatch("fetchCategories");
  }
};

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    store.commit("SET_CURRENT_PAGE", currentPage.value - 1);
    store.dispatch("fetchCategories");
  }
};
</script>

<template>
  <Dashboard>
    <div class="mx-auto max-w-270">
      <!-- Breadcrumb Start -->
      <BreadcrumbDefault :pageTitle="pageTitle" />
      <div
        class="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5"
      >
        <div class="mb-1 w-full">
          <div
            class="block sm:flex items-center md:divide-x md:divide-gray-100"
          >
            <form class="sm:pr-3 mb-4 sm:mb-0" action="#" method="GET">
              <label for="products-search" class="sr-only">Search</label>
              <div class="mt-1 relative sm:w-64 xl:w-96">
                <input
                  type="text"
                  name="email"
                  id="products-search"
                  v-model="searchQuery"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Search for products"
                />
              </div>
            </form>
            <div class="flex items-center sm:justify-end w-full">
              <button
                @click="showAddModal = true"
                class="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center sm:ml-auto"
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
                Add Category
              </button>

              <controleModel
                :showModal="showAddModal"
                modalTitle="Add category"
                modalButtonText="Add category"
                @close="showAddModal = false"
                @addCategory="addCategory"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col">
        <div>
          <div class="align-middle inline-block min-w-full">
            <div class="shadow overflow-hidden border-l border-black">
              <table class="table-fixed min-w-full divide-y divide-black">
                <thead class="bg-gray-600" id="thead1">
                  <tr>
                    <th
                      scope="col"
                      class="w-3/5 p-4 text-left text-xs font-medium text-gray-500 uppercase border-r border-black"
                    >
                      Designation
                    </th>
                    <th
                      scope="col"
                      class="w-2/5 p-4 text-left text-xs font-medium text-gray-500 uppercase border-r border-black"
                    >
                      Codification
                    </th>
                    <th
                      scope="col"
                      class="w-1/6 p-4 text-left text-xs font-medium text-gray-500 uppercase border-r border-black"
                    >
                      frequency
                    </th>
                    <th
                      scope="col"
                      class="w-1/5 p-4 text-left text-xs font-medium text-gray-500 uppercase border-l border-r border-black"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-black">
                  <tr
                    v-for="category in categories.data"
                    :key="category.id"
                    class="hover:bg-gray-100"
                  >
                    <td
                      class="p-4 whitespace-nowrap text-sm font-normal text-gray-500 border-r border-black"
                    >
                      <div class="text-base font-semibold text-gray-900">
                        {{ category.designation }}
                      </div>
                    </td>
                    <td
                      class="p-4 whitespace-nowrap text-base font-medium text-gray-900 border-r border-black"
                    >
                      {{ category.codification }}
                    </td>
                    <td
                      class="p-4 whitespace-nowrap text-base font-medium text-gray-900 border-r border-black"
                    >
                      {{ category.frequency_RPM }}
                    </td>
                    <td
                      class="p-4 whitespace-nowrap space-x-2 border-l border-r border-black"
                    >
                      <button
                        @click="openEditModal(category)"
                        data-modal-toggle="product-modal"
                        class="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                      >
                        <svg
                          class="mr-2 h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </button>
                      <button
                        @click="openDeleteModal(category)"
                        type="button"
                        data-modal-toggle="delete-product-modal"
                        class="text-white bg-orange-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                      >
                        <svg
                          class="mr-2 h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <controleModel
                v-if="showEditModal"
                :showModal="showEditModal"
                modalTitle="Edit category"
                modalButtonText="Save changes"
                :initialDesign="editingCategory.designation"
                :initialCoding="editingCategory.codification"
                :initialDescription="editingCategory.description"
                @close="showEditModal = false"
                :initialId="editingCategory.id"
                @updateCategory="updateCategory"
              />
            </div>
          </div>
        </div>
      </div>

      <TailwindPagination
        :data="categories"
        @pagination-change-page="getCategories"
      />

      <!-- 
<div class="bg-white sm:flex items-center w-full sm:justify-between bottom-0 right-0 border-t border-gray-200 p-4">
    <div class="flex items-center mb-4 sm:mb-0">
      <a href="#" @click.prevent="goToPreviousPage()" class="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center">
        <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path>
        </svg>
      </a>
      <a href="#" @click.prevent="goToNextPage()" class="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center mr-2">
        <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
        </svg>
      </a>
      <span class="text-sm font-normal text-gray-500">
        Showing
        <span class="text-gray-900 font-semibold">{{ startIndex }}-{{ endIndex }}</span>
        of
        <span class="text-gray-900 font-semibold">{{ totalCategories }}</span>
      </span>
    </div>
    <div class="flex items-center space-x-3">
      <a href="#" @click.prevent="goToPreviousPage()" :disabled="currentPage === 1" class="flex-1 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center">
        <svg class="-ml-1 mr-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path>
        </svg>
        Previous
      </a>
      <a href="#" @click.prevent="goToNextPage()" :disabled="currentPage === lastPage" class="flex-1 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center">
        Next
        <svg class="-mr-1 ml-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
        </svg>
      </a>
    </div>
  </div>
-->

      <div
        v-if="showEditModal || showAddModal || showDeleteModal"
        class="fixed inset-0 z-40 bg-black bg-opacity-25 backdrop-blur-sm"
        @click="closeModal"
      ></div>

      <!-- Add Product Modal -->

      <!-- Delete Product Modal -->
      <deleteModel
        :showModal="showDeleteModal"
        :modalTitle="'Delete category'"
        :itemToDelete="deletingCategory"
        @close="showDeleteModal = false"
        @delete="deleteCategory"
      />
    </div>
  </Dashboard>
</template>
<style>
#thead1 {
  background-color: #dcdcdc;
}
</style>

<!--

<div v-if="showModal" class="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center h-modal sm:h-full" style="position: absolute; left: 265px; top: 124px;">
    <div class="relative w-full max-w-2xl px-4 h-full md:h-auto">
        Modal content 
        <div class="bg-gray rounded-lg shadow relative">
            Modal header 
            <div class="flex items-start justify-between p-5 border-b rounded-t">
                <h3 class="text-xl font-semibold">Add product</h3>
                <button type="button" @click="showModal = false" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
            <!-- Modal body
            <div class="p-6 space-y-6">
                <form action="#">
                    <div class="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
                        <div class="col-span-full">
                            <label for="design" class="text-sm font-medium text-gray-900 block mb-2">Design</label>
                            <input type="text" name="design" id="design" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Design" required>
                        </div>
                        <div class="col-span-full">
                            <label for="coding" class="text-sm font-medium text-gray-900 block mb-2">Coding</label>
                            <input type="text" name="coding" id="coding" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Coding" required>
                        </div>
                        <div class="col-span-full">
                            <label for="description" class="text-sm font-medium text-gray-900 block mb-2">Description</label>
                            <textarea id="description" rows="4" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" placeholder="Product details"></textarea>
                        </div>
                    </div>
                </form>
                <!-- Modal footer
                <div class="p-6 border-t border-gray-200 rounded-b">
                    <button class="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Add product</button>
                </div>
            </div>
        </div>
    </div>
</div>
    
-->
