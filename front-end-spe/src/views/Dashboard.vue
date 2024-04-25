<template>
    <div>
      <h1>Welcome to Dashboard</h1>
      <p v-if="email">Hello {{ email }}, you are authenticated!</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const email = ref(null);
  
  onMounted(() => {
    // Retrieve the email from local storage
    email.value = localStorage.getItem('email');
  });
  </script>
  
  <style scoped>
  /* Your styling here */
  </style>
  