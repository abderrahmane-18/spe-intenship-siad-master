<template>
  <div class="fixed z-50 inset-0 flex items-center justify-center bg-[#373d51] bg-opacity-75">
    <div class="bg-green-600 rounded-lg shadow-lg p-8 max-w-md w-full">
      <h2 class="text-2xl font-bold mb-6 text-white">Add Category</h2>
      <form @submit.prevent="addCategory"  class="space-y-4">
        <div>
          <label for="designation" class="block font-medium text-gray-300">Designation</label>
          <input
            type="text"
            id="designation"
            v-model="form.designation"
            class="mt-1 block w-full rounded-md border-transparent bg-gray-700 text-black focus:border-indigo-500 focus:ring-indigo-500 focus:bg-gray-600 sm:text-sm"
            required
          />
        </div>
        <div>
          <label for="codification" class="block font-medium text-gray-300">Codification</label>
          <input
            type="text"
            id="codification"
            v-model="form.codification"
            class="mt-1 block w-full rounded-md border-transparent bg-gray-700 text-black focus:border-indigo-500 focus:ring-indigo-500 focus:bg-gray-600 sm:text-sm"
            required
          />
        </div>
        <div>
          <label for="description" class="block font-medium text-gray-300">Description</label>
          <textarea
            id="description"
            v-model="form.description"
            class="mt-1 block w-full rounded-md border-transparent bg-gray-700 text-black focus:border-indigo-500 focus:ring-indigo-500 focus:bg-gray-600 sm:text-sm"
            required
          ></textarea>
        </div>
        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="closeModal ;console.log('r')"
            class="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-300 bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button 
            type="submit"
            class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
          {{ modalButtonText }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const form = ref({
  designation: '',
  codification: '',
  description: ''
})

const emit = defineEmits(['close'])

const addCategory = async () => {
  try {
    await store.dispatch('addCategory', form.value)
    emit('close')
  } catch (error) {
    console.error('Error adding category:', error)
    // Handle error
  }
}

const closeModal = () => {
  emit('close')
}
</script>