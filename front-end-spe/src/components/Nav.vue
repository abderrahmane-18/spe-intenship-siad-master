<template>
    <nav class="bg-gray-800 text-white py-4">
      <div class="container mx-auto flex justify-end">
        <ul class="flex space-x-6">
          
          <li>
            <router-link :to="{ name: 'Login' }" class="hover:text-gray-300">Login</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </template>