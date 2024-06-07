<template>
  <div class="unauthorized">
    <h1>403 - Unauthorized</h1>
    <p>You do not have permission to access this page.</p>
    <router-link to="/">Return to Login</router-link>
  </div>
</template>

<script setup></script>

<style scoped>
.unauthorized {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}

h1 {
  font-size: 2em;
  margin-bottom: 1em;
}

p {
  margin-bottom: 1em;
}
</style>
