<script setup >
import { ref } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import PermissionList from '@/components/PermissionList.vue'
import Dashboard from '@/views/Dashboard.vue'

const pageTitle = ref('Permissions ')
</script>

<template>
  <Dashboard>
    <div class="mx-auto max-w-270">
      <!-- Breadcrumb Start -->
      <BreadcrumbDefault :pageTitle="pageTitle" />
      <!-- Breadcrumb End -->
    
      <PermissionList />
    
    </div>
  </Dashboard>
</template>
