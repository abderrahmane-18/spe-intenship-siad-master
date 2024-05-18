<template>
    <div class="flex flex-col">
      <div class="overflow-x-auto">
        <div class="align-middle inline-block min-w-full">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <div class="bg-white px-4 py-5 sm:p-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900">Select Dates</h3>
              <div class="mt-4">
                <label for="date" class="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  id="date"
                  v-model="selectedDate"
                  class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                />
              </div>
              <div class="mt-4">
                <label for="equipment" class="block text-sm font-medium text-gray-700">Equipment</label>
                <select
                  id="equipment"
                  v-model="selectedEquipment"
                  class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option v-for="equipment in availableEquipment" :key="equipment" :value="equipment">
                    {{ equipment }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        v-if="selectedDate && selectedEquipment"
        class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        @click="addPlanification"
      >
        Add Planification
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // Assuming you have fetched the "availableEquipment" data from the server
  const availableEquipment = ref([21, 22, 31, 32])
  
  const selectedDate = ref(null)
  const selectedEquipment = ref(null)
  
  const emit = defineEmits(['planification-added'])
  
  const addPlanification = () => {
    // Add the selected date and equipment to the planification list
    const planification = {
      date: selectedDate.value,
      equipment: selectedEquipment.value,
    }
    emit('planification-added', planification)
  
    // Reset the selected date and equipment
    selectedDate.value = null
    selectedEquipment.value = null
  }
  </script>