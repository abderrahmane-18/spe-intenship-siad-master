<template>
  
   
     
      <!-- Your users content here -->
      <div class="container mt-5 flex">
    <router-link to="/profile/roles" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-1">Roles</router-link>
    <router-link to="/profile/permission" class="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded mx-1">Permissions</router-link>
    <router-link to="/profile/users" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mx-1">Users</router-link>
  </div>

    <div class="container mt-2">

  <div class="row">
    <div class="col-md-12">
      <div class="mt-3 bg-white shadow-md rounded-lg overflow-hidden">
        <div class="flex justify-between items-center px-4 py-3 bg-gray-200">
          <h4 class="m-0 font-bold">Permissions</h4>

          <a href="#" class="bg-yellow-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add User</a>
        </div>
        <div class="p-4">
          <table class="w-full border-collapse">
            <thead>

                
              <tr class="bg-gray-200">
                <th class="border px-4 py-2">Id</th>
                <th class="border px-4 py-2 w-3/3">Name</th>
                <th class="border px-4 py-2 w-1/3">Email</th>
                <th class="border px-4 py-2 ">Roles</th>
                <th class="border px-4 py-2 w-2/5">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2"></td>
                <td class="border px-4 py-2"></td>
                <td class="border px-4 py-2"></td>
                <td class="border px-4 py-2"></td>
                <td class="border px-4 py-2 flex ">
                  <a href="#"  class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Edit</a>
                  <a href="#" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Delete</a>
                  
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'users',
  });
  </script>
  
  <style>
  /* Add your component-specific styles here */
  </style>
  