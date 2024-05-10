<!--controleModel.vue-->
<template>
  <div v-if="showModal" class="overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center h-modal sm:h-full" style="position: absolute; left: 265px; top: 124px;">
    <div class="relative w-full max-w-2xl px-4 h-full md:h-auto">
      <div class="bg-gray rounded-lg shadow relative">
        <!-- Modal header -->
        <div class="flex items-start justify-between p-5 border-b rounded-t">
          <h3 class="text-xl font-semibold">{{ modalTitle }}</h3>
          <button type="button" @click="emit('close')" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <form @submit.prevent="handleSubmit">
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
              <div class="col-span-full">
                <label for="design" class="text-sm font-medium text-gray-900 block mb-2">Designation</label>
                <input type="text" v-model="design" name="design" id="design" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Description" required />
              </div>
              <div class="col-span-full">
                <label for="coding" class="text-sm font-medium text-gray-900 block mb-2">Codification</label>
                <input type="text" v-model="codification" name="coding" id="coding" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Codification" required />
              </div>
              <div class="col-span-full">
                <label for="description" class="text-sm font-medium text-gray-900 block mb-2">Description</label>
                <textarea v-model="description" id="description" rows="4" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" placeholder="Description" required></textarea>
              </div>
            </div>
            <!-- Modal footer -->
            <div class="p-6 border-t border-gray-200 rounded-b">
              <button class="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{{ modalButtonText }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  showModal: {
    type: Boolean,
    required: true,
  },
  modalTitle: {
    type: String,
    required: true,
  },
  modalButtonText: {
    type: String,
    required: true,
  },
  initialDesign: {
    type: String,
    default: '',
  },
  initialCoding: {
    type: String,
    default: '',
  },
  initialDescription: {
    type: String,
    default: '',
  },
  isUpdate: {
    type: Boolean,
    default: false,
  },
  initialId: {
    type: Number,
    default: null,
  },
})

const emit = defineEmits(['close', 'save', 'addCategory', 'updateCategory'])
const design = ref(props.initialDesign)
const codification = ref(props.initialCoding)
const description = ref(props.initialDescription)
const store = useStore()

const handleSubmit = () => {

  const formData = {
    designation: design.value,
    codification: codification.value,
    description: description.value,
  }
  if (props.initialId) {
    // Update category
    
    emit('updateCategory', formData)
  } else {
    // Add category
    emit('addCategory', formData)
    design.value=''
    codification.value=''
    description.value=''
  }
 // 
 // emit('addCategory', formData)
}
</script>
