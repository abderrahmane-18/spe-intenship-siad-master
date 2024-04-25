<template>
    <div>
      <h1>Welcome to Dashboard</h1>
      <p v-if="isAuthenticated">Hello {{ email }}, you are authenticated!</p>
      <p v-else>You are not authenticated.</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const email = ref('');
  const isAuthenticated = ref(false);
  
  onMounted(() => {
    // Retrieve the email from local storage
    email.value = localStorage.getItem('email');
    isAuthenticated.value = localStorage.getItem('access_token') !== null;
  });
  </script>
  
  <style scoped>
  /* Your styling here */
  </style>
  