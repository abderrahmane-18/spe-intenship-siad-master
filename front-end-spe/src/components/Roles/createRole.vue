<script setup>
import PermissionList from '@/components/PermissionList.vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import Dashboard from '@/views/Dashboard.vue'
const pageTitle = ref('Roles ')
import { ref } from 'vue'
import createRole from '@/components/Roles/createRole.vue'

</script>
<template>
     <Dashboard>
    <div class="mx-auto max-w-270">
      <!-- Breadcrumb Start -->
      <BreadcrumbDefault :pageTitle="pageTitle" />
      <div class="container mt-5">
  <div class="grid grid-cols-1">
    <div class="col-span-1">
      <div class="bg-blue-500 text-white rounded-lg py-5 px-6 mb-4 flex justify-between items-center">
        <h4 class="text-lg font-bold">Create Role</h4>
        <a href="" class="bg-white text-blue-500   hover:bg-green-700 hover:text-white font-bold py-2 px-4 rounded">Back</a>
      </div>
      <div class="bg-white shadow-md rounded-lg">
        <div class="p-6">
          <form action="" method="POST">
          
            <div class="mb-4">
              <label for="" class="block text-gray-700 font-bold mb-2">Role Name</label>
              <input type="text" name="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div class="mb-4 flex justify-end">
              <button type="submit" class="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
  </Dashboard>
</template>