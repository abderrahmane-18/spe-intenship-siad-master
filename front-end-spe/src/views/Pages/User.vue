<script setup >
import { ref } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import UsersList from '@/components/UsersList.vue'
import PermissionList from '@/components/PermissionList.vue'
import Dashboard from '@/views/Dashboard.vue'

const pageTitle = ref('Users ')
</script>

<template>
  <Dashboard>
    <div class="mx-auto max-w-270">
      <!-- Breadcrumb Start -->
      <BreadcrumbDefault :pageTitle="pageTitle" />
      <!-- Breadcrumb End -->
      <UsersList />
    </div>
  </Dashboard>
 
</template>
