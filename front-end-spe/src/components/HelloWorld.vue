<template>
    <div>
      <h1>Welcome to Home Page</h1>
      <p v-if="email">Hello {{ email }}, you are authenticated!</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: null,
      };
    },
    created() {
      // Retrieve the access_token from local storage or state management system
      const accessToken = localStorage.getItem('access_token');
  
      // Assuming the access_token contains the authenticated user's email
      // You may need to decode or parse the access_token to extract the email
      this.email = accessToken ? accessToken.split('|')[0] : null;
    },
  };
  </script>