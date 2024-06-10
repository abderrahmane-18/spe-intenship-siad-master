<script setup>
import HeaderArea from "../components/Header/HeaderArea.vue";
import SidebarArea from "../components/Sidebar/SidebarArea.vue";

import { ref, onMounted } from "vue";

const email = ref("");
// const name = ref('');

const isAuthenticated = ref(false);

onMounted(() => {
  // Retrieve the email from local storage
  email.value = localStorage.getItem("email");
  //name.value = localStorage.getItem('name');

  isAuthenticated.value = localStorage.getItem("access_token") !== null;
});
</script>

<style scoped>
/* Your styling here */
</style>

<template>
  <div>
    <!--
      <h1>Welcome to Dashboard</h1>
      <p v-if="isAuthenticated">Hello {{ email }}, you are authenticated!</p>
      <p v-else>You are not authenticated.</p>
      -->
    <div class="flex h-screen overflow-hidden">
      <!-- ===== Sidebar Start ===== -->
      <SidebarArea />
      <!-- ===== Sidebar End ===== -->

      <!-- ===== Content Area Start ===== -->
      <div
        class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden"
      >
        <!-- ===== Header Start ===== -->
        <HeaderArea />
        <main>
          <div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <slot></slot>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
