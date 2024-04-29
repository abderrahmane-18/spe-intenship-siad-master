<template>
  <div>
    <input v-model="user.name" placeholder="Enter full name" />
    <input v-model="user.email" placeholder="Enter email" type="email" />
    <button @click="updateUser">Save</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import eventBus from '../eventBus'; // Import the event bus

const user = ref({
  name: localStorage.getItem('name') || '',
  email: localStorage.getItem('email') || '',
});
const userId = localStorage.getItem('id');

const updateUser = async () => {
  try {
    const response = await axios.patch(
      `http://localhost:8000/api/${userId}/update`,
      user.value
    );
    if (response.data.status) {
      user.value.name = response.data.data.name;
      user.value.email = response.data.data.email;
      // Store the updated name in local storage
      localStorage.setItem('name', user.value.name);
      // Emit an event to notify Navbar.vue of the name change
      eventBus.$emit('userName-updated', user.value.name);
      alert(response.data.message);
    } else {
      alert('Error: ' + response.data.message);
    }
  } catch (error) {
    console.error(error);
  }
};
</script>