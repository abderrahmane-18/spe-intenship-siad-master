<script setup >
import { ref } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import UsersList from '@/components/UsersList.vue'
import RolesList from '@/components/RolesList.vue'
import Dashboard from '@/views/Dashboard.vue'

const pageTitle = ref('Roles ')
</script>

<template>
  <div>
    <RolesList/>
  </div>
  <!-- 
  <Dashboard>
    <div class="mx-auto max-w-270">
      <BreadcrumbDefault :pageTitle="pageTitle" />
      <RolesList />
    </div>
  </Dashboard>
-->
</template>
