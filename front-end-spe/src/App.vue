<template>
  <div>
    <RouterView />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Check if the user is authenticated on mount
onMounted(() => {
  const route = useRoute();
  const router = useRouter();
  
  const isAuthenticated = localStorage.getItem('access_token');
  if (!isAuthenticated && route.name !== 'Login') {
    router.push({ name: 'Login' });
  }
});
</script>

<style>
/* Your styling here */
</style>
