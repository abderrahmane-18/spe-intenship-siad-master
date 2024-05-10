<script setup>
import PermissionList from '@/components/PermissionList.vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import Dashboard from '@/views/Dashboard.vue'
import { ref } from 'vue'
const pageTitle = ref('Roles ')


import PlanificationManager from '@/components/Planification/PlanificationManager.vue'
</script>

<template>
  <Dashboard>
        <div class="mx-auto max-w-7xl">
          
            <BreadcrumbDefault :pageTitle="pageTitle" />
          
    <div>
      <PlanificationManager />
    </div>
  </div>
    </Dashboard>
  </template>
  
