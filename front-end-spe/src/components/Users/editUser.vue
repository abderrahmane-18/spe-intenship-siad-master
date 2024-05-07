<!-- 
<script setup>
import PermissionList from '@/components/PermissionList.vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import Dashboard from '@/views/Dashboard.vue'
const pageTitle = ref('Roles ')

import createRole from '@/components/Roles/createRole.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'


const route = useRoute()
const store = useStore()

const userId = route.params.userId

const name = ref('')
const email = ref('')
const selectedRole = ref('')
const roles = ref(['admin', 'staff', 'super-admin'])

const fetchUser = async () => {
  try {
    const user = await store.dispatch('fetchUser', userId)
    if (user) {
      name.value = user.name || ''
      email.value = user.email || ''
      selectedRole.value = user.level || ''
    } else {
      console.warn('User data is undefined')
    }
  } catch (error) {
    console.error('Error fetching user:', error)
  }
}
const updateUser = async () => {
  try {
    const userData = {
      id: userId,
      name: name.value,
      email: email.value,
      level: selectedRole.value,
    }
    await store.dispatch('updateUser', userData)
    // Optionally, you can navigate to the "users" page after a successful update
    // router.push({ name: 'users' })
  } catch (error) {
    console.error(error)
  }
}

fetchUser()



</script>

<template>
    <Dashboard>
        <div class="mx-auto max-w-7xl">
          
            <BreadcrumbDefault :pageTitle="pageTitle" />
            <div class="p-4">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold">Edit User</h2>
      <a href="#" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Back</a>
    </div>
    <div class="bg-white shadow-md rounded-lg">
      <div class="p-4">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input v-model="name" type="text" id="name" class="mt-1 block w-full rounded-md bg-gray-100 border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input v-model="email" type="email" id="email" readonly class="mt-1 block w-full rounded-md bg-gray-100 border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </div>
        <div class="mb-4">
          <label for="role" class="block text-sm font-medium text-gray-700">Roles</label>
          <select v-model="selectedRole" id="role" class="mt-1 block w-full rounded-md bg-gray-100 border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            <option value="" disabled>Select Role</option>
            <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
          </select>
        </div>
        <div class="mb-4">
          <button type="button" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" @click="updateUser">Update</button>
        </div>
      </div>
    </div>
  </div>
            </div>
    </Dashboard>
</template>
-->
<script setup>
import PermissionList from '@/components/PermissionList.vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import Dashboard from '@/views/Dashboard.vue'
const pageTitle = ref('Roles ')

import createRole from '@/components/Roles/createRole.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
</script>

<template>
  <Dashboard>
        <div class="mx-auto max-w-7xl">
          
            <BreadcrumbDefault :pageTitle="pageTitle" />
   
    
  <div class="container mx-auto py-8">
    <div class="bg-white rounded-lg shadow-lg p-6">
      <div class="flex justify-between mb-4">
        <div class="w-1/3">
          <label class="block font-bold mb-2">Choisir le mois</label>
          <select class="w-full border border-gray-300 rounded-md px-3 py-2">
            <option>January</option>
            <option>February</option>
            <!-- Add more options as needed -->
          </select>
        </div>
        <div class="w-1/3">
          <label class="block font-bold mb-2">Choisir l'essai</label>
          <select class="w-full border border-gray-300 rounded-md px-3 py-2">
            <option>Essai 1</option>
            <option>Essai 2</option>
            <!-- Add more options as needed -->
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
</div>
    </Dashboard>
</template>