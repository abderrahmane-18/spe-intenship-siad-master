<template>
    <div class="flex flex-col">
      <div class="overflow-x-auto">
        <div class="align-middle inline-block min-w-full">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <div class="bg-white px-4 py-5 sm:p-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900">Select Category and Group</h3>
              <div class="mt-4">
                <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
                <select
                  id="category"
                  v-model="selectedCategory"
                  class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option v-for="category in categories" :key="category.id" :value="category">
                    {{ category.designation }}
                  </option>
                </select>
              </div>
              <div class="mt-4">
                <label for="group" class="block text-sm font-medium text-gray-700">Group</label>
                <select
                  id="group"
                  v-model="selectedGroup"
                  class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option v-for="group in groups" :key="group.id" :value="group">
                    {{ group.id }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        v-if="selectedCategory && selectedGroup"
        class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        @click="$emit('next', selectedCategory, selectedGroup)"
      >
        Next
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // Assuming you have fetched the "categories" and "groups" data from the server
  const categories = ref([
    { id: 1, designation: "  Contrôle d'échange des réfrigérants NORIA" },
    { id: 2, designation: "Essai ventilateurs, réchauffeurs d’air rotatifs RAR" },
    // Add more categories as needed
  ])
  const groups = ref([
    { id: 1, start_date: '2023-05-01' },
    { id: 2, start_date: '2023-06-15' },
    { id: 3, start_date: '2023-07-20' },
    // Add more groups as needed
  ])
  
  const selectedCategory = ref(null)
  const selectedGroup = ref(null)
  
  const emit = defineEmits(['next'])
  </script>